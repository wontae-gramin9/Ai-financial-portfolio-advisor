import uuid

from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.chat import ChatMessage, ChatSession, MessageRole
from app.schemas.chat import ChatRequest, ChatSessionRead

router = APIRouter()


@router.get("/{session_key}", response_model=ChatSessionRead)
def get_session(session_key: str, db: Session = Depends(get_db)):
    session = (
        db.query(ChatSession).filter(ChatSession.session_key == session_key).first()
    )
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    return session


@router.post("/")
def chat(payload: ChatRequest, db: Session = Depends(get_db)):
    # 세션 조회 또는 생성
    if payload.session_key:
        session = (
            db.query(ChatSession)
            .filter(ChatSession.session_key == payload.session_key)
            .first()
        )
        if not session:
            raise HTTPException(status_code=404, detail="Session not found")
    else:
        session = ChatSession(
            session_key=str(uuid.uuid4()),
            portfolio_snapshot_id=payload.portfolio_snapshot_id,
        )
        db.add(session)
        db.flush()

    # 유저 메시지 저장
    db.add(
        ChatMessage(
            session_id=session.id,
            role=MessageRole.USER,
            content=payload.message,
        )
    )
    db.flush()

    # SSE 스트리밍 응답 (LangGraph 에이전트 연결 전 placeholder)
    async def stream():
        # TODO: services/agent.py 연결
        placeholder = f"[AI] '{payload.message}'에 대한 포트폴리오 분석 중..."
        yield f"data: {placeholder}\n\n"

        db.add(
            ChatMessage(
                session_id=session.id,
                role=MessageRole.ASSISTANT,
                content=placeholder,
            )
        )
        db.commit()

    return StreamingResponse(
        stream(),
        media_type="text/event-stream",
        headers={
            "X-Session-Key": session.session_key,
        },
    )
