from sqlalchemy import select, or_, Select
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker

from pokemonteambuilder.objects import PokemonTeamBuilderData, Pokemon, PokemonTeamSlots, Stats, User, PokemonTeam
from pokemonteambuilder.util import PokemonTypes

class AsyncEngineContext:
    def __init__(self, *, url: str):
        self.url = url
        self._session_factory = None
        self.engine = None


    async def __aenter__(self):
        self.engine = create_async_engine(self.url, echo=True)
        self._session_factory = async_sessionmaker(self.engine, expire_on_commit=False)
        return self


    async def __aexit__(self, exc_type, exc, tb):
        if self.engine is None:
            return
        await self.engine.dispose()


    async def process_query(self, stmt: Select):
        async with self.session_factory() as session, session.begin():
            result = await session.execute(stmt)
            return result


    async def commit_items(self, items: list[PokemonTeamBuilderData]):
        async with self.session_factory() as session, session.begin():
            session.add_all(items)
            await session.commit()


    @property
    def session_factory(self):
        if self._session_factory is None:
            self._session_factory = async_sessionmaker(self.engine, expire_on_commit=False)
        return self._session_factory


class DataContext:
    def __init__(self, connection_string: str):
        self.connection_string = connection_string


    async def get_all_pokemon(self) -> list[dict]:
        pokemon_list = []
        stmt = select(Pokemon).options(
            *Pokemon.select_loadable_attributes()
            )
        async with AsyncEngineContext(url=self.connection_string) as engine:
            result = await engine.process_query(stmt)
            pokemon_list.extend(pokemon.as_dict() for pokemon in result.scalars().all())
        return pokemon_list

    
    async def get_pokemon_by_stat(self, stat, value) -> list[dict]:
        pokemon_list = []
        stmt = select(Stats).filter(
            Stats.get_attribute(stat) >= value).join(Pokemon).options(
                *Stats.select_loadable_attributes())
        async with AsyncEngineContext(url=self.connection_string) as engine:
            result = await engine.process_query(stmt)
            pokemon_list.extend(stats.pokemon.as_dict(recursive=True) for stats in result.scalars().all())
        return pokemon_list


    async def get_pokemon_by_type(self, pokemon_type: str | PokemonTypes) -> list[dict]:
        pokemon_list = []
        stmt = select(Pokemon).filter(
            or_(
                Pokemon.primary_type == pokemon_type,
                Pokemon.secondary_type == pokemon_type
            )).options(
                *Pokemon.select_loadable_attributes()
            )
        async with AsyncEngineContext(url=self.connection_string) as engine:
            result = await engine.process_query(stmt)
            pokemon_list.extend(pokemon.as_dict(recursive=True) for pokemon in result.scalars().all())
        return pokemon_list


    async def get_pokemon_by_id(self, pokemon_id: int) -> list[dict]:
        pokemon_list = []
        stmt = select(Pokemon).where(
            Pokemon.id == pokemon_id
        ).options(
            *Pokemon.select_loadable_attributes()
        )
        async with AsyncEngineContext(url=self.connection_string) as engine:
            result = await engine.process_query(stmt)
            pokemon_list.extend(pokemon.as_dict(recursive=True) for pokemon in result.scalars().all())
        return pokemon_list

    
    async def retrieve_team_by_id(self, id: int) -> list[dict]:
        team = []
        stmt = select(PokemonTeam).filter(PokemonTeam.id == id
            ).options(*PokemonTeam.select_loadable_attributes())
        async with AsyncEngineContext(url=self.connection_string) as engine:
            result = await engine.process_query(stmt)
            if t:= result.scalars().first():
                team.append(t.as_dict())
        return team

    
    async def is_username_taken(self, username: str) -> bool:
        stmt = select(User).filter_by(username=username)
        async with AsyncEngineContext(url=self.connection_string) as engine:
            result = await engine.process_query(stmt)
            return result.scalar() is not None

        
    async def retrieve_user_from_database(self, username: str) -> dict | None:
        stmt = select(User).where(User.username == username)
        async with AsyncEngineContext(url=self.connection_string) as engine:
            result = await engine.process_query(stmt)
            if user := result.scalars().first():
                return user.as_dict()
            return None
        
    async def retrieve_teams_from_user(self,  username: str):
        pass # TODO: implement method using async sqlalchemy

        
    async def update_pokemon_team(self, team_id: int, *, new_team: PokemonTeamSlots) -> dict:
        stmt = select(PokemonTeam).filter(PokemonTeam.id == team_id
            ).options(*PokemonTeam.select_loadable_attributes())

        async with AsyncEngineContext(url=self.connection_string) as engine:
            result = await engine.process_query(stmt)
            if not (team:= result.scalars().first()):
                return dict()

            async with engine.session_factory() as session:
                team.update_slots(new_team)
                await session.commit()

            return team.as_dict()

        
    async def create_pokemon_team(self, user_id: int | None = None, *, slots: PokemonTeamSlots) -> dict:
        new_team = PokemonTeam.create(slots, user_id=user_id)
        avg_stats = Stats.create_empty()
        async with AsyncEngineContext(url=self.connection_string) as engine:
            await engine.commit_items([avg_stats, new_team])

            async with engine.session_factory() as session:
                new_team.avg_stats_id = avg_stats.id
                new_team.calculate_average_stats()
                await session.commit()
                return new_team.as_dict()
