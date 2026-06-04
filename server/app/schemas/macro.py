from datetime import date
from decimal import Decimal

from pydantic import BaseModel


class MacroIndexCreate(BaseModel):
    name: str
    symbol: str
    description: str | None = None
    start_date: date


class MacroIndexRead(BaseModel):
    id: int
    name: str
    symbol: str
    description: str | None
    start_date: date

    model_config = {"from_attributes": True}


class MacroIndexValueCreate(BaseModel):
    index_id: int
    recorded_at: date
    value: Decimal


class MacroIndexValueRead(BaseModel):
    id: int
    recorded_at: date
    value: Decimal

    model_config = {"from_attributes": True}


class MacroIndexWithValues(BaseModel):
    id: int
    name: str
    symbol: str
    values: list[MacroIndexValueRead]

    model_config = {"from_attributes": True}
