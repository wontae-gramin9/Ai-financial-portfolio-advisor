import uuid

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.macro import (
    MacroIndexCreate,
    MacroIndexRead,
    MacroIndexValueCreate,
    MacroIndexValueRead,
    MacroIndexWithValues,
)
from app.services import macro as macro_service

router = APIRouter()


@router.get("/", response_model=list[MacroIndexRead])
def get_indices(db: Session = Depends(get_db)):
    return macro_service.get_indices(db)


@router.post("/", response_model=MacroIndexRead, status_code=201)
def create_index(payload: MacroIndexCreate, db: Session = Depends(get_db)):
    return macro_service.create_index(db, payload)


@router.get("/{index_id}/values", response_model=MacroIndexWithValues)
def get_index_values(index_id: uuid.UUID, db: Session = Depends(get_db)):
    return macro_service.get_index_with_values(db, index_id)


@router.post("/{index_id}/values", response_model=MacroIndexValueRead, status_code=201)
def add_index_value(
    index_id: uuid.UUID, payload: MacroIndexValueCreate, db: Session = Depends(get_db)
):
    return macro_service.add_index_value(db, index_id, payload)
