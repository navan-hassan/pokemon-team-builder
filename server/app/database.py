from sqlalchemy import create_engine, Engine, select, or_
from sqlalchemy.orm import Session
from sqlalchemy_utils import database_exists, create_database
from app.objects import Base, Pokemon, Stats
from app.util import Params


def get_all_pokemon(engine):
    with Session(engine) as session:
        stmt = select(Pokemon)
        result = session.scalars(stmt)
        return [p.as_dict() for p in result]


def get_pokemon_by_stat(engine, stat, quantity, recursive=False):
    with Session(engine) as session:
        stmt = create_statement(stat, quantity)
        result = session.scalars(stmt)
        return [p.pokemon.as_dict(recursive) for p in result]


def get_pokemon_by_type(engine, typing, value):
    with Session(engine) as session:
        stmt = create_statement(typing, value)
        result = session.scalars(stmt)
        return [p.as_dict() for p in result]


def create_statement(param, value):
    match param:
        case Params.HP:
            return select(Stats).where(Stats.hp >= value)
        case Params.ATTACK:
            return select(Stats).where(Stats.attack >= value)
        case Params.DEFENSE:
            return select(Stats).where(Stats.defense >= value)
        case Params.SPECIAL_ATTACK:
            return select(Stats).where(Stats.sp_atk >= value)
        case Params.SPECIAL_DEFENSE:
            return select(Stats).where(Stats.sp_def >= value)
        case Params.SPEED:
            return select(Stats).where(Stats.speed >= value)
        case Params.BASE_STAT_TOTAL:
            return select(Stats).where(Stats.base_stat_total >= value)
        case Params.TYPING:
            return select(Pokemon).filter(
                or_(
                    Pokemon.primary_type == value,
                    Pokemon.secondary_type == value
                )
            )
        case Params.ID:
            return select(Pokemon).where(Pokemon.id == value)


def get_pokemon_by_id(pokemon_id: int, engine: Engine):
    with Session(engine) as session:
        stmt = create_statement(Params.ID, pokemon_id)
        r = session.scalars(stmt).one_or_none()
        print(r)
        return r


def initialize_database(connection_string):
    engine = create_engine(connection_string, echo=True)
    if not database_exists(engine.url):
        create_database(engine.url)
    return engine


def create_tables(engine):
    Base.metadata.create_all(engine)
