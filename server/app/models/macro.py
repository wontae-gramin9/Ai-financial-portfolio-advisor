import uuid

from sqlalchemy import Date, ForeignKey, Numeric, String, UniqueConstraint, Uuid
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class MacroIndex(Base):
    """Global Indices (S&P500, NASDAQ, KOSPI etc.)"""

    __tablename__ = "macro_indices"

    id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True, default=uuid.uuid4)
    name: Mapped[str] = mapped_column(String(100), unique=True)
    symbol: Mapped[str] = mapped_column(String(20), unique=True)  # SPX, IXIC, KOSPI
    description: Mapped[str | None] = mapped_column(String(255), nullable=True)
    start_date: Mapped[Date] = mapped_column(Date)  # 이 날짜부터 값 자동 수집 시작

    values: Mapped[list["MacroIndexValue"]] = relationship(
        back_populates="index", cascade="all, delete-orphan"
    )


class MacroIndexValue(Base):
    """Global Index Time Series Values"""

    __tablename__ = "macro_index_values"

    id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True, default=uuid.uuid4)
    index_id: Mapped[uuid.UUID] = mapped_column(
        Uuid, ForeignKey("macro_indices.id", ondelete="CASCADE")
    )
    recorded_at: Mapped[Date] = mapped_column(Date, nullable=False)
    value: Mapped[Numeric] = mapped_column(Numeric(18, 4))

    __table_args__ = (UniqueConstraint("index_id", "recorded_at"),)

    index: Mapped["MacroIndex"] = relationship(back_populates="values")
