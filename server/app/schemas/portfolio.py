import uuid
from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel


class AssetCreate(BaseModel):
    name: str
    ticker: str | None = None
    value: Decimal
    currency: str


class AssetRead(AssetCreate):
    id: uuid.UUID

    model_config = {"from_attributes": True}


class AssetGroupCreate(BaseModel):
    country: str
    broker: str
    total_value: Decimal
    currency: str
    assets: list[AssetCreate]


class AssetGroupRead(BaseModel):
    id: uuid.UUID
    country: str
    broker: str
    total_value: Decimal
    currency: str
    assets: list[AssetRead]

    model_config = {"from_attributes": True}


class SnapshotCreate(BaseModel):
    recorded_at: datetime
    total_value: Decimal
    base_currency: str = "USD"
    asset_groups: list[AssetGroupCreate]


class SnapshotRead(BaseModel):
    id: uuid.UUID
    recorded_at: datetime
    total_value: Decimal
    base_currency: str
    asset_groups: list[AssetGroupRead]

    model_config = {"from_attributes": True}


class SnapshotSummary(BaseModel):
    """타임라인용 - 상세 holdings 제외"""

    id: uuid.UUID
    recorded_at: datetime
    total_value: Decimal
    base_currency: str

    model_config = {"from_attributes": True}
