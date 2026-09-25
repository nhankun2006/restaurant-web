# Cay Tung Restaurant

## Overview

Cay Tung Restaurant is a full-stack web application consisting of a **Next.js 14 (App Router)** frontend and a **FastAPI** backend powered by **PostgreSQL** (via `asyncpg`).

**Key Features:**
- **Menu:** Browse & filter dishes by category.
- **Events:** Explore and book event types (birthdays, weddings, etc.).
- **Booking:** Submit online reservation requests.
- **Admin Panel:** Internal management interface for menu, categories, and bookings.

---

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, Axios
- **Backend**: FastAPI, Uvicorn, asyncpg, Pydantic, python-multipart
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

### Running with Docker (Backend & PostgreSQL)

The easiest way to start both the PostgreSQL database (with persistent volume) and FastAPI backend is with Docker Compose:

```bash
# Build and start services in background
docker compose up --build -d

# Check service logs
docker compose logs -f

# Stop services (data is preserved in the postgres_data volume)
docker compose down
```

- **PostgreSQL**: Accessible at `localhost:5432` with data persisted in the `restaurant_postgres_data` volume. SQL schemas and seeds are loaded automatically on the first startup.
- **FastAPI API**: Accessible at **http://localhost:8000** (Swagger UI: **http://localhost:8000/docs**).
- **Uploaded Images**: Stored in `./backend/static/images` directly on the host machine.

---

### Manual Setup

#### Database Setup

1. **Initialize Database:** Ensure your PostgreSQL server is running and create the target database (e.g., `restaurant`):
```bash
# Switch to the postgres system user
sudo -i -u postgres

createdb -U postgres restaurant
```

2. **Execute SQL Scripts in Sequence:**
- `backend/schema.sql`: **DDL Migration Script** — Drops existing tables (if any) and creates table schemas (`categories`, `menu_items`, `events`, `bookings`) along with Row Level Security (RLS) policies.
- `backend/seed_full_menu.sql`: **Seed Data Script** — Resets data sequences (`TRUNCATE`) and populates all 16 categories, event packages, and 100+ menu items with mapped image URLs (`/images/food/...`).

```bash
# Step 1: Create table schema (DDL Migration)
psql -U postgres -d restaurant -f backend/schema.sql

# Step 2: Seed categories, menu items, and events (Data Ingestion)
psql -U postgres -d restaurant -f backend/seed_full_menu.sql
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
# or
uv pip install -r requirements.txt
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

### Public

| Method | Endpoint                  | Description                              |
| ------ | ------------------------- | ---------------------------------------- |
| GET    | `/`                       | API welcome message                      |
| GET    | `/health`                 | Health check                             |
| GET    | `/api/menu/categories`    | List all categories                      |
| GET    | `/api/menu/items`         | List menu items (filterable by category) |
| GET    | `/api/menu/featured`      | Featured menu items                      |
| GET    | `/api/gallery/`           | Gallery albums listing (supports ?category=) |
| GET    | `/api/gallery/{id}`       | Single gallery album with images        |
| GET    | `/api/bookings/`          | List all bookings                        |
| POST   | `/api/bookings/`          | Submit a new booking                     |

### Admin

| Method | Endpoint                           | Description                             |
| ------ | ---------------------------------- | --------------------------------------- |
| GET    | `/admin/api/categories`            | List categories                         |
| POST   | `/admin/api/categories`            | Create category (supports image upload) |
| PUT    | `/admin/api/categories/{id}`       | Update category                         |
| DELETE | `/admin/api/categories/{id}`       | Delete category (cascades to items)     |
| GET    | `/admin/api/menu-items`            | List all menu items (incl. hidden)      |
| POST   | `/admin/api/menu-items`            | Create menu item (supports image upload)|
| PUT    | `/admin/api/menu-items/{id}`       | Update menu item                        |
| DELETE | `/admin/api/menu-items/{id}`       | Delete menu item                        |
| POST   | `/admin/api/menu-items/{id}/image` | Replace image for a menu item           |
| GET    | `/admin/api/galleries`             | List all gallery albums with images     |
| POST   | `/admin/api/galleries`             | Create gallery album (supports cover)   |
| PUT    | `/admin/api/galleries/{id}`        | Update gallery album                    |
| DELETE | `/admin/api/galleries/{id}`        | Delete gallery album (cascades images)  |
| POST   | `/admin/api/galleries/{id}/images` | Upload one or multiple photos to album  |
| DELETE | `/admin/api/galleries/images/{id}` | Delete a photo from album               |
| GET    | `/admin/api/bookings`              | List all bookings                       |
| DELETE | `/admin/api/bookings/{id}`         | Delete a booking                        |

> Full interactive API documentation is available at `/docs` (Swagger UI) when the backend is running.

---

## Admin Panel

The admin panel is an **internal management interface**. There is no link to it anywhere on the public-facing site — access is by direct URL only.

| Environment | URL                           |
| ----------- | ----------------------------- |
| Local dev   | `http://localhost:3000/admin` |
| Production  | `https://<your-domain>/admin` |

### Features

| Tab                          | Actions                                                                      |
| ---------------------------- | ---------------------------------------------------------------------------- |
| **Danh mục** (Categories)    | Add / edit / delete categories, upload category image                        |
| **Món ăn** (Menu Items)      | Add / edit / delete dishes, upload dish image, toggle featured / available   |
| **Gallery** (Photo Albums)   | Add / edit / delete albums, upload cover & multiple event photos, captions   |
| **Đặt bàn** (Bookings)       | View all reservation requests, delete entries                                |

> **Note:** The admin panel currently has no authentication layer. It is intended to be accessed only by the restaurant owner who knows the direct URL. Do **not** share the `/admin` path publicly. Authentication (e.g. password prompt or session-based login) can be added in a future iteration.

---

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)