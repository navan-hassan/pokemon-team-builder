from argon2 import PasswordHasher
from argon2.exceptions import VerificationError
from app.objects import User
from app.database import is_username_taken, retrieve_user_from_database, retrieve_teams_from_user
from app.util import Params

PASSWORD_HASHER = PasswordHasher()


def login_user(context, username, password_to_verify) -> dict | None:
    if not is_username_taken(context, username):
        return None
    user = retrieve_user_from_database(context, username)
    if user is None:
        return None

    try:
        PASSWORD_HASHER.verify(user[Params.PASSWORD], password_to_verify)
    except VerificationError as e:
        return None

    teams = retrieve_teams_from_user(context, user[Params.USERNAME])
    return {
        Params.USERNAME: user[Params.USERNAME],
        Params.TEAMS: teams
    }


def register_user(context, username, password) ->  User | None:
    if is_username_taken(context, username):
        return None
    hashed_password = PASSWORD_HASHER.hash(password)
    new_user = User(
        username=username,
        password=hashed_password
    )
    return new_user
