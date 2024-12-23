from flask import Flask, jsonify, request
from flask_cors import CORS

from app.database import get_pokemon_by_type, get_all_pokemon, get_pokemon_by_stat, get_pokemon_by_id
from app.database import retrieve_teams_from_user, create_pokemon_team
from app.util import Params, PokemonStats

app = Flask(__name__)
CORS(app)


@app.route('/')
def hello_world():
    return 'Pokemon Server'


@app.route('/pokemon', methods=['GET'])
def get_pokemon():
    data = {}
    pokemon_list = []

    if len(request.args.keys()) == 0:
        pokemon_list = get_all_pokemon()
    elif PokemonStats.HP in request.args.keys():
        pokemon_list = get_pokemon_by_stat(PokemonStats.HP, request.args.get(PokemonStats.HP))
    elif PokemonStats.ATTACK in request.args.keys():
        pokemon_list = get_pokemon_by_stat(PokemonStats.ATTACK, request.args.get(PokemonStats.ATTACK))
    elif PokemonStats.DEFENSE in request.args.keys():
        pokemon_list = get_pokemon_by_stat(PokemonStats.DEFENSE, request.args.get(PokemonStats.DEFENSE))
    elif PokemonStats.SPECIAL_ATTACK in request.args.keys():
        pokemon_list = get_pokemon_by_stat(PokemonStats.SPECIAL_ATTACK, request.args.get(PokemonStats.SPECIAL_ATTACK))
    elif PokemonStats.SPECIAL_DEFENSE in request.args.keys():
        pokemon_list = get_pokemon_by_stat(PokemonStats.SPECIAL_DEFENSE, request.args.get(PokemonStats.SPECIAL_DEFENSE))
    elif PokemonStats.SPEED in request.args.keys():
        pokemon_list = get_pokemon_by_stat(PokemonStats.SPEED, request.args.get(PokemonStats.SPEED))
    elif PokemonStats.BASE_STAT_TOTAL in request.args.keys():
        pokemon_list = get_pokemon_by_stat(PokemonStats.BASE_STAT_TOTAL, request.args.get(PokemonStats.BASE_STAT_TOTAL))
    elif Params.TYPE in request.args.keys():
        pokemon_list = get_pokemon_by_type(request.args.get(Params.TYPE))
    elif Params.ID in request.args.keys():
        pokemon_list = get_pokemon_by_id(int(request.args.get(Params.ID)))

    data["pokemon"] = pokemon_list
    data["count"] = len(pokemon_list)
    response = jsonify(data)
    response.headers.set('Access-Control-Allow-Origin', 'http://localhost:5173')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response


@app.route('/teams', methods=['GET'])
def get_teams():
    data = {}
    pokemon_list = retrieve_teams_from_user(request.args.get(Params.USERNAME))
    data["team"] = pokemon_list
    data["count"] = len(pokemon_list)
    response = jsonify(data)
    response.headers.set('Access-Control-Allow-Origin', 'http://localhost:5173')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response


@app.route('/create', methods=['POST'])
def create_team():
    request_data = request.get_json()
    print(request_data)
    team = create_pokemon_team(
        slot_1=request_data.get(Params.SLOT_1),
        slot_2=request_data.get(Params.SLOT_2),
        slot_3=request_data.get(Params.SLOT_3),
        slot_4=request_data.get(Params.SLOT_4),
        slot_5=request_data.get(Params.SLOT_5),
        slot_6=request_data.get(Params.SLOT_6),
    )
    print(team['stats'])
    data = {'team': team}
    response = jsonify(data)
    response.headers.set('Access-Control-Allow-Origin', 'http://localhost:5173')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response


if __name__ == '__main__':
    app.run()
