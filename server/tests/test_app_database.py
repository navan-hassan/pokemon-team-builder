import random
import unittest
import logging
from app.configuration import get_test_db_connection
from app.database import *
from app.util import Params

logger = logging.getLogger(__name__)
logging.basicConfig(filename='test_app_database.log', level=logging.INFO)


class MyTestCase(unittest.TestCase):

    def setUp(self):
        self.engine = create_engine(get_test_db_connection())

    def test_get_pokemon_by_stat(self):

        result = get_pokemon_by_stat(self.engine, Params.SPECIAL_ATTACK, 100, True)
        for i in range(10):
            choice = random.choice(result)
            logger.info(f"Checking if {choice['name']}'s special attack is at least 100...")
            self.assertGreaterEqual(choice['stats']['special_attack'], 100)

        result = get_pokemon_by_stat(self.engine, Params.ATTACK, 40, True)
        for i in range(10):
            choice = random.choice(result)
            logger.info(f"Checking if {choice['name']}'s attack is at least 40...")
            self.assertGreaterEqual(choice['stats']['attack'], 40)

        result = get_pokemon_by_stat(self.engine, Params.SPEED, 130, True)
        for i in range(10):
            choice = random.choice(result)
            logger.info(f"Checking if {choice['name']}'s speed is at least 130...")
            self.assertGreaterEqual(choice['stats']['speed'], 40)

    def test_get_pokemon_by_type(self):
        result = get_pokemon_by_type(self.engine, Params.TYPING, "fire")
        for i in range(10):
            choice = random.choice(result)
            logger.info(f"Checking if {choice['name']} is a fire type...")
            self.assertTrue(choice['primary_type'] == 'fire' or choice['secondary_type'] == 'fire')

        result = get_pokemon_by_type(self.engine, Params.TYPING, "dark")
        for i in range(10):
            choice = random.choice(result)
            logger.info(f"Checking if {choice['name']} is a dark type...")
            self.assertTrue(choice['primary_type'] == 'dark' or choice['secondary_type'] == 'dark')

        result = get_pokemon_by_type(self.engine, Params.TYPING, "dragon")
        for i in range(10):
            choice = random.choice(result)
            logger.info(f"Checking if {choice['name']} is a dragon type...")
            self.assertTrue(choice['primary_type'] == 'dragon' or choice['secondary_type'] == 'dragon')

        result = get_pokemon_by_type(self.engine, Params.TYPING, "bug")
        for i in range(10):
            choice = random.choice(result)
            logger.info(f"Checking if {choice['name']} is a bug type...")
            self.assertTrue(choice['primary_type'] == 'bug' or choice['secondary_type'] == 'bug')


if __name__ == '__main__':
    logger.info('Starting tests...\n')
    unittest.main(verbosity=2)
    logger.info('Finished tests...\n')
