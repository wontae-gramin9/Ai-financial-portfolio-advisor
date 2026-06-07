import uuid

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.macro import MacroIndex, MacroIndexValue
from app.schemas.macro import MacroIndexCreate, MacroIndexValueCreate


def get_indices(db: Session) -> list[MacroIndex]:
    return db.query(MacroIndex).all()


def create_index(db: Session, payload: MacroIndexCreate) -> MacroIndex:
    index = MacroIndex(**payload.model_dump())
    db.add(index)
    db.commit()
    db.refresh(index)
    return index


def get_index_with_values(db: Session, index_id: uuid.UUID) -> MacroIndex:
    index = db.query(MacroIndex).filter(MacroIndex.id == index_id).first()
    if not index:
        raise HTTPException(status_code=404, detail="Index not found")
    return index


def add_index_value(
    db: Session, index_id: uuid.UUID, payload: MacroIndexValueCreate
) -> MacroIndexValue:
    value = MacroIndexValue(
        index_id=index_id,
        recorded_at=payload.recorded_at,
        value=payload.value,
    )
    db.add(value)
    db.commit()
    db.refresh(value)
    return value
