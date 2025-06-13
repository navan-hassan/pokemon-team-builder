from statistics import fmean
from collections.abc import Iterator
from sqlalchemy import ForeignKey
from sqlalchemy.orm import DeclarativeBase, selectinload
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship
from sqlalchemy.ext.asyncio import AsyncAttrs
from pokemonteambuilder.util import PokemonStats, PokemonTypes, Params, StrValues, Tablenames
from pokemonteambuilder.api import PokemonTeamSlots
from typing import NamedTuple

class PokemonTeamBuilderData(AsyncAttrs, DeclarativeBase):
    pass

class Pokemon(PokemonTeamBuilderData):
    __tablename__ = Tablenames.POKEMON
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column()
    sprite: Mapped[str | None] = mapped_column()
    primary_type: Mapped[str] = mapped_column()
    secondary_type: Mapped[str | None] = mapped_column()
    ability1: Mapped[str] = mapped_column()
    ability2: Mapped[str | None] = mapped_column()
    hidden_ability: Mapped[str | None] = mapped_column()
    stats: Mapped["Stats"] = relationship(back_populates=Tablenames.POKEMON)
    resistances: Mapped["Resistances"] = relationship(back_populates=Tablenames.POKEMON, cascade="all, delete-orphan")

    def __repr__(self) -> str:
        return f'''Pokemon(
        {StrValues.ID}={self.id!r},
        {StrValues.NAME}={self.name!r},
        {StrValues.SPRITE}={self.sprite!r},
        {StrValues.PRIMARY_TYPE}={self.primary_type!r},
        {StrValues.SECONDARY_TYPE}={self.secondary_type!r},
        {StrValues.ABILITY_1}={self.ability1!r},
        {StrValues.ABILITY_2}={self.ability2!r},
        {StrValues.HIDDEN_ABILITY}={self.hidden_ability!r},
        {StrValues.STATS}={self.stats!r},
        {StrValues.RESISTANCES}={self.resistances!r}
    )'''

    def as_dict(self, *, recursive: bool=False):
        return {
            StrValues.ID: self.id,
            StrValues.NAME: self.name,
            StrValues.PRIMARY_TYPE: self.primary_type,
            StrValues.SECONDARY_TYPE: self.secondary_type
            if self.secondary_type is not None else StrValues.NONE,
            StrValues.SPRITE: self.sprite
            if self.sprite is not None else StrValues.NONE
        } if not recursive else {
            StrValues.ID: self.id,
            StrValues.NAME: self.name,
            StrValues.PRIMARY_TYPE: self.primary_type,
            StrValues.SECONDARY_TYPE: self.secondary_type if self.secondary_type is not None else StrValues.NONE,
            StrValues.SPRITE: self.sprite if self.sprite is not None else StrValues.NONE,
            StrValues.STATS: self.stats.as_dict(),
            StrValues.RESISTANCES: self.resistances.as_dict()
        }
    
    def serialize(self):
        pass

    @staticmethod
    def select_loadable_attributes():
        yield from (selectinload(Pokemon.resistances), selectinload(Pokemon.stats))



