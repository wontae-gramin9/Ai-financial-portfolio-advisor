import uuid

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.recommendation import Recommendation
from app.schemas.recommendation import RecommendationRead

router = APIRouter()


@router.get("/", response_model=list[RecommendationRead])
def get_recommendations(
    snapshot_id: uuid.UUID | None = None,
    db: Session = Depends(get_db),
):
    query = db.query(Recommendation).order_by(Recommendation.created_at.desc())
    if snapshot_id:
        query = query.filter(Recommendation.portfolio_snapshot_id == snapshot_id)
    return query.limit(10).all()
