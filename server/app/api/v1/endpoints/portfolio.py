import uuid

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.portfolio import Asset, AssetGroup, PortfolioSnapshot
from app.schemas.portfolio import SnapshotCreate, SnapshotRead, SnapshotSummary

router = APIRouter()


@router.get("/", response_model=list[SnapshotSummary])
def get_snapshots(db: Session = Depends(get_db)):
    return db.query(PortfolioSnapshot).order_by(PortfolioSnapshot.recorded_at).all()


@router.get("/{snapshot_id}", response_model=SnapshotRead)
def get_snapshot(snapshot_id: uuid.UUID, db: Session = Depends(get_db)):
    snapshot = (
        db.query(PortfolioSnapshot).filter(PortfolioSnapshot.id == snapshot_id).first()
    )
    if not snapshot:
        raise HTTPException(status_code=404, detail="Snapshot not found")
    return snapshot


@router.post("/", response_model=SnapshotRead, status_code=201)
def create_snapshot(payload: SnapshotCreate, db: Session = Depends(get_db)):
    snapshot = PortfolioSnapshot(
        recorded_at=payload.recorded_at,
        total_value=payload.total_value,
        base_currency=payload.base_currency,
    )
    db.add(snapshot)
    db.flush()

    for group_data in payload.asset_groups:
        group = AssetGroup(
            snapshot_id=snapshot.id,
            country=group_data.country,
            broker=group_data.broker,
            total_value=group_data.total_value,
            currency=group_data.currency,
        )
        db.add(group)
        db.flush()

        for holding_data in group_data.assets:
            db.add(
                Asset(
                    asset_group_id=group.id,
                    name=holding_data.name,
                    ticker=holding_data.ticker,
                    value=holding_data.value,
                    currency=holding_data.currency,
                )
            )

    db.commit()
    db.refresh(snapshot)
    return snapshot


@router.put("/{snapshot_id}", response_model=SnapshotRead)
def update_snapshot(
    snapshot_id: uuid.UUID, payload: SnapshotCreate, db: Session = Depends(get_db)
):
    snapshot = (
        db.query(PortfolioSnapshot).filter(PortfolioSnapshot.id == snapshot_id).first()
    )
    if not snapshot:
        raise HTTPException(status_code=404, detail="Snapshot not found")

    for group in snapshot.asset_groups:
        db.delete(group)
    db.flush()

    snapshot.recorded_at = payload.recorded_at
    snapshot.total_value = payload.total_value
    snapshot.base_currency = payload.base_currency

    for group_data in payload.asset_groups:
        group = AssetGroup(
            snapshot_id=snapshot.id,
            country=group_data.country,
            broker=group_data.broker,
            total_value=group_data.total_value,
            currency=group_data.currency,
        )
        db.add(group)
        db.flush()

        for holding_data in group_data.assets:
            db.add(
                Asset(
                    asset_group_id=group.id,
                    name=holding_data.name,
                    ticker=holding_data.ticker,
                    value=holding_data.value,
                    currency=holding_data.currency,
                )
            )

    db.commit()
    db.refresh(snapshot)
    return snapshot


@router.delete("/{snapshot_id}", status_code=204)
def delete_snapshot(snapshot_id: uuid.UUID, db: Session = Depends(get_db)):
    snapshot = (
        db.query(PortfolioSnapshot).filter(PortfolioSnapshot.id == snapshot_id).first()
    )
    if not snapshot:
        raise HTTPException(status_code=404, detail="Snapshot not found")
    db.delete(snapshot)
    db.commit()
