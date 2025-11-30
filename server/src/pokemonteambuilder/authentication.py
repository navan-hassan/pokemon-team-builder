from argon2 import PasswordHasher
from argon2.exceptions import VerificationError

from sqlalchemy.ext.asyncio import async_sessionmaker
from pokemonteambuilder.objects import User
from pokemonteambuilder.database import is_username_taken, retrieve_teams_from_user, retrieve_user_from_database
from pokemonteambuilder.util import Params

PASSWORD_HASHER = PasswordHasher()

async def login_user(username, password_to_verify, session_factory: async_sessionmaker) -> dict | None:
    if not (user := await retrieve_user_from_database(username, session_factory)):
        return
    try:
        PASSWORD_HASHER.verify(user[Params.PASSWORD], password_to_verify)
    except VerificationError as e:
        return

    teams = await retrieve_teams_from_user(user[Params.USERNAME])
    return {
        Params.USERNAME: user[Params.USERNAME],
        Params.TEAMS: teams
    }


async def register_user(username, password, session_factory: async_sessionmaker) ->  User | None:
    if (exists := await is_username_taken(username, session_factory)):
        return

    hashed_password = PASSWORD_HASHER.hash(password)
    new_user = User(username=username, password=hashed_password)
    return new_user
