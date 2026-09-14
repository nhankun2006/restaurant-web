from datetime import date
from typing import Optional
import asyncpg
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

from database import get_db


class BookingRequest(BaseModel):
    name: str
    email: str
    phone: str
    event_type: str
    date: str
    time: str
    guests: int
    message: Optional[str] = ""


router = APIRouter()


@router.post("/")
async def create_booking(booking: BookingRequest, db: asyncpg.Connection = Depends(get_db)):
    """Submit a new booking / reservation request."""
    try:
        parsed_date = date.fromisoformat(booking.date)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid date format. Expected YYYY-MM-DD")

    row = await db.fetchrow(
        """
        INSERT INTO bookings (name, email, phone, event_type, date, time, guests, message)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *
        """,
        booking.name,
        booking.email,
        booking.phone,
        booking.event_type,
        parsed_date,
        booking.time,
        booking.guests,
        booking.message or "",
    )
    return {"message": "Booking submitted successfully!", "data": dict(row)}


@router.get("/")
async def get_bookings(db: asyncpg.Connection = Depends(get_db)):
    """Get all bookings (admin view)."""
    rows = await db.fetch("SELECT * FROM bookings ORDER BY created_at DESC")
    return {"data": [dict(r) for r in rows]}

