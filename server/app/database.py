from sqlalchemy import create_engine, select, or_, Engine, Select
from sqlalchemy.orm import sessionmaker
from sqlalchemy_utils import database_exists, create_database

from app.configuration import get_db_connection
from app.objects import Base, Pokemon, Stats, User, PokemonTeam
from app.util import PokemonStats, PokemonTypes

ENGINE = create_engine(get_db_connection())
Session = sessionmaker(bind=ENGINE)


class DataContext:
    engine = None
    session_factory = None

    def __init__(self, connection_string):
        self.engine = create_engine(connection_string)
        self.session_factory = sessionmaker(self.engine)


def get_all_pokemon() -> list[dict]:
    with Session() as session:
        stmt = select(Pokemon)
        return [pokemon.as_dict() for pokemon in session.scalars(stmt).all()]


def get_pokemon_by_stat(stat, value) -> list[dict]:
    with Session() as session:
        stmt = create_statement(stat, value)
        return [stats.pokemon.as_dict(True) for stats in session.scalars(stmt).all()]


def get_pokemon_by_type(pokemon_type: str | PokemonTypes) -> list[dict]:
    with Session() as session:
        stmt = select(Pokemon).filter(
            or_(
                Pokemon.primary_type == pokemon_type,
                Pokemon.secondary_type == pokemon_type
            )
        )
        return [pokemon.as_dict(recursive=True) for pokemon in session.scalars(stmt).all()]


def get_pokemon_by_id(pokemon_id: int) -> list[dict]:
    with Session() as session:
        stmt = select(Pokemon).where(Pokemon.id == pokemon_id)
        return [pokemon.as_dict(recursive=True) for pokemon in session.scalars(stmt).all()]


def create_statement(param, value) -> Select:
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


def is_username_taken(username: str) -> bool:
    with Session() as session:
        return session.query(User.username).filter_by(username=username).scalar() is not None


def add_user_to_database(user: User) -> None:
    with Session() as session:
        session.add_all([user])
        session.commit()


def initialize_database(connection_string) -> Engine:
    engine = create_engine(connection_string, echo=True)
    if not database_exists(engine.url):
        create_database(engine.url)
    return engine


def retrieve_user_from_database(username: str) -> dict | None:
    with Session() as session:
        stmt = select(User).where(User.username == username)
        user = session.scalars(stmt).first()
        if user is not None:
            return user.as_dict()
        return None


def configure_engine(connection_string) -> None:
    global ENGINE
    global Session
    ENGINE = create_engine(connection_string)
    Session = sessionmaker(bind=ENGINE)


def create_tables():
    Base.metadata.create_all(ENGINE)


def does_team_exist(team_id: int) -> bool:
    with Session() as session:
        return session.query(PokemonTeam.id).filter_by(id=team_id).scalar() is not None


def calculate_average_stats(team: PokemonTeam) -> None:
    stats = team.avg_stats
    stats.hp = 0
    stats.attack = 0
    stats.defense = 0
    stats.special_attack = 0
    stats.special_defense = 0
    stats.speed = 0
    stats.base_stat_total = 0

    for pokemon in (team.pokemon_1, team.pokemon_2, team.pokemon_3, team.pokemon_4, team.pokemon_5, team.pokemon_6):
        if pokemon is None or pokemon.stats is None:
            continue
        stats.hp += pokemon.stats.hp
        stats.attack += pokemon.stats.attack
        stats.defense += pokemon.stats.defense
        stats.special_attack += pokemon.stats.special_attack
        stats.special_defense += pokemon.stats.special_defense
        stats.speed += pokemon.stats.speed
        stats.base_stat_total += pokemon.stats.base_stat_total

    team_size = team.count()
    stats.hp = round(stats.hp / team_size)
    stats.attack = round(stats.attack / team_size)
    stats.defense = round(stats.defense / team_size)
    stats.special_attack = round(stats.special_attack / team_size)
    stats.special_defense = round(stats.special_defense / team_size)
    stats.speed = round(stats.speed / team_size)
    stats.base_stat_total = round(stats.base_stat_total / team_size)


def update_pokemon_team(team_id: int, slot_1: int = None, slot_2: int = None, slot_3: int = None,
                        slot_4: int = None, slot_5: int = None, slot_6: int = None) -> dict:
    with Session() as session:
        team = session.query(PokemonTeam).filter_by(id=team_id).scalar()

        team.slot_1 = slot_1
        team.slot_2 = slot_2
        team.slot_3 = slot_3
        team.slot_4 = slot_4
        team.slot_5 = slot_5
        team.slot_6 = slot_6

        calculate_average_stats(team)

        session.commit()

        return team.as_dict()


def create_pokemon_team(user_id: int = None, slot_1: int = None, slot_2: int = None, slot_3: int = None,
                        slot_4: int = None, slot_5: int = None, slot_6: int = None) -> dict:
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

        new_team.avg_stats_id = avg_stats.id
        calculate_average_stats(new_team)

        session.commit()

        return new_team.as_dict()


def retrieve_teams_from_user(username: str) -> list[dict]:
    with Session() as session:
        user = session.query(User).filter(User.username == username).first()
        if user is None:
            return []

        return [team.as_dict() for team in user.teams]
