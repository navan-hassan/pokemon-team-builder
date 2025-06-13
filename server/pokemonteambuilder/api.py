from collections.abc import Iterator
from pydantic import BaseModel


class PokemonTeamSlots(BaseModel):
    id: int | None = None
    slot_1: int | None = -1
    slot_2: int | None = -1
    slot_3: int | None = -1
    slot_4: int | None = -1
    slot_5: int | None = -1
    slot_6: int | None = -1

    def iter_slots(self) -> Iterator[int]:
        slots = frozenset({self.slot_1, self.slot_2, self.slot_3, self.slot_4, self.slot_5, self.slot_6})
        for slot in slots:
            if slot is None:
                continue
            yield slot
            