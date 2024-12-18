import json
import sys
import asyncio
import aiohttp
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker

from app.objects import Base, Stats, Pokemon, Resistances
from app.configuration import get_db_connection

DATABASE_URL = get_db_connection()


async def insert_db_objects(async_session: async_sessionmaker[AsyncSession], pokemon_list: list[Pokemon]) -> None:
    async with async_session() as session:
        async with session.begin():
            session.add_all(pokemon_list)


async def populate_database(pokemon_list: list[Pokemon]):
    engine = create_async_engine(DATABASE_URL, echo=True)
    async_session = async_sessionmaker(engine, expire_on_commit=False)

    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    await insert_db_objects(async_session, pokemon_list)
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


def parse_request(contents):
    name = contents["name"]
    pokemon_id = contents["id"]
    sprite = contents["sprites"]["front_default"]
    ability1 = None
    ability2 = None
    hidden_ability = None
    for entry in contents["abilities"]:
        if entry["is_hidden"]:
            hidden_ability = entry["ability"]["name"]
        elif entry["slot"] == 1 and not entry["is_hidden"]:
            ability1 = entry["ability"]["name"]
        elif entry["slot"] == 2 and not entry["is_hidden"]:
            ability2 = entry["ability"]["name"]

    primary_type = None
    secondary_type = None
    for entry in contents["types"]:
        if entry["slot"] == 1:
            primary_type = entry["type"]["name"]
        elif entry["slot"] == 2:
            secondary_type = entry["type"]["name"]

    bst = 0
    stats_dict = {}
    for entry in contents["stats"]:
        stats_dict[entry["stat"]["name"]] = entry["base_stat"]
        bst += entry["base_stat"]

    stats = Stats(
        hp=stats_dict["hp"],
        attack=stats_dict["attack"],
        defense=stats_dict["defense"],
        sp_atk=stats_dict["special-attack"],
        sp_def=stats_dict["special-defense"],
        speed=stats_dict["speed"],
        base_stat_total=bst
    )
    resistances = calculate_resistances([primary_type, secondary_type])
    resistances.pokemon_id = pokemon_id
    resistances.id = pokemon_id
    stats.id = pokemon_id
    stats.pokemon_id = pokemon_id
    new_pokemon = Pokemon(
        id=pokemon_id,
        name=name,
        sprite=sprite,
        primary_type=primary_type,
        secondary_type=secondary_type,
        ability1=ability1,
        ability2=ability2,
        hidden_ability=hidden_ability,
        stats=stats,
        resistances=resistances
    )
    return new_pokemon


