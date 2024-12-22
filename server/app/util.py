from enum import Enum


class Params(str, Enum):
    TYPE = "type"
    ID = 'id'
    USERNAME = 'username'


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
    BASE_STAT_TOTAL = "bst"
