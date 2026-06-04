from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.macro import MacroIndex, MacroIndexValue
from app.schemas.macro import (
    MacroIndexCreate,
    MacroIndexRead,
    MacroIndexValueCreate,
    MacroIndexValueRead,
    MacroIndexWithValues,
)

router = APIRouter()


@router.get("/", response_model=list[MacroIndexRead])
def get_indices(db: Session = Depends(get_db)):
    return db.query(MacroIndex).all()


@router.post("/", response_model=MacroIndexRead, status_code=201)
def create_index(payload: MacroIndexCreate, db: Session = Depends(get_db)):
    index = MacroIndex(**payload.model_dump())
    db.add(index)
    db.commit()
    db.refresh(index)
    return index


@router.get("/{index_id}/values", response_model=MacroIndexWithValues)
def get_index_values(index_id: int, db: Session = Depends(get_db)):
    index = db.query(MacroIndex).filter(MacroIndex.id == index_id).first()
    if not index:
        raise HTTPException(status_code=404, detail="Index not found")
    return index


@router.post("/{index_id}/values", response_model=MacroIndexValueRead, status_code=201)
def add_index_value(
    index_id: int, payload: MacroIndexValueCreate, db: Session = Depends(get_db)
):
    value = MacroIndexValue(
        index_id=index_id,
        recorded_at=payload.recorded_at,
        value=payload.value,
    )
    db.add(value)
    db.commit()
    db.refresh(value)
    return value
