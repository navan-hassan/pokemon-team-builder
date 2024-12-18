import os
from dotenv import load_dotenv

load_dotenv()


def get_db_connection():
    return os.getenv("DB_CONNECTION")


def get_test_db_connection():
    return os.getenv("TEST_DB")