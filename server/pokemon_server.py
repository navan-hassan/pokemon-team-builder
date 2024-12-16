from sqlalchemy import create_engine,select
from sqlalchemy.orm import Session
from flask_cors import CORS
from flask import Flask,jsonify
from .configuration import get_db_connection
from .database.objects import Pokemon
from .database.util import format_db_object, format_db_object_recursive

app = Flask(__name__)
CORS(app)

CONNECTION_STRING = get_db_connection()
print(CONNECTION_STRING)
ENGINE = create_engine(CONNECTION_STRING)


@app.route('/')
def hello_world():
    return 'Pokemon Server'

@app.route('/pokemon/all')
def get_all_pokemon():
    with Session(ENGINE) as session:
        stmt = select(Pokemon)
        result = session.scalars(stmt)
        pokemon_lst = [format_db_object(p) for p in result]
        data = {"pokemon": pokemon_lst}
        response = jsonify(data)
        response.headers.set('Access-Control-Allow-Origin', 'http://localhost:5173')
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        return response

@app.route('/pokemon/id/<int:id>')
def get_pokemon_by_id(id):
    with Session(ENGINE) as session:
        stmt = select(Pokemon).where(Pokemon.id == id)
        result = session.scalars(stmt).one_or_none()
        if result is None:
            pokemon_lst = {}
        else:
            pokemon_lst = format_db_object_recursive(result)
        data = {"pokemon": pokemon_lst}
        response = jsonify(data)
        response.headers.set('Access-Control-Allow-Origin', 'http://localhost:5173')
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        return response
    
@app.route('/pokemon/name/<name>')
def get_pokemon_by_name(name):
    with Session(ENGINE) as session:
        stmt = select(Pokemon).where(Pokemon.name == name)
        result = session.scalars(stmt).one_or_none()
        if result is None:
            pokemon_lst = {}
        else:
            pokemon_lst = format_db_object_recursive(result)
        data = {"pokemon": pokemon_lst}
        response = jsonify(data)
        response.headers.set('Access-Control-Allow-Origin', 'http://localhost:5173')
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        return response

if __name__ == '__main__':
    app.run()

