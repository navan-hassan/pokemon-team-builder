from collections.abc import Iterator
from pydantic import BaseModel


class CreateTeamRequest(BaseModel):
    id: int | None = None
    slot_1: int = -1
    slot_2: int = -1
    slot_3: int = -1
    slot_4: int = -1
    slot_5: int = -1
    slot_6: int = -1

class PokemonTeamSlots(BaseModel):
    id: int | None = None
    slot_1: int | None = None
    slot_2: int | None = None
    slot_3: int | None = None
    slot_4: int | None = None
    slot_5: int | None = None
    slot_6: int | None = None

    def active(self) -> Iterator[int]:
        for slot in (self.slot_1, self.slot_2, self.slot_3, self.slot_4, self.slot_5, self.slot_6):
            if slot is None:
                continue
            yield slot