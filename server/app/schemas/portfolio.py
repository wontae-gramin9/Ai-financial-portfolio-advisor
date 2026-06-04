from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel


class AssetCreate(BaseModel):
    name: str
    ticker: str | None = None
    value: Decimal
    currency: str


class AssetRead(AssetCreate):
    id: int

    model_config = {"from_attributes": True}


class AssetGroupCreate(BaseModel):
    country: str
    broker: str
    total_value: Decimal
    currency: str
    assets: list[AssetCreate]


class AssetGroupRead(BaseModel):
    id: int
    country: str
    broker: str
    total_value: Decimal
    currency: str
    assets: list[AssetRead]

    model_config = {"from_attributes": True}


class SnapshotCreate(BaseModel):
    recorded_at: datetime  # 월의 첫째 날 (예: 2024-01-01 = 2024년 1월)
    total_value: Decimal
    base_currency: str = "USD"
    asset_groups: list[AssetGroupCreate]


class SnapshotRead(BaseModel):
    id: int
    recorded_at: datetime
    total_value: Decimal
    base_currency: str
    asset_groups: list[AssetGroupRead]

    model_config = {"from_attributes": True}


class SnapshotSummary(BaseModel):
    """타임라인용 - 상세 holdings 제외"""

    id: int
    recorded_at: datetime
    total_value: Decimal
    base_currency: str

    model_config = {"from_attributes": True}
