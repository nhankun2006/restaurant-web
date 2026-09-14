import json
import asyncpg
from fastapi import APIRouter, Depends, HTTPException

from database import get_db

router = APIRouter()


def _format_event(row: asyncpg.Record) -> dict:
    data = dict(row)
    if isinstance(data.get("features"), str):
        try:
            data["features"] = json.loads(data["features"])
        except Exception:
            pass
    return data


@router.get("/")
async def get_events(db: asyncpg.Connection = Depends(get_db)):
    """Get all event types."""
    rows = await db.fetch("SELECT * FROM events ORDER BY id")
    return {"data": [_format_event(r) for r in rows]}


@router.get("/{slug}")
async def get_event_by_slug(slug: str, db: asyncpg.Connection = Depends(get_db)):
    """Get a single event type by slug."""
    row = await db.fetchrow("SELECT * FROM events WHERE slug = $1", slug)
    if not row:
        raise HTTPException(status_code=404, detail=f"Event '{slug}' not found")
    return {"data": _format_event(row)}