class Resistances(PokemonTeamBuilderData):
    __tablename__ = Tablenames.RESISTANCES
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    pokemon_id: Mapped[int] = mapped_column(ForeignKey("pokemon.id"))
    pokemon: Mapped["Pokemon"] = relationship(back_populates=Tablenames.RESISTANCES)
    normal: Mapped[float] = mapped_column()
    fire: Mapped[float] = mapped_column()
    water: Mapped[float] = mapped_column()
    grass: Mapped[float] = mapped_column()
    flying: Mapped[float] = mapped_column()
    fighting: Mapped[float] = mapped_column()
    poison: Mapped[float] = mapped_column()
    electric: Mapped[float] = mapped_column()
    ground: Mapped[float] = mapped_column()
    rock: Mapped[float] = mapped_column()
    psychic: Mapped[float] = mapped_column()
    ice: Mapped[float] = mapped_column()
    bug: Mapped[float] = mapped_column()
    ghost: Mapped[float] = mapped_column()
    steel: Mapped[float] = mapped_column()
    dragon: Mapped[float] = mapped_column()
    dark: Mapped[float] = mapped_column()
    fairy: Mapped[float] = mapped_column()

    def __repr__(self) -> str:
        return f'''(
            {PokemonTypes.NORMAL}={self.normal!r},
            {PokemonTypes.FIRE}={self.fire!r},
            {PokemonTypes.WATER}={self.water!r},
            {PokemonTypes.GRASS}={self.grass!r},
            {PokemonTypes.FLYING}={self.flying!r},
            {PokemonTypes.FIGHTING}={self.fighting!r},
            {PokemonTypes.POISON}={self.poison!r},
            {PokemonTypes.ELECTRIC}={self.electric!r},
            {PokemonTypes.GROUND}={self.ground!r},
            {PokemonTypes.ROCK}={self.rock!r},
            {PokemonTypes.PSYCHIC}={self.psychic!r},
            {PokemonTypes.ICE}={self.ice!r},
            {PokemonTypes.BUG}={self.bug!r},
            {PokemonTypes.GHOST}={self.ghost!r},
            {PokemonTypes.STEEL}={self.steel!r},
            {PokemonTypes.DRAGON}={self.dragon!r},
            {PokemonTypes.DARK}={self.dark!r},
            {PokemonTypes.FAIRY}={self.fairy!r}
        )'''

    def as_dict(self) -> dict[str, float]:
        return {
            PokemonTypes.NORMAL: self.normal,
            PokemonTypes.FIRE: self.fire,
            PokemonTypes.WATER: self.water,
            PokemonTypes.GRASS: self.grass,
            PokemonTypes.FLYING: self.flying,
            PokemonTypes.FIGHTING: self.fighting,
            PokemonTypes.POISON: self.poison,
            PokemonTypes.ELECTRIC: self.electric,
            PokemonTypes.GROUND: self.ground,
            PokemonTypes.ROCK: self.rock,
            PokemonTypes.PSYCHIC: self.psychic,
            PokemonTypes.ICE: self.ice,
            PokemonTypes.BUG: self.bug,
            PokemonTypes.GHOST: self.ghost,
            PokemonTypes.STEEL: self.steel,
            PokemonTypes.DRAGON: self.dragon,
            PokemonTypes.DARK: self.dark,
            PokemonTypes.FAIRY: self.fairy
        }



class Stats(PokemonTeamBuilderData):
    __tablename__ = Tablenames.STATS
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    pokemon_id: Mapped[int | None] = mapped_column(ForeignKey("pokemon.id"))
    pokemon: Mapped["Pokemon"] = relationship(back_populates=Tablenames.STATS)
    hp: Mapped[int] = mapped_column()
    attack: Mapped[int] = mapped_column()
    defense: Mapped[int] = mapped_column()
    special_attack: Mapped[int] = mapped_column()
    special_defense: Mapped[int] = mapped_column()
    speed: Mapped[int] = mapped_column()
    base_stat_total: Mapped[int] = mapped_column()

    def __repr__(self) -> str:
        return f'''(
            {PokemonStats.HP}={self.hp!r},
            {PokemonStats.ATTACK}={self.attack!r},
            {PokemonStats.DEFENSE}={self.defense!r},
            {PokemonStats.SPECIAL_ATTACK}={self.special_attack!r},
            {PokemonStats.SPECIAL_DEFENSE}={self.special_defense!r},
            {PokemonStats.SPEED}={self.speed!r},
            {PokemonStats.BASE_STAT_TOTAL}={self.base_stat_total!r},
        )'''

    def as_dict(self) -> dict[str, int]:
        return {
            PokemonStats.HP: self.hp,
            PokemonStats.ATTACK: self.attack,
            PokemonStats.DEFENSE: self.defense,
            PokemonStats.SPECIAL_ATTACK: self.special_attack,
            PokemonStats.SPECIAL_DEFENSE: self.special_defense,
            PokemonStats.SPEED: self.speed,
            PokemonStats.BASE_STAT_TOTAL: self.base_stat_total
        }
    
    @staticmethod
    def get_attribute(value: PokemonStats):
        string_mappings = {
            PokemonStats.HP: Stats.hp,
            PokemonStats.ATTACK: Stats.attack,
            PokemonStats.DEFENSE: Stats.defense,
            PokemonStats.SPECIAL_ATTACK: Stats.special_attack,
            PokemonStats.SPECIAL_DEFENSE: Stats.special_defense,
            PokemonStats.SPEED: Stats.speed,
            PokemonStats.BASE_STAT_TOTAL: Stats.base_stat_total
        }
        return string_mappings[value]
    
    @staticmethod
    def select_loadable_attributes():
        yield from (selectinload(Stats.pokemon).selectinload(Pokemon.resistances),
                selectinload(Stats.pokemon).selectinload(Pokemon.stats))
        
    @classmethod
    def create_empty(cls):
        return cls(
            hp=0,
            attack=0,
            defense=0,
            special_attack=0,
            special_defense=0,
            speed=0,
            base_stat_total=0
            )

