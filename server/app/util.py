from enum import Enum


class Params(Enum):
    HP = "hp"
    ATTACK = "attack"
    DEFENSE = "defense"
    SPECIAL_ATTACK = "sp_atk"
    SPECIAL_DEFENSE = "sp_def"
    SPEED = "speed"
    BASE_STAT_TOTAL = "bst"
    TYPING = "type"
    ID = 'id'

    def __str__(self):
        return self.value
