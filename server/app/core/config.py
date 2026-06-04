from typing import List

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    PROJECT_NAME: str = "AI Financial Portfolio Advisor"
    ALLOWED_ORIGINS: List[str] = ["http://localhost:3000"]

    DATABASE_URL: str

    # AZURE_OPENAI_API_KEY: str
    # AZURE_OPENAI_ENDPOINT: str
    # AZURE_OPENAI_DEPLOYMENT_NAME: str
    # AZURE_OPENAI_API_VERSION: str = "2024-02-01"

    CHROMA_PERSIST_DIR: str = "./chroma_db"

    model_config = {"env_file": ".env"}


settings = Settings()  # pyright: ignore[reportCallIssue]
# Pydantic cannot infer that in runtime, the settings variable will have a DATABASE_URL
