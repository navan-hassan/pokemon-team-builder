from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from functools import lru_cache
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncEngine
from pokemonteambuilder.configuration import Settings
from pokemonteambuilder.database import get_all_pokemon, get_pokemon_by_id, get_pokemon_by_stat, get_pokemon_by_type, retrieve_team_by_id, update_pokemon_team
from pokemonteambuilder.database import create_pokemon_team
from pokemonteambuilder.util import PokemonStats, PokemonTypes
from pokemonteambuilder.util import ErrorMessage
from pokemonteambuilder.api import PokemonTeamSlots


engine: AsyncEngine | None
session_factory: async_sessionmaker | None

@lru_cache
def get_settings():
    return Settings()

def get_allowed_origins():
    settings = get_settings()
    return [settings.WEB_CLIENT]

@asynccontextmanager
async def lifespan(app: FastAPI):
    global engine
    global session_factory
    settings = get_settings()
    connection_string = settings.DB_CONNECTION
    engine = create_async_engine(connection_string, echo=True)
    session_factory = async_sessionmaker(engine, expire_on_commit=False)
    yield
    if engine is not None:
        print('disposing engine...')
        await engine.dispose()
        print('disposed!')

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=get_allowed_origins(),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {'message': 'Pokemon Server'}

@app.get('/pokemon/stats')
async def route_get_pokemon_by_stats(stat: str, value: int):
    if stat not in PokemonStats:
        return ErrorMessage.INVALID_CREDENTIALS
    result = await get_pokemon_by_stat(stat, value, session_factory)
    return {'pokemon': result}

@app.get('/pokemon/all')
async def route_get_all_pokemon():
    result = await get_all_pokemon(session_factory)
    return {'pokemon': result}

@app.get('/pokemon/id')
async def route_get_pokemon_by_id(id: int):
    result =  await get_pokemon_by_id(id, session_factory=session_factory)
    return {'pokemon': result}

@app.get('/pokemon/type')
async def route_get_pokemon_by_type(pokemon_type: str):
    if pokemon_type not in PokemonTypes:
        return ErrorMessage.INVALID_CREDENTIALS
    result = await get_pokemon_by_type(pokemon_type, session_factory=session_factory)
    return {'pokemon': result}

@app.get('/teams/id')
async def route_get_team_by_id(id: int):
    pokemon_list = await retrieve_team_by_id(id, session_factory)
    return pokemon_list

@app.post('/teams/update')
async def route_create_team(slots: PokemonTeamSlots):
    if slots.id is None:
        return ErrorMessage.INVALID_CREDENTIALS
    result = await update_pokemon_team(slots.id, session_factory, new_team=slots)
    return {'team': result }

@app.post('/teams/create')
async def route_create_team(slots: PokemonTeamSlots):
    result = await create_pokemon_team(session_factory, slots=slots)
    return {'team': result }
