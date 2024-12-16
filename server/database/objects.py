from typing import Optional
from sqlalchemy import ForeignKey
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship

class Base(DeclarativeBase):
    pass

class Pokemon(Base):
    __tablename__ = "pokemon"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column()
    sprite: Mapped[Optional[str]] = mapped_column()
    primary_type: Mapped[str] = mapped_column()
    secondary_type: Mapped[Optional[str]] = mapped_column()
    ability1: Mapped[str] = mapped_column()
    ability2: Mapped[Optional[str]] = mapped_column()
    hidden_ability: Mapped[Optional[str]] = mapped_column()
    stats: Mapped["Stats"] = relationship(back_populates="pokemon", cascade="all, delete-orphan")
    resistances: Mapped["Resistances"] = relationship(back_populates="pokemon", cascade="all, delete-orphan")
    def __repr__(self) -> str:
        return f'''Pokemon(
        id={self.id!r},
        name={self.name!r},
        sprite={self.sprite!r},
        primary_type={self.primary_type!r},
        secondary_type={self.secondary_type!r},
        ability1={self.ability1!r},
        ability2={self.ability2!r},
        hidden_ability={self.hidden_ability!r},
        stats={self.stats!r},
        resistances={self.resistances!r}
    )'''

class Resistances(Base):
    __tablename__ = "resistances"
    id: Mapped[int] = mapped_column(primary_key=True)
    pokemon_id: Mapped[int] = mapped_column(ForeignKey("pokemon.id"))
    pokemon: Mapped["Pokemon"] = relationship(back_populates="resistances")
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
            normal={self.normal!r},
            fire={self.fire!r},
            water={self.water!r},
            grass={self.grass!r},
            flying={self.flying!r},
            fighting={self.fighting!r},
            poison={self.poison!r},
            electric={self.electric!r},
            ground={self.ground!r},
            rock={self.rock!r},
            psychic={self.psychic!r},
            ice={self.ice!r},
            bug={self.bug!r},
            ghost={self.ghost!r},
            steel={self.steel!r},
            dragon={self.dragon!r},
            dark={self.dark!r},
            fairy={self.fairy!r}
        )'''

class Stats(Base):
    __tablename__ = "stats"
    id: Mapped[int] = mapped_column(primary_key=True)
    pokemon_id: Mapped[int] = mapped_column(ForeignKey("pokemon.id"))
    pokemon: Mapped["Pokemon"] = relationship(back_populates="stats")
    hp: Mapped[int] = mapped_column()
    attack: Mapped[int] = mapped_column()
    defense: Mapped[int] = mapped_column()
    sp_atk: Mapped[int] = mapped_column()
    sp_def: Mapped[int] = mapped_column()
    speed: Mapped[int] = mapped_column()
    base_stat_total: Mapped[int] = mapped_column()
    def __repr__(self) -> str:
        return f'''(
            hp={self.hp!r},
            attack={self.attack!r},
            defense={self.defense!r},
            special_attack={self.sp_atk!r},
            special_defense={self.sp_def!r},
            speed={self.speed!r},
            base_stat_total={self.base_stat_total!r},
        )'''