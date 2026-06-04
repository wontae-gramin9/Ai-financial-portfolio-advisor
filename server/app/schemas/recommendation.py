from datetime import date, datetime
from decimal import Decimal

from pydantic import BaseModel

from app.models.recommendation import ActionType


class RecommendationRead(BaseModel):
    id: int
    action: ActionType
    sector: str
    target_name: str | None
    recommended_month: date
    reason: str
    confidence_score: Decimal | None
    created_at: datetime

    model_config = {"from_attributes": True}
