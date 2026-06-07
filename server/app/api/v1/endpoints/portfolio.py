import uuid

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.portfolio import SnapshotCreate, SnapshotRead, SnapshotSummary
from app.services import portfolio as portfolio_service

router = APIRouter()


@router.get("/", response_model=list[SnapshotSummary])
def get_snapshots(db: Session = Depends(get_db)):
    return portfolio_service.get_snapshots(db)


@router.get("/{snapshot_id}", response_model=SnapshotRead)
def get_snapshot(snapshot_id: uuid.UUID, db: Session = Depends(get_db)):
    return portfolio_service.get_snapshot(db, snapshot_id)


@router.post("/", response_model=SnapshotRead, status_code=201)
def create_snapshot(payload: SnapshotCreate, db: Session = Depends(get_db)):
    return portfolio_service.create_snapshot(db, payload)


@router.put("/{snapshot_id}", response_model=SnapshotRead)
def update_snapshot(
    snapshot_id: uuid.UUID, payload: SnapshotCreate, db: Session = Depends(get_db)
):
    return portfolio_service.update_snapshot(db, snapshot_id, payload)


@router.delete("/{snapshot_id}", status_code=204)
def delete_snapshot(snapshot_id: uuid.UUID, db: Session = Depends(get_db)):
    portfolio_service.delete_snapshot(db, snapshot_id)
