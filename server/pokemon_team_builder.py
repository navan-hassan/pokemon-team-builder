from flask import Flask, jsonify, request
from flask_cors import CORS
from sqlalchemy import create_engine

from app.configuration import get_db_connection
from app.database import get_pokemon_by_type, get_all_pokemon, get_pokemon_by_stat, get_pokemon_by_id
from app.util import Params

app = Flask(__name__)
CORS(app)

CONNECTION_STRING = get_db_connection()
ENGINE = create_engine(CONNECTION_STRING)


@app.route('/')
def hello_world():
    return 'Pokemon Server'


@app.route('/pokemon', methods=['GET'])
def get_pokemon():
    data = {}
    pokemon_list = []
    if len(request.args.keys()) == 0:
        pokemon_list = get_all_pokemon(ENGINE)
    elif str(Params.HP) in request.args.keys():
        pokemon_list = get_pokemon_by_stat(ENGINE, Params.HP, request.args.get(str(Params.HP)))
    elif str(Params.ATTACK) in request.args.keys():
        pokemon_list = get_pokemon_by_stat(ENGINE, Params.ATTACK, request.args.get(str(Params.ATTACK)))
    elif str(Params.DEFENSE) in request.args.keys():
        pokemon_list = get_pokemon_by_stat(ENGINE, Params.DEFENSE, request.args.get(str(Params.DEFENSE)))
    elif str(Params.SPECIAL_ATTACK) in request.args.keys():
        pokemon_list = get_pokemon_by_stat(ENGINE, Params.SPECIAL_ATTACK, request.args.get(str(Params.SPECIAL_ATTACK)))
    elif str(Params.SPECIAL_DEFENSE) in request.args.keys():
        pokemon_list = get_pokemon_by_stat(ENGINE, Params.SPECIAL_DEFENSE, request.args.get(str(Params.SPECIAL_DEFENSE)))
    elif str(Params.SPEED) in request.args.keys():
        pokemon_list = get_pokemon_by_stat(ENGINE, Params.SPEED, request.args.get(str(Params.SPEED)))
    elif str(Params.BASE_STAT_TOTAL) in request.args.keys():
        pokemon_list = get_pokemon_by_stat(ENGINE, Params.BASE_STAT_TOTAL, request.args.get(str(Params.BASE_STAT_TOTAL)))
    elif str(Params.TYPING) in request.args.keys():
        pokemon_list = get_pokemon_by_type(ENGINE, Params.TYPING, request.args.get(str(Params.TYPING)))
    elif str(Params.ID) in request.args.keys():
        pokemon_list = get_pokemon_by_id(ENGINE, request.args.get(str(Params.ID)))

    data["pokemon"] = pokemon_list
    data["count"] = len(pokemon_list)
    response = jsonify(data)
    response.headers.set('Access-Control-Allow-Origin', 'http://localhost:5173')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response


if __name__ == '__main__':
    app.run()
