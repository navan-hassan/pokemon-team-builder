from fastapi import FastAPI
from pokemonteambuilder.configuration import get_db_connection
from pokemonteambuilder.database import  DataContext
from pokemonteambuilder.util import PokemonStats, PokemonTypes
from pokemonteambuilder.util import ErrorMessage
app = FastAPI()

connection_string = get_db_connection()
data_context = DataContext(connection_string) # type: ignore

@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get('/')
def hello_world():
    return 'Pokemon Server'

@app.get('/pokemon/stats')
async def route_get_pokemon_by_stats(stat: str, value: int):
    if stat not in PokemonStats:
        return ErrorMessage.INVALID_CREDENTIALS
    
    pokemon_list = await data_context.get_pokemon_by_stat(stat, value)
    return pokemon_list

@app.get('/pokemon/all')
async def route_get_all_pokemon():
    pokemon_list = await data_context.get_all_pokemon()
    return pokemon_list

@app.get('/pokemon/id')
async def route_get_pokemon_by_id(id: int):
    pokemon_list =  await data_context.get_pokemon_by_id(id)
    return pokemon_list

@app.get('/pokemon/type')
async def route_get_pokemon_by_type(pokemon_type: str):
    if pokemon_type not in PokemonTypes:
        return ErrorMessage.INVALID_CREDENTIALS
    pokemon_list = await data_context.get_pokemon_by_type(pokemon_type)
    return pokemon_list

@app.get('/teams/id')
async def route_get_team_by_id(id: int):
    pokemon_list = await data_context.retrieve_team_by_id(id)
    return pokemon_list