class User(PokemonTeamBuilderData):
    __tablename__ = Tablenames.USERS
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    username: Mapped[str] = mapped_column()
    password: Mapped[str] = mapped_column()
    teams: Mapped[list["PokemonTeam"]] = relationship(back_populates="user",
                                                      cascade="all, delete-orphan")

    def as_dict(self) -> dict[str , str | int]:
        return {
            Params.USERNAME: self.username,
            Params.ID: self.id
        }

EMPTY_SLOT = {
    StrValues.ID: -1,
    StrValues.NAME: StrValues.NONE,
    StrValues.PRIMARY_TYPE: StrValues.NONE,
    StrValues.SECONDARY_TYPE: StrValues.NONE,
    StrValues.STATS: {
        PokemonStats.HP: 0,
        PokemonStats.ATTACK: 0,
        PokemonStats.DEFENSE: 0,
        PokemonStats.SPECIAL_ATTACK: 0,
        PokemonStats.SPECIAL_DEFENSE: 0,
        PokemonStats.SPEED: 0,
        PokemonStats.BASE_STAT_TOTAL: 0
    },
    StrValues.RESISTANCES: None
}

EMPTY_STATS = {
    PokemonStats.HP: 0,
    PokemonStats.ATTACK: 0,
    PokemonStats.DEFENSE: 0,
    PokemonStats.SPECIAL_ATTACK: 0,
    PokemonStats.SPECIAL_DEFENSE: 0,
    PokemonStats.SPEED: 0,
    PokemonStats.BASE_STAT_TOTAL: 0
}

