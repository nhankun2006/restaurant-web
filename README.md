# Cay Tung Restaurant

A modern, full-stack restaurant website for **Cay Tung Restaurant** — featuring an interactive menu, event booking, and a beautiful responsive UI.

## Overview

Cay Tung Restaurant is a full-stack web application designed to showcase the restaurant's offerings and streamline customer interactions. The project is split into two main parts:

- **Frontend** — A fast, component-based single-page application built with React and Vite, offering pages for browsing the menu, exploring events, making reservations, and learning about the restaurant.
- **Backend** — A RESTful API built with FastAPI that serves menu data, event information, and handles booking submissions, all backed by a Supabase (PostgreSQL) database.

### Key Features

| Feature              | Description                                                  |
| -------------------- | ------------------------------------------------------------ |
| **Menu**          | Browse dishes by category (Appetizers, Main Course, Seafood, Drinks, Desserts) with filtering |
| **Events**        | View available event types — birthdays, corporate galas, weddings, private dining |
| **Booking**       | Submit reservation requests with guest details, date, and event type |
| **Home**          | Hero section, featured dishes, and restaurant highlights |
| **About**         | Restaurant story, philosophy, and team information |

---

## Tech Stack

### Frontend

| Technology        | Version  | Purpose                          |
| ----------------- | -------- | -------------------------------- |
| React             | 18.3     | UI component library             |
| Vite              | 5.4      | Build tool & dev server          |
| React Router DOM  | 6.26     | Client-side routing              |
| Axios             | 1.7      | HTTP client for API calls        |
| React Icons       | 5.3      | Icon library                     |

### Backend

| Technology    | Version  | Purpose                              |
| ------------- | -------- | ------------------------------------ |
| FastAPI       | 0.115    | Python web framework                 |
| Uvicorn       | 0.30     | ASGI server                          |
| Supabase      | 2.7      | Database client (PostgreSQL)         |
| Pydantic      | 2.9      | Data validation & serialization      |
| python-dotenv | 1.0      | Environment variable management      |

### Database

| Technology | Purpose                              |
| ---------- | ------------------------------------ |
| Supabase   | Hosted PostgreSQL with Row Level Security (RLS) |

---

## Prerequisites

Make sure you have the following installed before setting up the project:

| Tool       | Minimum Version | Installation                                          |
| ---------- | --------------- | ----------------------------------------------------- |
| **Node.js** | 18.x           | [nodejs.org](https://nodejs.org/)                     |
| **npm**     | 9.x            | Comes with Node.js                                    |
| **Python**  | 3.10+           | [python.org](https://www.python.org/downloads/)       |
| **pip**     | 22.x            | Comes with Python                                     |
| **Git**     | 2.x             | [git-scm.com](https://git-scm.com/)                  |

You will also need a **[Supabase](https://supabase.com/)** account with a project set up. See [Database Setup](#-database-setup) below.

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/cay-tung-restaurant.git
cd cay-tung-restaurant
```

### 2. Backend Setup

```bash
# Create a virtual environment
cd backend
python -m venv venv
source venv/bin/activate        # Linux/macOS
# venv\Scripts\activate         # Windows

# Install dependencies
pip install -r requirements.txt
```

Create a `.env` file inside the `backend/` directory:

```env
SUPABASE_URL=your-supabase-project-url
SUPABASE_KEY=your-supabase-anon-key
```

Start the backend server:

```bash
uvicorn main:app --reload --port 8000
```

The API will be available at **http://localhost:8000**. Interactive docs at **http://localhost:8000/docs**.

### 3. Frontend Setup

```bash
# From the project root
cd frontend

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The frontend will be available at **http://localhost:5173**.

### 4. Database Setup

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

---

## Project Structure

```
Restaurant/
├── backend/
│   ├── main.py              # FastAPI app entry point
│   ├── database.py          # Supabase client configuration
│   ├── requirements.txt     # Python dependencies
│   ├── schema.sql           # Database schema & seed data
│   ├── .env                 # Environment variables (not committed)
│   └── routers/
│       ├── __init__.py
│       ├── menu.py          # Menu endpoints
│       ├── events.py        # Events endpoints
│       └── bookings.py      # Bookings endpoints
├── frontend/
│   ├── index.html           # HTML entry point
│   ├── package.json         # Node.js dependencies
│   ├── vite.config.js       # Vite configuration
│   ├── public/
│   │   └── images/          # Static images
│   └── src/
│       ├── main.jsx         # React entry point
│       ├── App.jsx          # Root component & routing
│       ├── index.css        # Global styles
│       ├── api/
│       │   └── client.js    # Axios API client
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── Footer.jsx
│       │   ├── Hero.jsx
│       │   ├── MenuCard.jsx
│       │   ├── EventCard.jsx
│       │   ├── BookingForm.jsx
│       │   ├── CategoryFilter.jsx
│       │   └── SectionTitle.jsx
│       └── pages/
│           ├── Home.jsx
│           ├── Menu.jsx
│           ├── Events.jsx
│           ├── Booking.jsx
│           └── About.jsx
├── .gitignore
└── README.md
```

---

## License

This project is for educational and personal use.