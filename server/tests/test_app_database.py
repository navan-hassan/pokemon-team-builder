import logging
import random
import unittest

from app.authentication import register_user, login_user
from app.configuration import get_test_db_connection
from app.database import *
from app.util import PokemonStats, PokemonTypes

logger = logging.getLogger(__name__)
logging.basicConfig(filename='test_app_database.log', level=logging.INFO)


class MyTestCase(unittest.TestCase):

    def setUp(self):
        configure_engine(get_test_db_connection())

    def test_get_pokemon_by_stat(self):
        result = get_pokemon_by_stat(PokemonStats.SPECIAL_ATTACK, 100)
        for i in range(10):
            choice = random.choice(result)
            logger.info(f"Checking if {choice['name']}'s special attack is at least 100...")
            self.assertGreaterEqual(choice['stats'][PokemonStats.SPECIAL_ATTACK], 100)

        result = get_pokemon_by_stat(PokemonStats.ATTACK, 40)
        for i in range(10):
            choice = random.choice(result)
            logger.info(f"Checking if {choice['name']}'s attack is at least 40...")
            self.assertGreaterEqual(choice['stats'][PokemonStats.ATTACK], 40)

        result = get_pokemon_by_stat(PokemonStats.SPEED, 130)
        for i in range(10):
            choice = random.choice(result)
            logger.info(f"Checking if {choice['name']}'s speed is at least 130...")
            self.assertGreaterEqual(choice['stats'][PokemonStats.SPEED], 40)

    def test_get_pokemon_by_type(self):
        result = get_pokemon_by_type("fire")
        for i in range(10):
            choice = random.choice(result)
            logger.info(f"Checking if {choice['name']} is a fire type...")
            self.assertTrue(choice['primary_type'] == PokemonTypes.FIRE
                            or choice['secondary_type'] == PokemonTypes.FIRE)

        result = get_pokemon_by_type("dark")
        for i in range(10):
            choice = random.choice(result)
            logger.info(f"Checking if {choice['name']} is a dark type...")
            self.assertTrue(choice['primary_type'] == PokemonTypes.DARK
                            or choice['secondary_type'] == PokemonTypes.DARK)

        result = get_pokemon_by_type("dragon")
        for i in range(10):
            choice = random.choice(result)
            logger.info(f"Checking if {choice['name']} is a dragon type...")
            self.assertTrue(choice['primary_type'] == PokemonTypes.DRAGON
                            or choice['secondary_type'] == PokemonTypes.DRAGON)

        result = get_pokemon_by_type("bug")
        for i in range(10):
            choice = random.choice(result)
            logger.info(f"Checking if {choice['name']} is a bug type...")
            self.assertTrue(choice['primary_type'] == PokemonTypes.BUG
                            or choice['secondary_type'] == PokemonTypes.BUG)

    def test_is_username_taken(self):
        self.assertTrue(is_username_taken("some_username"))
        self.assertTrue(is_username_taken("john_smith"))
        self.assertTrue(is_username_taken("georgewashington"))
        self.assertFalse(is_username_taken("someusername"))
        self.assertFalse(is_username_taken("johnsmith"))
        self.assertFalse(is_username_taken("georgew ashington"))

    def test_register_user(self):
        test_user = register_user("unused_username", "test_password")
        self.assertIsNotNone(test_user)
        self.assertTrue(test_user.password.startswith('$argon2'))
        self.assertTrue(test_user.username == "unused_username")
        self.assertTrue(len(test_user.teams) == 0)

    def test_login_user(self):
        self.assertIsNotNone(login_user("some_username", "some_password"))
        self.assertIsNotNone(login_user("john_smith", "anotherpassword123"))
        self.assertIsNotNone(login_user("georgewashington", "america1776"))
        self.assertIsNone(login_user("some_username", "some_pasword"))
        self.assertIsNone(login_user("john_smith", "anotherpassword12"))
        self.assertIsNone(login_user("georgewashington", "nottherightpasssword"))
        self.assertIsNone(login_user("not a real username", ""))

    def test_create_pokemon_team(self):
        team1 = create_pokemon_team(1, 1, 1, 1, 1, 1, 1)
        team2 = create_pokemon_team(1, 494, 494, 494, 494, 494, 494)
        team3 = create_pokemon_team(2, 4, 3, 676)
        team4 = create_pokemon_team(slot_1=1, slot_2=100, slot_3=1000, slot_4=122, slot_5=123)

        self.assertIsNotNone(team1)
        self.assertIsNotNone(team3)
        self.assertIsNotNone(team4)
        self.assertEqual(team1['User'], 'some_username')
        self.assertEqual(team1['Slot_2']['name'], 'bulbasaur')
        self.assertEqual(team2['stats'][PokemonStats.HP], 100)

    def test_retrieve_teams_from_user(self):
        teams = retrieve_teams_from_user('some_username')

        self.assertEqual(teams[0]['Slot_1']['primary_type'], PokemonTypes.GRASS)
        self.assertEqual(teams[0]['Slot_1']['secondary_type'], PokemonTypes.POISON)

        for team in teams:
            self.assertEqual(team['User'], 'some_username')


if __name__ == '__main__':
    logger.info('Starting tests...\n')
    unittest.main(verbosity=2)
    logger.info('Finished tests...\n')
