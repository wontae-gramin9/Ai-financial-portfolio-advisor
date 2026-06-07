import uuid

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.recommendation import RecommendationRead
from app.services import recommendation as recommendation_service

router = APIRouter()


@router.get("/", response_model=list[RecommendationRead])
def get_recommendations(
    snapshot_id: uuid.UUID | None = None,
    db: Session = Depends(get_db),
):
    return recommendation_service.get_recommendations(db, snapshot_id)
