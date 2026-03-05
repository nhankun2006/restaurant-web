from fastapi import APIRouter, HTTPException, Query
from database import supabase
from typing import Optional

router = APIRouter()


@router.get("/categories")
def get_categories():
    """Get all menu categories."""
    try:
        response = supabase.table("categories").select("*").order("id").execute()
        return {"data": response.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/items")
def get_menu_items(category: Optional[str] = Query(None, description="Filter by category slug")):
    """Get menu items, optionally filtered by category slug."""
    try:
        if category:
            # First get category id by slug
            cat_response = supabase.table("categories").select("id").eq("slug", category).execute()
            if not cat_response.data:
                raise HTTPException(status_code=404, detail=f"Category '{category}' not found")
            category_id = cat_response.data[0]["id"]
            response = (
                supabase.table("menu_items")
                .select("*, categories(name, slug)")
                .eq("category_id", category_id)
                .eq("is_available", True)
                .order("name")
                .execute()
            )
        else:
            response = (
                supabase.table("menu_items")
                .select("*, categories(name, slug)")
                .eq("is_available", True)
                .order("category_id")
                .execute()
            )
        return {"data": response.data}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/featured")
def get_featured_items():
    """Get featured menu items for homepage showcase."""
    try:
        response = (
            supabase.table("menu_items")
            .select("*, categories(name, slug)")
            .eq("is_featured", True)
            .eq("is_available", True)
            .execute()
        )
        return {"data": response.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