def calculate_resistances(type_list):
    new_resistances = Resistances(
        normal=1,
        fire=1,
        water=1,
        grass=1,
        flying=1,
        fighting=1,
        poison=1,
        electric=1,
        ground=1,
        rock=1,
        psychic=1,
        ice=1,
        bug=1,
        ghost=1,
        steel=1,
        dragon=1,
        dark=1,
        fairy=1
    )
    for type_name in type_list:
        match type_name:
            case 'normal':
                new_resistances.ghost = 0
                new_resistances.fighting *= 2
            case 'fire':
                new_resistances.fire /= 2
                new_resistances.grass /= 2
                new_resistances.ice /= 2
                new_resistances.bug /= 2
                new_resistances.steel /= 2
                new_resistances.fairy /= 2
                new_resistances.water *= 2
                new_resistances.ground *= 2
                new_resistances.rock *= 2
            case 'water':
                new_resistances.fire /= 2
                new_resistances.water /= 2
                new_resistances.ice /= 2
                new_resistances.steel /= 2
                new_resistances.grass *= 2
                new_resistances.electric *= 2
            case 'electric':
                new_resistances.electric /= 2
                new_resistances.flying /= 2
                new_resistances.steel /= 2
                new_resistances.ground *= 2
            case 'grass':
                new_resistances.water /= 2
                new_resistances.electric /= 2
                new_resistances.grass /= 2
                new_resistances.ground /= 2
                new_resistances.fire *= 2
                new_resistances.ice *= 2
                new_resistances.poison *= 2
                new_resistances.flying *= 2
                new_resistances.bug *= 2
            case 'ice':
                new_resistances.ice /= 2
                new_resistances.fire *= 2
                new_resistances.fighting *= 2
                new_resistances.rock *= 2
                new_resistances.steel *= 2
            case 'fighting':
                new_resistances.bug /= 2
                new_resistances.rock /= 2
                new_resistances.dark /= 2
                new_resistances.flying *= 2
                new_resistances.psychic *= 2
                new_resistances.fairy *= 2
            case 'poison':
                new_resistances.grass /= 2
                new_resistances.fighting /= 2
                new_resistances.poison /= 2
                new_resistances.bug /= 2
                new_resistances.fairy /= 2
                new_resistances.psychic *= 2
                new_resistances.ground *= 2
            case 'ground':
                new_resistances.electric = 0
                new_resistances.poison /= 2
                new_resistances.rock /= 2
                new_resistances.water *= 2
                new_resistances.grass *= 2
                new_resistances.ice *= 2
            case 'flying':
                new_resistances.ground = 0
                new_resistances.grass /= 2
                new_resistances.fighting /= 2
                new_resistances.bug /= 2
                new_resistances.electric *= 2
                new_resistances.ice *= 2
                new_resistances.rock *= 2
            case 'psychic':
                new_resistances.fighting /= 2
                new_resistances.psychic /= 2
                new_resistances.bug *= 2
                new_resistances.ghost *= 2
                new_resistances.dark *= 2
            case 'bug':
                new_resistances.grass /= 2
                new_resistances.fighting /= 2
                new_resistances.ground /= 2
                new_resistances.fire *= 2
                new_resistances.flying *= 2
                new_resistances.rock *= 2
            case 'rock':
                new_resistances.normal /= 2
                new_resistances.fire /= 2
                new_resistances.poison /= 2
                new_resistances.flying /= 2
                new_resistances.water *= 2
                new_resistances.grass *= 2
                new_resistances.fighting *= 2
                new_resistances.ground *= 2
                new_resistances.steel *= 2
            case 'ghost':
                new_resistances.normal = 0
                new_resistances.fighting = 0
                new_resistances.poison /= 2
                new_resistances.bug /= 2
                new_resistances.ghost *= 2
                new_resistances.dark *= 2
            case 'dragon':
                new_resistances.fire /= 2
                new_resistances.water /= 2
                new_resistances.electric /= 2
                new_resistances.grass /= 2
                new_resistances.ice *= 2
                new_resistances.dragon *= 2
                new_resistances.fairy *= 2
            case 'dark':
                new_resistances.psychic = 0
                new_resistances.ghost /= 2
                new_resistances.dark /= 2
                new_resistances.fighting *= 2
                new_resistances.bug *= 2
                new_resistances.fairy *= 2
            case 'steel':
                new_resistances.poison = 0
                new_resistances.normal /= 2
                new_resistances.grass /= 2
                new_resistances.ice /= 2
                new_resistances.flying /= 2
                new_resistances.psychic /= 2
                new_resistances.bug /= 2
                new_resistances.rock /= 2
                new_resistances.dragon /= 2
                new_resistances.steel /= 2
                new_resistances.fairy /= 2
                new_resistances.fire *= 2
                new_resistances.fighting *= 2
                new_resistances.ground *= 2
            case 'fairy':
                new_resistances.dragon = 0
                new_resistances.fighting /= 2
                new_resistances.bug /= 2
                new_resistances.dark /= 2
                new_resistances.poison *= 2
                new_resistances.steel *= 2
    return new_resistances


if __name__ == "__main__":
    list_urls = parse_urls('../tests/test_data/pokemon_api_urls.json')

    # required for aiodns to work in Windows
    if sys.platform == 'win32':
        asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

    async_results = asyncio.run(fetch_all_pokemon_data(list_urls))

    pokemon = [parse_request(i) for i in async_results if i is not None]

    asyncio.run(populate_database(pokemon))
