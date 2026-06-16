# AI Financial Portfolio Advisor

Monorepo: Next.js 14 client + FastAPI server. GitHub: `wontae-gramin9/Ai-financial-portfolio-advisor`.

## Structure

```
ai-financial-portfolio-advisor/
├── client/          # Next.js 14 (App Router), TypeScript
└── server/          # FastAPI, Python 3.11+, PostgreSQL
```

## Dev Setup

**Client** (port 3000):
```bash
cd client
npm install
npm run dev
```

**Server** (port 8000):
```bash
cd server
# Activate venv if needed
pip install -r requirements.txt
uvicorn app.main:app --reload
```

**Environment**:
- Copy `server/.env.example` → `server/.env` and fill `DATABASE_URL`
- Test DB configured in `server/.env.test`
- ENV var selects which `.env.*` file: development (default) | test

## Key Commands

| Task | Command |
|------|---------|
| Client dev | `npm --prefix client run dev` |
| Client lint | `npm --prefix client run lint` |
| Client format | `npm --prefix client run format` |
| Server lint | `cd server && ruff check --fix .` |
| Server format | `cd server && ruff format .` |
| Run tests | `cd server && pytest` |
| DB migration | `cd server && alembic upgrade head` |
| New migration | `cd server && alembic revision --autogenerate -m "description"` |

Pre-commit (husky + lint-staged) runs automatically on commit: Prettier+ESLint for client, ruff for server.

## Client Stack

- **Next.js 14** App Router, TypeScript
- **Apollo Client** (`@apollo/client` + `@apollo/experimental-nextjs-app-support`) for GraphQL
- **NextAuth v4** for authentication (`src/lib/authjs.ts`, `src/actions/authjs.ts`)
- **Tailwind CSS 3** with Prettier plugin
- **Zod** for schema validation
- **NicePay** Korean payment gateway (`src/lib/nicepay.ts`)
- ESLint: airbnb + airbnb-typescript config

## Server Stack

- **FastAPI** with versioned router at `/api/v1`
- **SQLAlchemy 2.0** (sync sessions) + **psycopg2** for PostgreSQL
- **Pydantic v2** + pydantic-settings for config
- **Alembic** for schema migrations
- **Ruff** (line-length 88, Python 3.11 target, E/F/I rules)
- **pytest** with real PostgreSQL DB (no mocks — uses TestClient + actual DB session)

## API Routes

```
GET  /health
GET  /health/db
GET  /api/v1/snapshots/
POST /api/v1/snapshots/
GET  /api/v1/snapshots/{id}
PUT  /api/v1/snapshots/{id}
DEL  /api/v1/snapshots/{id}
     /api/v1/macro/
     /api/v1/chat/
     /api/v1/recommendations/
```

## DB Schema

All primary keys are **UUID** (migrated from Int in Alembic revision `33e738e4abe6`).

```
PortfolioSnapshot
  └── AssetGroup (country: ISO 3166-1 alpha-2, broker, currency)
        └── Asset (name, ticker?, value, currency)

ChatSession (session_key unique)
  └── ChatMessage (role: USER|ASSISTANT)

MacroIndex (name, symbol unique)
  └── MacroIndexValue (recorded_at, value — unique per index+date)

Recommendation (action: BUY|REDUCE|HOLD, sector, confidence_score)
```

All child tables use `CASCADE` on delete.

## AI Integration (Planned / Stubbed)

Config has commented-out Azure OpenAI keys and `CHROMA_PERSIST_DIR` for ChromaDB vector store. Not yet wired into endpoints.

## Testing

Tests use a real PostgreSQL test DB — **no mocks**. The `conftest.py` creates tables, yields a session with rollback on teardown, and overrides FastAPI's `get_db` dependency.

Run with: `cd server && pytest`
