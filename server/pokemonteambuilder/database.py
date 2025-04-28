from sqlalchemy import select, or_
from sqlalchemy.ext.asyncio import async_sessionmaker

from pokemonteambuilder.objects import Pokemon, PokemonTeamSlots, Stats, User, PokemonTeam
from pokemonteambuilder.util import PokemonTypes

async def get_all_pokemon(session_factory: async_sessionmaker) -> list[dict]:
    pokemon_list = []
    stmt = select(Pokemon).options(
        *Pokemon.select_loadable_attributes()
        )
    async with session_factory() as session, session.begin():
        result = await session.execute(stmt)
        pokemon_list.extend(pokemon.as_dict() for pokemon in result.scalars().all())
    return pokemon_list


async def get_pokemon_by_stat(stat, value, session_factory: async_sessionmaker) -> list[dict]:
    pokemon_list = []
    stmt = select(Stats).filter(
        Stats.get_attribute(stat) >= value).join(Pokemon).options(
            *Stats.select_loadable_attributes())
    async with session_factory() as session, session.begin():
        result = await session.execute(stmt)
        pokemon_list.extend(stats.pokemon.as_dict(recursive=True) for stats in result.scalars().all())
    return pokemon_list


async def get_pokemon_by_type(pokemon_type: str | PokemonTypes, session_factory: async_sessionmaker) -> list[dict]:
    pokemon_list = []
    stmt = select(Pokemon).filter(
        or_(
            Pokemon.primary_type == pokemon_type,
            Pokemon.secondary_type == pokemon_type
        )).options(
            *Pokemon.select_loadable_attributes()
        )
    async with session_factory() as session, session.begin():
        result = await session.execute(stmt)
        pokemon_list.extend(pokemon.as_dict(recursive=True) for pokemon in result.scalars().all())
    return pokemon_list


async def get_pokemon_by_id(pokemon_id: int, session_factory: async_sessionmaker) -> list[dict]:
    pokemon_list = []
    stmt = select(Pokemon).where(
        Pokemon.id == pokemon_id
    ).options(
        *Pokemon.select_loadable_attributes()
    )
    async with session_factory() as session, session.begin():
        result = await session.execute(stmt)
        pokemon_list.extend(pokemon.as_dict(recursive=True) for pokemon in result.scalars().all())
    return pokemon_list


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
    stmt = select(PokemonTeam).filter(PokemonTeam.id == team_id
        ).options(*PokemonTeam.select_loadable_attributes())

    async with session_factory() as session, session.begin():
        result = await session.execute(stmt)
        if not (team:= result.scalars().first()):
            return {}

        team.update_slots(new_team)
        await session.commit()

        return team.as_dict()

    
async def create_pokemon_team(self, session_factory: async_sessionmaker, *, slots: PokemonTeamSlots, user_id: int | None = None) -> dict:
    new_team = PokemonTeam.create(slots, user_id=user_id)
    avg_stats = Stats.create_empty()
    async with session_factory() as session, session.begin():
        await session.add_all([avg_stats, new_team])
        new_team.avg_stats_id = avg_stats.id
        new_team.calculate_average_stats()
        await session.commit()
    return new_team.as_dict()
