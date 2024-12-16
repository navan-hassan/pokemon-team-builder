from sqlalchemy import create_engine, Engine, select
from sqlalchemy.orm import Session
from sqlalchemy_utils import database_exists, create_database
from objects import Base, Pokemon, Resistances, Stats


def get_pokemon_by_id(id: int, engine: Engine):
    with Session(engine) as session:
        stmt = select(Pokemon).where(Pokemon.id == id)
        r = session.scalars(stmt).one_or_none()
        print(r)
        return r

def format_db_object(pokemon: Pokemon):
    p = {
            "dex_num":pokemon.id,
            "name":pokemon.name,
            "primary_type":pokemon.primary_type,
            "secondary_type":pokemon.secondary_type if pokemon.secondary_type is not None else "None"
        }
    return p

def format_db_object_recursive(pokemon: Pokemon):
    p = {
            "dex_num":pokemon.id,
            "name":pokemon.name,
            "primary_type":pokemon.primary_type,
            "secondary_type":pokemon.secondary_type if pokemon.secondary_type is not None else "None",
            "stats": {
                "hp":pokemon.stats.hp,
                "attack":pokemon.stats.attack,
                "defense":pokemon.stats.defense,
                "special_attack":pokemon.stats.sp_atk,
                "special_defense":pokemon.stats.sp_def,
                "speed":pokemon.stats.speed,
                "base_stat_total":pokemon.stats.base_stat_total
            },
            "defensive_coverage":{
                "normal":pokemon.resistances.normal,
                "fire":pokemon.resistances.fire,
                "water":pokemon.resistances.water,
                "grass":pokemon.resistances.grass,
                "flying":pokemon.resistances.flying,
                "fighting":pokemon.resistances.fighting,
                "poison":pokemon.resistances.poison,
                "electric":pokemon.resistances.electric,
                "ground":pokemon.resistances.ground,
                "rock":pokemon.resistances.rock,
                "psychic":pokemon.resistances.psychic,
                "ice":pokemon.resistances.ice,
                "bug":pokemon.resistances.bug,
                "ghost":pokemon.resistances.ghost,
                "steel":pokemon.resistances.steel,
                "dragon":pokemon.resistances.dragon,
                "dark":pokemon.resistances.dark,
                "fairy":pokemon.resistances.fairy,
            }
        }
    return p

def initialize_database(connection_string):
    engine = create_engine(connection_string, echo=True)
    if not database_exists(engine.url):
        create_database(engine.url)
    return engine

def create_tables(engine):
    Base.metadata.create_all(engine)

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
                new_resistances.fighting*=2
            case 'fire':
                new_resistances.fire/=2
                new_resistances.grass/=2
                new_resistances.ice/=2
                new_resistances.bug/=2
                new_resistances.steel/=2
                new_resistances.fairy/=2
                new_resistances.water*=2
                new_resistances.ground*=2
                new_resistances.rock*=2
            case 'water':
                new_resistances.fire/=2
                new_resistances.water/=2
                new_resistances.ice/=2
                new_resistances.steel/=2
                new_resistances.grass*=2
                new_resistances.electric*=2
            case 'electric':
                new_resistances.electric/=2
                new_resistances.flying/=2
                new_resistances.steel/=2
                new_resistances.ground*=2
            case 'grass':
                new_resistances.water/=2
                new_resistances.electric/=2
                new_resistances.grass/=2
                new_resistances.ground/=2
                new_resistances.fire*=2
                new_resistances.ice*=2
                new_resistances.poison*=2
                new_resistances.flying*=2
                new_resistances.bug*=2
            case 'ice':
                new_resistances.ice/=2
                new_resistances.fire*=2
                new_resistances.fighting*=2
                new_resistances.rock*=2
                new_resistances.steel*=2
            case 'fighting':
                new_resistances.bug/=2
                new_resistances.rock/=2
                new_resistances.dark/=2
                new_resistances.flying*=2
                new_resistances.psychic*=2
                new_resistances.fairy*=2
            case 'poison':
                new_resistances.grass/=2
                new_resistances.fighting/=2
                new_resistances.poison/=2
                new_resistances.bug/=2
                new_resistances.fairy/=2
                new_resistances.psychic*=2
                new_resistances.ground*=2
            case 'ground':
                new_resistances.electric = 0
                new_resistances.poison/=2
                new_resistances.rock/=2
                new_resistances.water*=2
                new_resistances.grass*=2
                new_resistances.ice*=2
            case 'flying':
                new_resistances.ground = 0
                new_resistances.grass/=2
                new_resistances.fighting/=2
                new_resistances.bug/=2
                new_resistances.electric*=2
                new_resistances.ice*=2
                new_resistances.rock*=2
            case 'psychic':
                new_resistances.fighting/=2
                new_resistances.psychic/=2
                new_resistances.bug*=2
                new_resistances.ghost*=2
                new_resistances.dark*=2
            case 'bug':
                new_resistances.grass/=2
                new_resistances.fighting/=2
                new_resistances.ground/=2
                new_resistances.fire*=2
                new_resistances.flying*=2
                new_resistances.rock*=2
            case 'rock':
                new_resistances.normal/=2
                new_resistances.fire/=2
                new_resistances.poison/=2
                new_resistances.flying/=2
                new_resistances.water*=2
                new_resistances.grass*=2
                new_resistances.fighting*=2
                new_resistances.ground*=2
                new_resistances.steel*=2
            case 'ghost':
                new_resistances.normal = 0
                new_resistances.fighting = 0
                new_resistances.poison/=2
                new_resistances.bug/=2
                new_resistances.ghost*=2
                new_resistances.dark*=2
            case 'dragon':
                new_resistances.fire/=2
                new_resistances.water/=2
                new_resistances.electric/=2
                new_resistances.grass/=2
                new_resistances.ice*=2
                new_resistances.dragon*=2
                new_resistances.fairy*=2
            case 'dark':
                new_resistances.psychic = 0
                new_resistances.ghost/=2
                new_resistances.dark/=2
                new_resistances.fighting*=2
                new_resistances.bug*=2
                new_resistances.fairy*=2
            case 'steel':
                new_resistances.poison = 0
                new_resistances.normal/=2
                new_resistances.grass/=2
                new_resistances.ice/=2
                new_resistances.flying/=2
                new_resistances.psychic/=2
                new_resistances.bug/=2
                new_resistances.rock/=2
                new_resistances.dragon/=2
                new_resistances.steel/=2
                new_resistances.fairy/=2
                new_resistances.fire*=2
                new_resistances.fighting*=2
                new_resistances.ground*=2
            case 'fairy':
                new_resistances.dragon = 0
                new_resistances.fighting/=2
                new_resistances.bug/=2
                new_resistances.dark/=2
                new_resistances.poison*=2
                new_resistances.steel*=2
    return new_resistances
