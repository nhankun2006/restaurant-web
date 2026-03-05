from fastapi import APIRouter, HTTPException

from database import supabase

router = APIRouter()


@router.get("/")
def get_events():
    """Get all event types."""
    try:
        response = supabase.table("events").select("*").order("id").execute()
        return {"data": response.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/{slug}")
def get_event_by_slug(slug: str):
    """Get a single event type by slug."""
    try:
        response = supabase.table("events").select("*").eq("slug", slug).execute()
        if not response.data:
            raise HTTPException(status_code=404, detail=f"Event '{slug}' not found")
        return {"data": response.data[0]}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
