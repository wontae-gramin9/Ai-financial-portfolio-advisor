import enum
import uuid

from sqlalchemy import (
    Date,
    DateTime,
    Enum,
    ForeignKey,
    Numeric,
    String,
    Text,
    Uuid,
)
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.sql import func

from app.core.database import Base


class ActionType(str, enum.Enum):
    BUY = "buy"  # 매수
    REDUCE = "reduce"  # 축소
    HOLD = "hold"  # 관망


class Recommendation(Base):
    __tablename__ = "recommendations"

    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, index=True)
    portfolio_snapshot_id: Mapped[uuid.UUID | None] = mapped_column(
        Uuid, ForeignKey("portfolio_snapshots.id"), nullable=True, default=uuid.uuid4
    )
    action: Mapped[ActionType] = mapped_column(Enum(ActionType))
    sector: Mapped[str] = mapped_column(String(100))  # str로 유지 - AI가 동적 추가 가능
    target_name: Mapped[str | None] = mapped_column(
        String(200), nullable=True
    )  # 특정 종목/ETF
    recommended_month: Mapped[Date] = mapped_column(Date)
    reason: Mapped[str] = mapped_column(Text)
    confidence_score: Mapped[Numeric | None] = mapped_column(
        Numeric(3, 2),
        nullable=True,  # 0.00 ~ 1.00
    )
    source_documents: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,  # RAG 출처 JSON string
    )
    created_at: Mapped[DateTime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )
