from argon2 import PasswordHasher
from argon2.exceptions import VerificationError
from pokemonteambuilder.objects import User
from pokemonteambuilder.database import DataContext
from pokemonteambuilder.util import Params

PASSWORD_HASHER = PasswordHasher()


async def login_user(context: DataContext, username, password_to_verify) -> dict | None:
    if not (user := await context.retrieve_user_from_database(username)):
        return
    try:
        PASSWORD_HASHER.verify(user[Params.PASSWORD], password_to_verify)
    except VerificationError as e:
        return

    teams = await context.retrieve_teams_from_user(user[Params.USERNAME])
    return {
        Params.USERNAME: user[Params.USERNAME],
        Params.TEAMS: teams
    }


async def register_user(context, username, password) ->  User | None:
    if (exists := await context.is_username_taken(username)):
        return

    hashed_password = PASSWORD_HASHER.hash(password)
    new_user = User(username=username, password=hashed_password)
    return new_user
