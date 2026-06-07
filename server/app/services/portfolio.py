import uuid

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.portfolio import Asset, AssetGroup, PortfolioSnapshot
from app.schemas.portfolio import SnapshotCreate


def get_snapshots(db: Session) -> list[PortfolioSnapshot]:
    return (
        db.query(PortfolioSnapshot).order_by(PortfolioSnapshot.recorded_at.desc()).all()
    )


def get_snapshot(db: Session, snapshot_id: uuid.UUID) -> PortfolioSnapshot:
    snapshot = (
        db.query(PortfolioSnapshot).filter(PortfolioSnapshot.id == snapshot_id).first()
    )
    if not snapshot:
        raise HTTPException(status_code=404, detail="Snapshot not found")
    return snapshot


def create_snapshot(db: Session, payload: SnapshotCreate) -> PortfolioSnapshot:
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


def update_snapshot(
    db: Session, snapshot_id: uuid.UUID, payload: SnapshotCreate
) -> PortfolioSnapshot:
    snapshot = get_snapshot(db, snapshot_id)

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


def delete_snapshot(db: Session, snapshot_id: uuid.UUID) -> None:
    snapshot = get_snapshot(db, snapshot_id)
    db.delete(snapshot)
    db.commit()
