from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel


class MacroIndexCreate(BaseModel):
    name: str
    symbol: str
    description: str | None = None
    start_date: datetime


class MacroIndexRead(BaseModel):
    id: int
    name: str
    symbol: str
    description: str | None
    start_date: datetime

    model_config = {"from_attributes": True}


class MacroIndexValueCreate(BaseModel):
    index_id: int
    recorded_at: datetime
    value: Decimal


class MacroIndexValueRead(BaseModel):
    id: int
    recorded_at: datetime
    value: Decimal

    model_config = {"from_attributes": True}


class MacroIndexWithValues(BaseModel):
    id: int
    name: str
    symbol: str
    values: list[MacroIndexValueRead]

    model_config = {"from_attributes": True}
