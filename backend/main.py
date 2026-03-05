from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import menu, events, bookings

app = FastAPI(
    title="Cay Tung Restaurant API",
    description="API for Cay Tung restaurant website — menu, events, and bookings",
    version="1.0.0"
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

# Include routers
app.include_router(menu.router, prefix="/api/menu", tags=["Menu"])
app.include_router(events.router, prefix="/api/events", tags=["Events"])
app.include_router(bookings.router, prefix="/api/bookings", tags=["Bookings"])


@app.get("/")
def root():
    return {"message": "Welcome to Cay Tung Restaurant API", "status": "running"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}
