from fastapi import APIRouter

from app.api.v1.endpoints import chat, macro, portfolio, recommendations

api_router = APIRouter()

api_router.include_router(portfolio.router, prefix="/snapshots", tags=["portfolio"])
api_router.include_router(macro.router, prefix="/macro", tags=["macro"])
api_router.include_router(chat.router, prefix="/chat", tags=["chat"])
api_router.include_router(
    recommendations.router, prefix="/recommendations", tags=["recommendations"]
)
