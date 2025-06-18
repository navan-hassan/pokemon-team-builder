from statistics import fmean
from sqlalchemy import select, or_
from sqlalchemy.ext.asyncio import async_sessionmaker
from sqlalchemy.orm import selectinload

from pokemonteambuilder.objects import Pokemon, Stats, User, PokemonTeam
from pokemonteambuilder.util import PokemonTypes
from pokemonteambuilder.api import PokemonTeamSlots


async def get_all_pokemon(session_factory: async_sessionmaker) -> list[dict]:
    stmt = select(Pokemon).options(*Pokemon.select_loadable_attributes())
    async with session_factory() as session, session.begin():
        result = await session.execute(stmt)
        return [pokemon.as_dict() for pokemon in result.scalars().all()]


async def get_pokemon_by_stat(stat, value, session_factory: async_sessionmaker) -> list[dict]:
    condition = Stats.get_attribute(stat) >= value
    stmt = select(Stats).filter(condition).join(Pokemon).options(*Stats.select_loadable_attributes())
    async with session_factory() as session, session.begin():
        result = await session.execute(stmt)
        return [stats.pokemon.as_dict(recursive=True) for stats in result.scalars().all()]


async def get_pokemon_by_type(*args: str | PokemonTypes, session_factory: async_sessionmaker) -> list[dict]:
    conditions = (
        *(Pokemon.primary_type == pokemon_type for pokemon_type in args), 
        *(Pokemon.secondary_type == pokemon_type for pokemon_type in args)
    )
    stmt = select(Pokemon).filter(or_(*conditions)).options(*Pokemon.select_loadable_attributes())
    async with session_factory() as session, session.begin():
        result = await session.execute(stmt)
        return [pokemon.as_dict(recursive=True) for pokemon in result.scalars().all()]


async def get_pokemon_by_id(*args: int, session_factory: async_sessionmaker) -> list[dict]:
    print(*args)
    conditions = (Pokemon.id == id for id in args)
    stmt = select(Pokemon).where(or_(*conditions)).options(*Pokemon.select_loadable_attributes())
    async with session_factory() as session, session.begin():
        result = await session.execute(stmt)
        return[pokemon.as_dict(recursive=True) for pokemon in result.scalars().all()]


async def retrieve_team_by_id(id: int, session_factory: async_sessionmaker) -> list[dict]:
    team = []
    stmt = select(PokemonTeam).filter(PokemonTeam.id == id
        ).options(*PokemonTeam.select_loadable_attributes())
    async with session_factory() as session, session.begin():
        result = await session.execute(stmt)
        if t:= result.scalars().first():
            team.append(t.as_dict())
    return team


async def is_username_taken(username: str, session_factory: async_sessionmaker) -> bool:
    stmt = select(User).filter_by(username=username)
    async with session_factory() as session, session.begin():
        result = await session.execute(stmt)
        return result.scalar() is not None


async def retrieve_user_from_database(username: str, session_factory: async_sessionmaker) -> dict | None:
    stmt = select(User).where(User.username == username)
    async with session_factory() as session, session.begin():
        result = await session.execute(stmt)
        if user := result.scalars().first():
            return user.as_dict()
        return None

   
async def retrieve_teams_from_user(self,  username: str):
    pass # TODO: implement method using async sqlalchemy


async def update_pokemon_team(team_id: int, session_factory: async_sessionmaker, *, new_team: PokemonTeamSlots) -> dict:
    condition = (PokemonTeam.id == team_id)
    stmt = select(PokemonTeam).filter(condition).options(*PokemonTeam.select_loadable_attributes())

    async with session_factory() as session, session.begin():
        result = await session.execute(stmt)
        if not (team:= result.scalars().first()):
            return {}

        team.update_slots(new_slots=new_team)
        await session.commit()
        updated_team = await get_team_by_id(session_factory=session_factory, team_id=team.id)
        return updated_team


async def calculate_average_stats(session_factory: async_sessionmaker, *, slots: PokemonTeamSlots) -> Stats:
    conditions = (Pokemon.id == id for id in slots.iter_slots())
    stmt = select(Pokemon).where(or_(*conditions)).options(selectinload(Pokemon.stats))
    avg_stats = Stats.create_empty()
    async with session_factory() as session, session.begin():
        result = await session.execute(stmt)

        aggregate_hp = []
        aggregate_attack = []
        aggregate_defense = []
        aggregate_sp_attack = []
        aggregate_sp_defense = []
        aggregate_speed = []
        aggregate_bst = []

        for pokemon in result.scalars().all():
            aggregate_hp.append(pokemon.stats.hp)
            aggregate_attack.append(pokemon.stats.attack)
            aggregate_defense.append(pokemon.stats.defense)
            aggregate_sp_attack.append(pokemon.stats.special_attack)
            aggregate_sp_defense.append(pokemon.stats.special_defense)
            aggregate_speed.append(pokemon.stats.speed)
            aggregate_bst.append(pokemon.stats.base_stat_total)
        
        avg_stats.hp = round(fmean(aggregate_hp))
        avg_stats.attack = round(fmean(aggregate_attack))
        avg_stats.defense = round(fmean(aggregate_defense))
        avg_stats.special_attack = round(fmean(aggregate_sp_attack))
        avg_stats.special_defense = round(fmean(aggregate_sp_defense))
        avg_stats.speed = round(fmean(aggregate_speed))
        avg_stats.base_stat_total = round(fmean(aggregate_bst))
    return avg_stats


async def create_pokemon_team(session_factory: async_sessionmaker, *, slots: PokemonTeamSlots, user_id: int | None = None) -> dict:
    new_team = PokemonTeam.create(slots, user_id=user_id)
    new_team.avg_stats = await calculate_average_stats(session_factory=session_factory, slots=slots)
    async with session_factory() as session, session.begin():
        session.add_all([new_team])
        await session.commit()
        team_dict = await get_team_by_id(session_factory=session_factory, team_id=new_team.id)
        return team_dict


async def get_team_by_id(session_factory: async_sessionmaker, team_id: int) -> dict:
    condition = PokemonTeam.id == team_id
    stmt = select(PokemonTeam).filter(condition).options(*PokemonTeam.select_loadable_attributes())

    async with session_factory() as session, session.begin():
        result = await session.execute(stmt)
        if not (team:= result.scalars().first()):
            return {}

        print(team.count())
        return team.as_dict()