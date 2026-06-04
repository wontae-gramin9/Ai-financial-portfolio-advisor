from datetime import datetime

from pydantic import BaseModel

from app.models.chat import MessageRole


class ChatRequest(BaseModel):
    message: str
    session_key: str | None = None  # None이면 새 세션 생성
    portfolio_snapshot_id: int | None = None


class ChatMessageRead(BaseModel):
    id: int
    role: MessageRole
    content: str
    created_at: datetime

    model_config = {"from_attributes": True}


class ChatSessionRead(BaseModel):
    id: int
    session_key: str
    messages: list[ChatMessageRead]

    model_config = {"from_attributes": True}
