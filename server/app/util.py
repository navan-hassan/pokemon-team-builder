from enum import Enum, IntEnum, StrEnum


class StrValues(StrEnum):
    TYPE = "type"
    ID = 'id'
    NAME = 'name'
    PRIMARY_TYPE = 'primary_type'
    SECONDARY_TYPE = 'secondary_type'
    STATS = 'stats'
    RESISTANCES = 'resistances'
    USERNAME = 'username'
    PASSWORD = 'password'
    ABILITY_1 = 'ability1'
    ABILITY_2 = 'ability2'
    HIDDEN_ABILITY = 'hidden_ability'
    SPRITE = 'sprite'
    TEAM = 'team'
    TEAMS = 'teams'
    SLOT_1 = 'slot_1'
    SLOT_2 = 'slot_2'
    SLOT_3 = 'slot_3'
    SLOT_4 = 'slot_4'
    SLOT_5 = 'slot_5'
    SLOT_6 = 'slot_6'
    USER = 'user'
    NONE = 'none'
    COUNT = 'count'


class Tablenames(StrEnum):
    POKEMON = 'pokemon'
    RESISTANCES = 'resistances'
    STATS = 'stats'
    USERS = 'users'
    TEAMS = 'teams'


class Params(StrEnum):
    TYPE = "type"
    ID = 'id'
    COUNT = 'count'
    USERNAME = 'username'
    PASSWORD = 'password'
    TEAM = 'team'
    TEAMS = 'teams'
    SLOT_1 = 'slot_1'
    SLOT_2 = 'slot_2'
    SLOT_3 = 'slot_3'
    SLOT_4 = 'slot_4'
    SLOT_5 = 'slot_5'
    SLOT_6 = 'slot_6'


class PokemonTypes(str, Enum):
    NORMAL = "normal"
    FIRE = "fire"
    WATER = "water"
    GRASS = "grass"
    FLYING = "flying"
    FIGHTING = "fighting"
    POISON = "poison"
    ELECTRIC = "electric"
    GROUND = "ground"
    ROCK = "rock"
    PSYCHIC = "psychic"
    ICE = "ice"
    BUG = "bug"
    GHOST = "ghost"
    STEEL = "steel"
    DRAGON = "dragon"
    DARK = "dark"
    FAIRY = "fairy"


class PokemonStats(str, Enum):
    HP = "hp"
    ATTACK = "attack"
    DEFENSE = "defense"
    SPECIAL_ATTACK = "special_attack"
    SPECIAL_DEFENSE = "special_defense"
    SPEED = "speed"
    BASE_STAT_TOTAL = "base_stat_total"


class ErrorMessage(dict, Enum):
    USERNAME_TAKEN = {
        "error": "Conflict",
        "message": "Username is already taken."
    }
    INVALID_CREDENTIALS = {
        "error": "Unauthorized",
        "message": "Invalid credentials provided."
    }


class ResponseCode(IntEnum):
    SUCCESS = 200
    INVALID_CREDENTIALS = 401
    USERNAME_TAKEN = 409
