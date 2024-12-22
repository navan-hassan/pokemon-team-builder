from sqlalchemy import create_engine, select, or_
from sqlalchemy.orm import sessionmaker
from sqlalchemy_utils import database_exists, create_database

from app.configuration import get_db_connection
from app.objects import Base, Pokemon, Stats, User, PokemonTeam
from app.util import PokemonStats, PokemonTypes

ENGINE = create_engine(get_db_connection())
Session = sessionmaker(bind=ENGINE)


def get_all_pokemon():
    with Session() as session:
        stmt = select(Pokemon)
        return [pokemon.as_dict() for pokemon in session.scalars(stmt).all()]


def get_pokemon_by_stat(stat, value):
    with Session() as session:
        stmt = create_statement(stat, value)
        return [stats.pokemon.as_dict(True) for stats in session.scalars(stmt).all()]


def get_pokemon_by_type(pokemon_type: str | PokemonTypes):
    with Session() as session:
        stmt = select(Pokemon).filter(or_(Pokemon.primary_type == pokemon_type, Pokemon.secondary_type == pokemon_type))
        return [pokemon.as_dict(True) for pokemon in session.scalars(stmt).all()]


def get_pokemon_by_id(pokemon_id: int):
    with Session() as session:
        stmt = select(Pokemon).where(Pokemon.id == pokemon_id)
        return [pokemon.as_dict(True) for pokemon in session.scalars(stmt).all()]


def create_statement(param, value):
    match param:
        case PokemonStats.HP:
            return select(Stats).filter(Stats.hp >= value).join(Pokemon)
        case PokemonStats.ATTACK:
            return select(Stats).filter(Stats.attack >= value).join(Pokemon)
        case PokemonStats.DEFENSE:
            return select(Stats).filter(Stats.defense >= value).join(Pokemon)
        case PokemonStats.SPECIAL_ATTACK:
            return select(Stats).filter(Stats.special_attack >= value).join(Pokemon)
        case PokemonStats.SPECIAL_DEFENSE:
            return select(Stats).filter(Stats.special_defense >= value).join(Pokemon)
        case PokemonStats.SPEED:
            return select(Stats).filter(Stats.speed >= value).join(Pokemon)
        case PokemonStats.BASE_STAT_TOTAL:
            return select(Stats).filter(Stats.base_stat_total >= value).join(Pokemon)


def is_username_taken(username: str):
    with Session() as session:
        return session.query(User.username).filter_by(username=username).scalar() is not None


def add_user_to_database(user: User):
    with Session() as session:
        session.add_all([user])
        session.commit()


def initialize_database(connection_string):
    engine = create_engine(connection_string, echo=True)
    if not database_exists(engine.url):
        create_database(engine.url)
    return engine


def retrieve_user_from_database(username: str):
    with Session() as session:
        return session.query(User).filter(User.username == username).first()


def configure_engine(connection_string):
    global ENGINE
    global Session
    ENGINE = create_engine(connection_string)
    Session = sessionmaker(bind=ENGINE)


def create_tables():
    Base.metadata.create_all(ENGINE)


def create_pokemon_team(user_id: int, slot_1: int = None, slot_2: int = None, slot_3: int = None,
                        slot_4: int = None, slot_5: int = None, slot_6: int = None):
    with Session() as session:
        new_team = PokemonTeam(
            user_id=user_id,
            slot_1=slot_1,
            slot_2=slot_2,
            slot_3=slot_3,
            slot_4=slot_4,
            slot_5=slot_5,
            slot_6=slot_6
        )

        avg_stats = Stats(
            hp=0,
            attack=0,
            defense=0,
            special_attack=0,
            special_defense=0,
            speed=0,
            base_stat_total=0
        )

        session.add_all([avg_stats, new_team])
        session.commit()

        pokemon_list = [new_team.pokemon_1, new_team.pokemon_2, new_team.pokemon_3,
                        new_team.pokemon_4, new_team.pokemon_5, new_team.pokemon_6]

        for pokemon in pokemon_list:
            if pokemon is None or pokemon.stats is None:
                continue
            avg_stats.hp += pokemon.stats.hp
            avg_stats.attack += pokemon.stats.attack
            avg_stats.defense += pokemon.stats.defense
            avg_stats.special_attack += pokemon.stats.special_attack
            avg_stats.special_defense += pokemon.stats.special_defense
            avg_stats.speed += pokemon.stats.speed
            avg_stats.base_stat_total += pokemon.stats.base_stat_total

        team_size = new_team.count()
        avg_stats.hp = round(avg_stats.hp / team_size)
        avg_stats.attack = round(avg_stats.attack / team_size)
        avg_stats.defense = round(avg_stats.defense / team_size)
        avg_stats.special_attack = round(avg_stats.special_attack / team_size)
        avg_stats.special_defense = round(avg_stats.special_defense / team_size)
        avg_stats.speed = round(avg_stats.speed / team_size)
        avg_stats.base_stat_total = round(avg_stats.base_stat_total / team_size)

        new_team.avg_stats_id = avg_stats.id
        session.commit()

        return new_team.as_dict()


def retrieve_teams_from_user(username: str):
    with Session() as session:
        user = session.query(User).filter(User.username == username).first()
        if user is None:
            return []

        return [team.as_dict() for team in user.teams]
