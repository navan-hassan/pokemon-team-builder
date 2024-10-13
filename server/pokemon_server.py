from flask import Flask,jsonify,request
from database import *
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
    return 'Pokemon Server'

@app.route('/pokemon/all')
def get_all_pokemon():
    pokemon_rows = getAllPokemon()
    pokemon_lst = []
    for row in pokemon_rows:
        pokemon = {
            "dex_num":row[0],
            "name":row[1],
            "primary_type":row[2],
            "secondary_type":row[3],
            "stats":{
                "hp":row[7],
                "attack":row[8],
                "defense":row[9],
                "special_attack":row[10],
                "special_defense":row[11],
                "speed":row[12],
                "base_stat_total":row[13]
            },
            "defensive_coverage":{
                "normal":row[14],
                "fire":row[15],
                "water":row[16],
                "grass":row[17],
                "flying":row[18],
                "fighting":row[19],
                "poison":row[20],
                "electric":row[21],
                "ground":row[22],
                "rock":row[23],
                "psychic":row[24],
                "ice":row[25],
                "bug":row[26],
                "ghost":row[27],
                "steel":row[28],
                "dragon":row[29],
                "dark":row[30],
                "fairy":row[31]
            }
        }
        pokemon_lst.append(pokemon)

    data = {
      "pokemon": pokemon_lst
    }

    response = jsonify(data)
    response.headers.set('Access-Control-Allow-Origin', 'http://localhost:5173')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response

@app.route('/pokemon/team', methods=["POST"])
def create_pokemon_team():
    content = request.json
    print(content)
    return content

@app.route('/pokemon/type/<pkmnType>')
def get_pokemon_by_type(pkmnType):
    pokemon_rows = getPokemonByType(pkmnType)
    pokemon_lst = []
    for row in pokemon_rows:
        pokemon = {
            "dex_num":row[0],
            "name":row[1],
            "primary_type":row[2],
            "secondary_type":row[3]
        }
        pokemon_lst.append(pokemon)
    
    data = {
      "pokemon": pokemon_lst
    }
    response = jsonify(data)
    response.headers.set('Access-Control-Allow-Origin', 'http://localhost:5173')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response

# "localhost:5000/pokemon/stat?stat=attack&amount=90"
@app.route('/pokemon/stat')
def get_pokemon_by_stat():

    stat = request.args.get('stat', None)
    amount = request.args.get('amount', None)
    
    if not stat or not amount:
        return jsonify({})
    else:
        amount = float(amount)
        pokemon_rows = getPokemonByStat(stat, amount)
        pokemon_lst = []
        for row in pokemon_rows:
            pokemon = {
                "dex_num":row[0],
                "name":row[1],
                "primary_type":row[2],
                "secondary_type":row[3]
            }
            pokemon_lst.append(pokemon)
        
        data = {
        "pokemon": pokemon_lst
        }
    
    response = jsonify(data)
    response.headers.set('Access-Control-Allow-Origin', 'http://localhost:5173')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response


@app.route('/pokemon/id/<int:id>')
def get_pokemon_by_id(id):
    pokemon_rows = getPokemonById(id)
    pokemon_lst = []
    for row in pokemon_rows:
        pokemon = {
            "dex_num":row[0],
            "name":row[1],
            "primary_type":row[2],
            "secondary_type":row[3],
            "stats":{
                "hp":row[7],
                "attack":row[8],
                "defense":row[9],
                "special_attack":row[10],
                "special_defense":row[11],
                "speed":row[12],
                "base_stat_total":row[13]
            },
            "defensive_coverage":{
                "normal":row[14],
                "fire":row[15],
                "water":row[16],
                "grass":row[17],
                "flying":row[18],
                "fighting":row[19],
                "poison":row[20],
                "electric":row[21],
                "ground":row[22],
                "rock":row[23],
                "psychic":row[24],
                "ice":row[25],
                "bug":row[26],
                "ghost":row[27],
                "steel":row[28],
                "dragon":row[29],
                "dark":row[30],
                "fairy":row[31]
            }
        }
        pokemon_lst.append(pokemon)
    
    pokemon = None
    if len(pokemon_lst) > 0:
        pokemon = pokemon_lst.pop(0)
        

    data = {
      "pokemon": pokemon
    }

    response = jsonify(data)
    response.headers.set('Access-Control-Allow-Origin', 'http://localhost:5173')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response

@app.route('/pokemon/name/<name>')
def get_pokemon_by_name(name):
    pokemon_rows = getPokemonByName(name)
    pokemon_lst = []
    for row in pokemon_rows:
        pokemon = {
            "dex_num":row[0],
            "name":row[1],
            "primary_type":row[2],
            "secondary_type":row[3],
            "ability1":row[4],
            "ability2":row[5],
            "hidden_ability":row[6],
            "hp":row[7],
            "attack":row[8],
            "defense":row[9],
            "sp_attack":row[10],
            "sp_defense":row[11],
            "speed":row[12],
            "base_stat_total":row[13],
            "defensive_coverage":{
            "normal":row[14],
            "fire":row[15],
            "water":row[16],
            "grass":row[17],
            "flying":row[18],
            "fighting":row[19],
            "poison":row[20],
            "electric":row[21],
            "ground":row[22],
            "rock":row[23],
            "psychic":row[24],
            "ice":row[25],
            "bug":row[26],
            "ghost":row[27],
            "steel":row[28],
            "dragon":row[29],
            "dark":row[30],
            "fairy":row[31]
            }
        }
        pokemon_lst.append(pokemon)
    
    data = {
      "pokemon": pokemon_lst
    }

    response = jsonify(data)
    response.headers.set('Access-Control-Allow-Origin', 'http://localhost:5173')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response

if __name__ == '__main__':
    app.run()

