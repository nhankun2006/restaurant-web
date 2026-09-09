# Cay Tung Restaurant

## Overview

Cay Tung Restaurant is a full-stack web application featuring an interactive menu, event booking, and a responsive UI. It consists of a **Next.js 14 (App Router)** frontend and a **FastAPI** backend powered by **Supabase**.

**Key Features:**
- **Menu:** Browse & filter dishes by category.
- **Events:** Explore and book event types (birthdays, weddings, etc.).
- **Booking:** Submit online reservation requests.

---

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, Axios
- **Backend**: FastAPI, Uvicorn, Pydantic
- **Database**: Supabase

---

## Prerequisites

| Tool        | Minimum Version |
| ----------- | --------------- |
| **Node.js** | 18.x            |
| **pnpm**    | 8.x+            |
| **Python**  | 3.10 - 3.12     |
| **uv**      | Latest (or pip) |
| **Git**     | 2.x             |

You will also need a **[Supabase](https://supabase.com/)** account with a project set up. See [Database Setup](#-database-setup) below.

---

## Getting Started

### Backend Setup

Using `uv` (recommended):

```bash
cd backend
uv venv --python 3.12
source .venv/bin/activate        # Linux/macOS
# .venv\Scripts\activate         # Windows

uv pip install -r requirements.txt
```

Start the backend server:

```bash
uvicorn main:app --reload --port 8000
```

The API will be available at **http://localhost:8000**. Interactive docs at **http://localhost:8000/docs**.

### Frontend Setup

```bash
cd frontend

# Install dependencies with pnpm
pnpm install

# Start the dev server
pnpm dev
```

The frontend will be available at **http://localhost:3000**.

### Database Setup

1. Create a new project on [Supabase](https://supabase.com/)
2. Go to the **SQL Editor** in your Supabase dashboard
3. Paste and run the contents of `backend/schema.sql`
4. This will create all tables, enable RLS policies, and seed sample data

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