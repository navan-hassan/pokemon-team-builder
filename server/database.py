import sqlite3

def getAllPokemon():
    connection = sqlite3.connect("pokemon.db")
    cursor = connection.cursor()
    rows = cursor.execute(
        """SELECT *
        FROM pokemon"""
    ).fetchall()
    connection.close()
    return rows

def getPokemonByName(pokemon):
    connection = sqlite3.connect("pokemon.db")
    cursor = connection.cursor()
    rows = cursor.execute(
        """SELECT *
        FROM pokemon 
        WHERE name = ?""", 
        (pokemon,)
    ).fetchall()
    connection.close()
    return rows

def getPokemonById(id):
    connection = sqlite3.connect("pokemon.db")
    cursor = connection.cursor()
    rows = cursor.execute(
        """SELECT *
        FROM pokemon 
        WHERE id = ?""", 
        (id,)
    ).fetchall()
    connection.close()
    return rows

def getPokemonByType(pkmnType):
    connection = sqlite3.connect("pokemon.db")
    cursor = connection.cursor()
    rows = cursor.execute(
        """SELECT 
        id,
        name, 
        primary_type, 
        secondary_type
        FROM pokemon
        WHERE primary_type = ? OR secondary_type = ?""",
        (pkmnType, pkmnType) 
    ).fetchall()
    connection.close()
    return rows

def getPokemonByStat(stat, amount):
    connection = sqlite3.connect("pokemon.db")
    cursor = connection.cursor()
    rows = cursor.execute(
        """SELECT 
        id,
        name, 
        primary_type, 
        secondary_type,
        FROM pokemon
        WHERE ? >= 100""",
        (stat, stat,) 
    ).fetchall()
    connection.close()
    return rows
