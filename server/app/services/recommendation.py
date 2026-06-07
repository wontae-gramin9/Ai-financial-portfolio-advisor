import uuid

from sqlalchemy.orm import Session

from app.models.recommendation import Recommendation


def get_recommendations(
    db: Session, snapshot_id: uuid.UUID | None = None
) -> list[Recommendation]:
    query = db.query(Recommendation).order_by(Recommendation.created_at.desc())
    if snapshot_id:
        query = query.filter(Recommendation.portfolio_snapshot_id == snapshot_id)
    return query.limit(10).all()
