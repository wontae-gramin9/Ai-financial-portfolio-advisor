from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.chat import MessageRole
from app.schemas.chat import ChatRequest, ChatSessionRead
from app.services import chat as chat_service

router = APIRouter()


@router.get("/{session_key}", response_model=ChatSessionRead)
def get_session(session_key: str, db: Session = Depends(get_db)):
    return chat_service.get_session(db, session_key)


@router.post("/")
def chat(payload: ChatRequest, db: Session = Depends(get_db)):
    session = chat_service.get_or_create_session(db, payload)
    chat_service.save_message(db, session.id, MessageRole.USER, payload.message)

    async def stream():
        placeholder = f"[AI] '{payload.message}'에 대한 포트폴리오 분석 중..."
        yield f"data: {placeholder}\n\n"
        chat_service.save_message(db, session.id, MessageRole.ASSISTANT, placeholder)
        db.commit()

    return StreamingResponse(
        stream(),
        media_type="text/event-stream",
        headers={"X-Session-Key": session.session_key},
    )
