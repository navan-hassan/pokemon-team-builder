from flask import Flask, jsonify, request
from flask_cors import CORS

from app.database import get_pokemon_by_type, get_all_pokemon, get_pokemon_by_stat, get_pokemon_by_id, does_team_exist, \
    update_pokemon_team, retrieve_user_from_database, is_username_taken, add_user_to_database
from app.database import retrieve_teams_from_user, create_pokemon_team
from app.util import Params, PokemonStats
from app.util import ResponseCode, ErrorMessage
from app.authentication import register_user, login_user

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

    if does_team_exist(request_data.get('id')):
        team = update_pokemon_team(
            team_id=request_data.get('id'),
            slot_1=request_data.get(Params.SLOT_1),
            slot_2=request_data.get(Params.SLOT_2),
            slot_3=request_data.get(Params.SLOT_3),
            slot_4=request_data.get(Params.SLOT_4),
            slot_5=request_data.get(Params.SLOT_5),
            slot_6=request_data.get(Params.SLOT_6),
        )
    else:
        team = create_pokemon_team(
            slot_1=request_data.get(Params.SLOT_1),
            slot_2=request_data.get(Params.SLOT_2),
            slot_3=request_data.get(Params.SLOT_3),
            slot_4=request_data.get(Params.SLOT_4),
            slot_5=request_data.get(Params.SLOT_5),
            slot_6=request_data.get(Params.SLOT_6),
        )

    data = {'team': team}
    response = jsonify(data)
    response.headers.set('Access-Control-Allow-Origin', 'http://localhost:5173')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response


@app.route('/login', methods=['POST'])
def login():
    request_data = request.get_json()
    if not request_data or not request_data.get(Params.USERNAME) or not request_data.get(Params.PASSWORD):
        response = create_response(ErrorMessage.INVALID_CREDENTIALS), ResponseCode.INVALID_CREDENTIALS
        return response

    username = request_data.get(Params.USERNAME)
    password = request_data.get(Params.PASSWORD)

    user_data = login_user(username, password)
    if not user_data:
        response = create_response(ErrorMessage.INVALID_CREDENTIALS), ResponseCode.INVALID_CREDENTIALS
        return response

    return create_response(user_data), ResponseCode.SUCCESS


@app.route('/register', methods=['POST'])
def register():
    request_data = request.get_json()
    if not request_data or not request_data.get(Params.USERNAME) or not request_data.get(Params.PASSWORD):
        return create_response(ErrorMessage.INVALID_CREDENTIALS), ResponseCode.INVALID_CREDENTIALS

    username = request_data.get(Params.USERNAME)
    password = request_data.get(Params.PASSWORD)

    if is_username_taken(username):
        return create_response(ErrorMessage.USERNAME_TAKEN), ResponseCode.USERNAME_TAKEN

    user = register_user(username, password)
    add_user_to_database(user)

    response_data = {
        Params.USERNAME: username,
        Params.TEAMS: retrieve_teams_from_user(username)
    }

    return create_response(response_data), ResponseCode.SUCCESS


def create_response(data: dict):
    response = jsonify(data)
    response.headers.set('Access-Control-Allow-Origin', 'http://localhost:5173')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response


if __name__ == '__main__':
    app.run()
