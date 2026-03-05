from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from typing import Optional
from database import supabase


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
def create_booking(booking: BookingRequest):
    """Submit a new booking / reservation request."""
    try:
        data = {
            "name": booking.name,
            "email": booking.email,
            "phone": booking.phone,
            "event_type": booking.event_type,
            "date": booking.date,
            "time": booking.time,
            "guests": booking.guests,
            "message": booking.message,
        }
        response = supabase.table("bookings").insert(data).execute()
        return {"message": "Booking submitted successfully!", "data": response.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/")
def get_bookings():
    """Get all bookings (admin view)."""
    try:
        response = (
            supabase.table("bookings")
            .select("*")
            .order("created_at", desc=True)
            .execute()
        )
        return {"data": response.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