class PokemonTeam(PokemonTeamBuilderData):
    __tablename__ = Tablenames.TEAMS
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    slot_1: Mapped[int | None] = mapped_column(ForeignKey("pokemon.id"))
    pokemon_1: Mapped[Pokemon | None] = relationship(foreign_keys=[slot_1])
    slot_2: Mapped[int | None] = mapped_column(ForeignKey("pokemon.id"))
    pokemon_2: Mapped[Pokemon | None] = relationship(foreign_keys=[slot_2])
    slot_3: Mapped[int | None] = mapped_column(ForeignKey("pokemon.id"))
    pokemon_3: Mapped[Pokemon | None] = relationship(foreign_keys=[slot_3])
    slot_4: Mapped[int | None] = mapped_column(ForeignKey("pokemon.id"))
    pokemon_4: Mapped[Pokemon | None] = relationship(foreign_keys=[slot_4])
    slot_5: Mapped[int | None] = mapped_column(ForeignKey("pokemon.id"))
    pokemon_5: Mapped[Pokemon | None] = relationship(foreign_keys=[slot_5])
    slot_6: Mapped[int | None] = mapped_column(ForeignKey("pokemon.id"))
    pokemon_6: Mapped[Pokemon | None] = relationship(foreign_keys=[slot_6])
    avg_stats_id: Mapped[int | None] = mapped_column(ForeignKey("stats.id"))
    avg_stats: Mapped["Stats"] = relationship(foreign_keys=[avg_stats_id])
    user_id: Mapped[int | None] = mapped_column((ForeignKey("users.id")))
    user: Mapped[User | None] = relationship(foreign_keys=[user_id], back_populates=Tablenames.TEAMS)

    @staticmethod
    def select_loadable_attributes():
        slots = frozenset({
            PokemonTeam.pokemon_1, 
            PokemonTeam.pokemon_2, 
            PokemonTeam.pokemon_3, 
            PokemonTeam.pokemon_4, 
            PokemonTeam.pokemon_5, 
            PokemonTeam.pokemon_6
            })
        yield from (
            *(selectinload(p).selectinload(Pokemon.stats) for p in slots),
            *(selectinload(p).selectinload(Pokemon.resistances) for p in slots),
            selectinload(PokemonTeam.avg_stats),
            selectinload(PokemonTeam.user)
        )

    @classmethod
    def create(cls, slots: PokemonTeamSlots, *, user_id = None):

        return cls(
                user_id=user_id,
                slot_1=slots.slot_1,
                slot_2=slots.slot_2,
                slot_3=slots.slot_3,
                slot_4=slots.slot_4,
                slot_5=slots.slot_5,
                slot_6=slots.slot_6
            )

    def __repr__(self) -> str:
        return f'''PokemonTeam(
        {StrValues.ID}={self.id!r},
        {StrValues.USER}={self.user.username if self.user is not None else StrValues.NONE!r},
        {StrValues.SLOT_1}={self.pokemon_1.name if self.pokemon_1 is not None else StrValues.NONE!r},
        {StrValues.SLOT_2}={self.pokemon_2.name if self.pokemon_2 is not None else StrValues.NONE!r},
        {StrValues.SLOT_3}={self.pokemon_3.name if self.pokemon_3 is not None else StrValues.NONE!r},
        {StrValues.SLOT_4}={self.pokemon_4.name if self.pokemon_4 is not None else StrValues.NONE!r},
        {StrValues.SLOT_5}={self.pokemon_5.name if self.pokemon_5 is not None else StrValues.NONE!r},
        {StrValues.SLOT_6}={self.pokemon_6.name if self.pokemon_6 is not None else StrValues.NONE!r},
        {StrValues.AVG_STATS}={self.avg_stats if self.avg_stats is not None else StrValues.NONE!r},
    )'''

    def as_dict(self):
        return {
            StrValues.ID: self.id,
            StrValues.USER: self.user.username if self.user is not None else None,
            StrValues.SLOT_1: self.pokemon_1.as_dict(recursive=True) if self.pokemon_1 is not None else EMPTY_SLOT,
            StrValues.SLOT_2: self.pokemon_2.as_dict(recursive=True) if self.pokemon_2 is not None else EMPTY_SLOT,
            StrValues.SLOT_3: self.pokemon_3.as_dict(recursive=True) if self.pokemon_3 is not None else EMPTY_SLOT,
            StrValues.SLOT_4: self.pokemon_4.as_dict(recursive=True) if self.pokemon_4 is not None else EMPTY_SLOT,
            StrValues.SLOT_5: self.pokemon_5.as_dict(recursive=True) if self.pokemon_5 is not None else EMPTY_SLOT,
            StrValues.SLOT_6: self.pokemon_6.as_dict(recursive=True) if self.pokemon_6 is not None else EMPTY_SLOT,
            StrValues.AVG_STATS: self.avg_stats.as_dict() if self.avg_stats is not None else EMPTY_STATS
        }

    def count(self) -> int:
        num_pokemon = 0

        for slot in self.active_slots():
            num_pokemon += 1

        return num_pokemon

    def active_slots(self) -> Iterator[int]:
        for slot in (self.slot_1, self.slot_2, self.slot_3, self.slot_4, self.slot_5, self.slot_6):
            if slot is None:
                continue
            yield slot

    def get_pokemon(self):
        for slot in (self.pokemon_1, self.pokemon_2, self.pokemon_3, self.pokemon_4, self.pokemon_5, self.pokemon_6):
            if slot is None:
                continue
            yield slot

    def update_slots(self, *, new_slots: PokemonTeamSlots):
        self.slot_1 = new_slots.slot_1
        self.slot_2 = new_slots.slot_2
        self.slot_3 = new_slots.slot_3
        self.slot_4 = new_slots.slot_4
        self.slot_5 = new_slots.slot_5
        self.slot_6 = new_slots.slot_6
        self.calculate_average_stats()

    def calculate_average_stats(self):
        print(str(self))
        
        aggregate_hp = {p.stats.hp for p in self.get_pokemon() if p.id > -1}
        aggregate_attack = {p.stats.attack for p in self.get_pokemon() if p.id > -1}
        aggregate_defense = {p.stats.defense for p in self.get_pokemon() if p.id > -1}
        aggregate_sp_attack = {p.stats.special_attack for p in self.get_pokemon() if p.id > -1}
        aggregate_sp_defense = {p.stats.special_defense for p in self.get_pokemon() if p.id > -1}
        aggregate_speed = {p.stats.speed for p in self.get_pokemon() if p.id > -1}
        aggregate_bst = {p.stats.base_stat_total for p in self.get_pokemon() if p.id > -1}
        self.avg_stats.hp = round(fmean(aggregate_hp))
        self.avg_stats.attack = round(fmean(aggregate_attack))
        self.avg_stats.defense = round(fmean(aggregate_defense))
        self.avg_stats.special_attack = round(fmean(aggregate_sp_attack))
        self.avg_stats.special_defense = round(fmean(aggregate_sp_defense))
        self.avg_stats.speed = round(fmean(aggregate_speed))
        self.avg_stats.base_stat_total = round(fmean(aggregate_bst))



