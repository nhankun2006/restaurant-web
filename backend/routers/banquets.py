from typing import Optional, List, Any
from datetime import date
import json
import asyncpg
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field
from database import get_db

router = APIRouter()

class BanquetBookingCreate(BaseModel):
    customer_name: str
    customer_phone: str
    customer_email: Optional[str] = None
    customer_address: Optional[str] = None
    banquet_type: str
    event_date: date
    event_time: Optional[str] = None
    table_count: int
    combo_menu_id: Optional[int] = None
    custom_items: Optional[List[Any]] = Field(default_factory=list)
    services: Optional[List[Any]] = Field(default_factory=list)
    estimated_total: Optional[float] = None
    notes: Optional[str] = None

class BanquetBookingStatusUpdate(BaseModel):
    status: str
    admin_notes: Optional[str] = ""

@router.get("/services")
async def get_services(db: asyncpg.Connection = Depends(get_db)):
    """List all active banquet services."""
    rows = await db.fetch("SELECT * FROM banquet_services WHERE is_active = TRUE ORDER BY sort_order")
    return {"data": [dict(r) for r in rows]}

@router.post("/bookings")
async def create_booking(booking: BanquetBookingCreate, db: asyncpg.Connection = Depends(get_db)):
    """Create a banquet booking."""
    query = """
        INSERT INTO banquet_bookings (
            customer_name, customer_phone, customer_email, customer_address,
            banquet_type, event_date, event_time, table_count, combo_menu_id,
            custom_items, services, estimated_total, notes, status
        ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, 'pending'
        ) RETURNING id
    """
    
    # Serialize JSON fields
    custom_items_json = json.dumps(booking.custom_items) if booking.custom_items else '[]'
    services_json = json.dumps(booking.services) if booking.services else '[]'
    
    row = await db.fetchrow(
        query,
        booking.customer_name,
        booking.customer_phone,
        booking.customer_email,
        booking.customer_address,
        booking.banquet_type,
        booking.event_date,
        booking.event_time,
        booking.table_count,
        booking.combo_menu_id,
        custom_items_json,
        services_json,
        booking.estimated_total,
        booking.notes
    )
    
    return {"message": "Booking created successfully", "id": row["id"]}

@router.get("/bookings")
async def list_bookings(db: asyncpg.Connection = Depends(get_db)):
    """List all banquet bookings."""
    rows = await db.fetch("SELECT * FROM banquet_bookings ORDER BY created_at DESC")
    
    results = []
    for r in rows:
        d = dict(r)
        d["custom_items"] = json.loads(d["custom_items"]) if isinstance(d["custom_items"], str) else d["custom_items"]
        d["services"] = json.loads(d["services"]) if isinstance(d["services"], str) else d["services"]
        results.append(d)
        
    return {"data": results}

@router.put("/bookings/{booking_id}/status")
async def update_booking_status(
    booking_id: int, 
    update_data: BanquetBookingStatusUpdate,
    db: asyncpg.Connection = Depends(get_db)
):
    """Update booking status."""
    row = await db.fetchrow(
        """
        UPDATE banquet_bookings 
        SET status = $1, admin_notes = $2, updated_at = NOW()
        WHERE id = $3
        RETURNING id
        """,
        update_data.status,
        update_data.admin_notes,
        booking_id
    )
    
    if not row:
        raise HTTPException(status_code=404, detail="Booking not found")
        
    return {"message": "Booking status updated successfully"}

@router.delete("/bookings/{booking_id}")
async def delete_booking(booking_id: int, db: asyncpg.Connection = Depends(get_db)):
    """Delete a banquet booking."""
    row = await db.fetchrow(
        "DELETE FROM banquet_bookings WHERE id = $1 RETURNING id",
        booking_id
    )
    
    if not row:
        raise HTTPException(status_code=404, detail="Booking not found")
        
    return {"message": "Booking deleted successfully"}
