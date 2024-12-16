import json
import sys
import asyncio
import aiohttp
from util import parse_request
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from objects import Base, Pokemon
from server.configuration import get_db_connection


DATABASE_URL = get_db_connection()

async def insert_db_objects(async_session: async_sessionmaker[AsyncSession], pokemonList: list[Pokemon]) -> None:
    async with async_session() as session:
        async with session.begin():
            session.add_all(pokemonList)

async def populate_database(pokemonList: list[Pokemon]):
    engine = create_async_engine(DATABASE_URL, echo=True)
    async_session = async_sessionmaker(engine, expire_on_commit=False)

    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    
    await insert_db_objects(async_session, pokemonList)
    await engine.dispose()

async def send_request(session, url):
    try:
        async with session.get(url) as response:
            data = await response.json()
            print(f"Received data from {url}")
            return data
    except Exception as e:
        print(f"Error fetching data from {url}: {e}")
        return None

async def fetch_all_pokemon_data(urls):
    async with aiohttp.ClientSession() as session:
        tasks = [send_request(session, url) for url in urls]
        results = await asyncio.gather(*tasks)
        return results

def parse_urls(filepath):
    with open(filepath) as data_file:
        data = json.load(data_file)
        url_list = [i["url"] for i in data["results"]]
    return url_list

if __name__ == "__main__":
    list_urls = parse_urls('test_data/pokemon_api_urls.json')

    # required for aiodns to work in Windows
    if sys.platform == 'win32':
        asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

    async_results = asyncio.run(fetch_all_pokemon_data(list_urls))
    
    pokemon = [parse_request(i) for i in async_results if i is not None]
    
    asyncio.run(populate_database(pokemon))
    