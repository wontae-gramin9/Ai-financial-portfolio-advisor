import uuid
from datetime import datetime
from decimal import Decimal

from sqlalchemy import Date, ForeignKey, Numeric, String, Uuid
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class PortfolioSnapshot(Base):
    __tablename__ = "portfolio_snapshots"

    id: Mapped[uuid.UUID] = mapped_column(
        Uuid, primary_key=True, index=True, default=uuid.uuid4
    )
    recorded_at: Mapped[datetime] = mapped_column(Date, nullable=False, unique=True)
    total_value: Mapped[Decimal] = mapped_column(Numeric(18, 2))
    base_currency: Mapped[str] = mapped_column(String(3), default="USD")

    asset_groups: Mapped[list["AssetGroup"]] = relationship(
        back_populates="snapshot", cascade="all, delete-orphan"
    )


class AssetGroup(Base):
    __tablename__ = "asset_groups"

    id: Mapped[uuid.UUID] = mapped_column(
        Uuid, primary_key=True, index=True, default=uuid.uuid4
    )
    snapshot_id: Mapped[uuid.UUID] = mapped_column(
        Uuid, ForeignKey("portfolio_snapshots.id", ondelete="CASCADE")
    )
    country: Mapped[str] = mapped_column(String(2))  # ISO 3166-1 alpha-2 (US, KR, GB)
    broker: Mapped[str] = mapped_column(String(100))
    total_value: Mapped[Numeric] = mapped_column(Numeric(18, 2))
    currency: Mapped[str] = mapped_column(String(3))

    snapshot: Mapped["PortfolioSnapshot"] = relationship(back_populates="asset_groups")
    assets: Mapped[list["Asset"]] = relationship(
        back_populates="asset_group", cascade="all, delete-orphan"
    )


class Asset(Base):
    __tablename__ = "assets"

    id: Mapped[uuid.UUID] = mapped_column(
        Uuid, primary_key=True, index=True, default=uuid.uuid4
    )
    asset_group_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("asset_groups.id", ondelete="CASCADE")
    )
    name: Mapped[str] = mapped_column(String(200))
    ticker: Mapped[str | None] = mapped_column(String(20), nullable=True)
    value: Mapped[Numeric] = mapped_column(Numeric(18, 2))
    currency: Mapped[str] = mapped_column(String(3))

    asset_group: Mapped["AssetGroup"] = relationship(back_populates="assets")
