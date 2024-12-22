from argon2 import PasswordHasher
from argon2.exceptions import VerificationError
from app.objects import User
from app.database import is_username_taken, retrieve_user_from_database
PASSWORD_HASHER = PasswordHasher()


def login_user(username, password_to_verify) -> User | None:
    if not is_username_taken(username=username):
        return None
    user = retrieve_user_from_database(username)
    try:
        PASSWORD_HASHER.verify(user.password, password_to_verify)
    except VerificationError as e:
        return None
    return user


def register_user(username, password):
    if is_username_taken(username):
        return None
    hashed_password = PASSWORD_HASHER.hash(password)
    new_user = User(
        username=username,
        password=hashed_password
    )
    return new_user
