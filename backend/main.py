import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from database import lifespan
from routers import menu, events, bookings, admin, combos, banquets

app = FastAPI(
    title="Cay Tung Restaurant API",
    description="API for Cay Tung restaurant website — menu, events, and bookings",
    version="1.0.0",
    lifespan=lifespan
)

# CORS — allow frontend dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve static files (images)
static_images_dir = os.path.join(os.path.dirname(__file__), "static", "images")
os.makedirs(static_images_dir, exist_ok=True)
app.mount("/images", StaticFiles(directory=static_images_dir), name="images")

# Include routers
app.include_router(menu.router, prefix="/api/menu", tags=["Menu"])
app.include_router(events.router, prefix="/api/events", tags=["Events"])
app.include_router(bookings.router, prefix="/api/bookings", tags=["Bookings"])
app.include_router(admin.router, prefix="/admin/api", tags=["Admin"])
app.include_router(combos.router, prefix="/api/combos", tags=["Combos"])
app.include_router(banquets.router, prefix="/api/banquets", tags=["Banquets"])


@app.get("/")
def root():
    return {"message": "Welcome to Cay Tung Restaurant API", "status": "running"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}
