import uuid

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.chat import ChatMessage, ChatSession, MessageRole
from app.schemas.chat import ChatRequest


def get_session(db: Session, session_key: str) -> ChatSession:
    session = (
        db.query(ChatSession).filter(ChatSession.session_key == session_key).first()
    )
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    return session


def get_or_create_session(db: Session, payload: ChatRequest) -> ChatSession:
    if payload.session_key:
        return get_session(db, payload.session_key)

    session = ChatSession(
        session_key=str(uuid.uuid4()),
        portfolio_snapshot_id=payload.portfolio_snapshot_id,
    )
    db.add(session)
    db.flush()
    return session


def save_message(
    db: Session, session_id: uuid.UUID, role: MessageRole, content: str
) -> None:
    db.add(ChatMessage(session_id=session_id, role=role, content=content))
    db.flush()
