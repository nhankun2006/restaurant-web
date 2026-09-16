# Cay Tung Restaurant

## Overview

Cay Tung Restaurant is a full-stack web application consisting of a **Next.js 14 (App Router)** frontend and a **FastAPI** backend powered by **PostgreSQL** (via `asyncpg`).

**Key Features:**
- **Menu:** Browse & filter dishes by category.
- **Events:** Explore and book event types (birthdays, weddings, etc.).
- **Booking:** Submit online reservation requests.

---

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, Axios
- **Backend**: FastAPI, Uvicorn, asyncpg, Pydantic
- **Database**: PostgreSQL (v12+)

---

## Prerequisites

| Tool            | Minimum Version |
| --------------- | --------------- |
| **Node.js**     | 18.x            |
| **pnpm / npm**  | 8.x+            |
| **Python**      | 3.10 - 3.12     |
| **PostgreSQL**  | 14.x+           |
| **uv**          | Latest (or pip) |

---

## Getting Started

### Database Setup

1. Make sure your local PostgreSQL server is running.
2. Create the target database (e.g. `restaurant`):
```bash
createdb -U postgres restaurant
```
3. Run `backend/schema.sql` to create tables and seed initial data:
```bash
psql -U postgres -d restaurant -f backend/schema.sql
```

---

### Backend Setup

1. Navigate to the `backend` directory and create `.env`:
```bash
cd backend
uv venv

# for my specific version
uv venv --python 3.12
```
Add your PostgreSQL connection string in `backend/.env`:
```env
DATABASE_URL=postgresql://postgres:svcntt@localhost:5432/restaurant
```

2. Install dependencies using `uv` (recommended) or standard `pip`:
```bash
uv pip sync requirements.txt
# or: pip install -r requirements.txt
```

3. Start the FastAPI backend server:
```bash
uvicorn main:app --reload --port 8000
```

The API will be available at **http://localhost:8000**. Interactive documentation (Swagger UI) is available at **http://localhost:8000/docs**.

---

### Frontend Setup

```bash
cd frontend

# Install dependencies with pnpm or npm
pnpm install

# Start the dev server
pnpm dev
```

The frontend will be available at **http://localhost:3000**.

---

## API Endpoints

| Method | Endpoint             | Description              |
| ------ | -------------------- | ------------------------ |
| GET    | `/`                  | API welcome message      |
| GET    | `/health`            | Health check             |
| GET    | `/api/menu/...`      | Menu items & categories  |
| GET    | `/api/events/...`    | Events listing           |
| GET    | `/api/bookings/...`  | Bookings management      |
| POST   | `/api/bookings/...`  | Submit a new booking     |

> Full interactive API documentation is available at `/docs` (Swagger UI) when the backend is running.

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)