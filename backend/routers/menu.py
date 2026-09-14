from typing import Optional
import asyncpg
from fastapi import APIRouter, Depends, HTTPException, Query

from database import get_db

router = APIRouter()


@router.get("/categories")
async def get_categories(db: asyncpg.Connection = Depends(get_db)):
    """Get all menu categories."""
    rows = await db.fetch("SELECT * FROM categories ORDER BY id")
    return {"data": [dict(r) for r in rows]}


@router.get("/items")
async def get_menu_items(
    category: Optional[str] = Query(None, description="Filter by category slug"),
    db: asyncpg.Connection = Depends(get_db),
):
    """Get menu items, optionally filtered by category slug."""
    if category:
        cat_row = await db.fetchrow("SELECT id FROM categories WHERE slug = $1", category)
        if not cat_row:
            raise HTTPException(status_code=404, detail=f"Category '{category}' not found")
        category_id = cat_row["id"]
        rows = await db.fetch(
            """
            SELECT m.*, json_build_object('name', c.name, 'slug', c.slug) AS categories
            FROM menu_items m
            JOIN categories c ON m.category_id = c.id
            WHERE m.category_id = $1 AND m.is_available = TRUE
            ORDER BY m.name
            """,
            category_id,
        )
    else:
        rows = await db.fetch(
            """
            SELECT m.*, json_build_object('name', c.name, 'slug', c.slug) AS categories
            FROM menu_items m
            JOIN categories c ON m.category_id = c.id
            WHERE m.is_available = TRUE
            ORDER BY m.category_id
            """
        )
    return {"data": [dict(r) for r in rows]}


@router.get("/featured")
async def get_featured_items(db: asyncpg.Connection = Depends(get_db)):
    """Get featured menu items for homepage showcase."""
    rows = await db.fetch(
        """
        SELECT m.*, json_build_object('name', c.name, 'slug', c.slug) AS categories
        FROM menu_items m
        JOIN categories c ON m.category_id = c.id
        WHERE m.is_featured = TRUE AND m.is_available = TRUE
        """
    )
    return {"data": [dict(r) for r in rows]}

