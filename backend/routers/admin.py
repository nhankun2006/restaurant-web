import os
import shutil
import uuid
import json
from typing import Optional, List

import asyncpg
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from pydantic import BaseModel

from database import get_db

router = APIRouter()

STATIC_IMAGES_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "static", "images")
ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".gif", ".webp"}


# ─── Helpers ──────────────────────────────────────────────────────────────────

def _validate_image(file: UploadFile) -> str:
    """Check extension and return it."""
    ext = os.path.splitext(file.filename or "")[1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file type '{ext}'. Allowed: {', '.join(ALLOWED_EXTENSIONS)}"
        )
    return ext


async def _save_image(file: UploadFile) -> str:
    """Save uploaded image to static/images and return the public URL path."""
    ext = _validate_image(file)
    filename = f"{uuid.uuid4().hex}{ext}"
    dest = os.path.join(STATIC_IMAGES_DIR, filename)
    os.makedirs(STATIC_IMAGES_DIR, exist_ok=True)
    with open(dest, "wb") as f:
        shutil.copyfileobj(file.file, f)
    return f"/images/{filename}"


# ─── Categories ───────────────────────────────────────────────────────────────

@router.get("/categories")
async def admin_list_categories(db: asyncpg.Connection = Depends(get_db)):
    """List all categories."""
    rows = await db.fetch("SELECT * FROM categories ORDER BY id")
    return {"data": [dict(r) for r in rows]}


@router.post("/categories")
async def admin_create_category(
    name: str = Form(...),
    slug: str = Form(...),
    description: Optional[str] = Form(None),
    image: Optional[UploadFile] = File(None),
    db: asyncpg.Connection = Depends(get_db),
):
    """Create a new category."""
    image_url = None
    if image and image.filename:
        image_url = await _save_image(image)

    existing = await db.fetchrow("SELECT id FROM categories WHERE slug = $1", slug)
    if existing:
        raise HTTPException(status_code=409, detail=f"Slug '{slug}' already exists")

    row = await db.fetchrow(
        """
        INSERT INTO categories (name, slug, description, image_url)
        VALUES ($1, $2, $3, $4) RETURNING *
        """,
        name, slug, description, image_url
    )
    return {"message": "Category created", "data": dict(row)}


@router.put("/categories/{category_id}")
async def admin_update_category(
    category_id: int,
    name: Optional[str] = Form(None),
    slug: Optional[str] = Form(None),
    description: Optional[str] = Form(None),
    image: Optional[UploadFile] = File(None),
    db: asyncpg.Connection = Depends(get_db),
):
    """Update a category."""
    row = await db.fetchrow("SELECT * FROM categories WHERE id = $1", category_id)
    if not row:
        raise HTTPException(status_code=404, detail="Category not found")

    image_url = row["image_url"]
    if image and image.filename:
        image_url = await _save_image(image)

    row = await db.fetchrow(
        """
        UPDATE categories
        SET name        = COALESCE($1, name),
            slug        = COALESCE($2, slug),
            description = COALESCE($3, description),
            image_url   = COALESCE($4, image_url)
        WHERE id = $5 RETURNING *
        """,
        name, slug, description, image_url, category_id
    )
    return {"message": "Category updated", "data": dict(row)}


@router.delete("/categories/{category_id}")
async def admin_delete_category(
    category_id: int,
    db: asyncpg.Connection = Depends(get_db),
):
    """Delete a category (cascades to menu items)."""
    row = await db.fetchrow("SELECT id FROM categories WHERE id = $1", category_id)
    if not row:
        raise HTTPException(status_code=404, detail="Category not found")
    await db.execute("DELETE FROM categories WHERE id = $1", category_id)
    return {"message": "Category deleted"}


# ─── Menu Items ───────────────────────────────────────────────────────────────

@router.get("/menu-items")
async def admin_list_menu_items(db: asyncpg.Connection = Depends(get_db)):
    """List all menu items (including unavailable ones)."""
    rows = await db.fetch(
        """
        SELECT m.*, c.name AS category_name, c.slug AS category_slug
        FROM menu_items m
        JOIN categories c ON m.category_id = c.id
        ORDER BY m.category_id, m.name
        """
    )
    return {"data": [dict(r) for r in rows]}


@router.post("/menu-items")
async def admin_create_menu_item(
    category_id: int = Form(...),
    name: str = Form(...),
    description: Optional[str] = Form(None),
    price: float = Form(...),
    is_featured: bool = Form(False),
    is_available: bool = Form(True),
    image: Optional[UploadFile] = File(None),
    db: asyncpg.Connection = Depends(get_db),
):
    """Create a new menu item."""
    cat = await db.fetchrow("SELECT id FROM categories WHERE id = $1", category_id)
    if not cat:
        raise HTTPException(status_code=404, detail="Category not found")

    image_url = None
    if image and image.filename:
        image_url = await _save_image(image)

    row = await db.fetchrow(
        """
        INSERT INTO menu_items (category_id, name, description, price, image_url, is_featured, is_available)
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *
        """,
        category_id, name, description, price, image_url, is_featured, is_available
    )
    return {"message": "Menu item created", "data": dict(row)}


@router.put("/menu-items/{item_id}")
async def admin_update_menu_item(
    item_id: int,
    category_id: Optional[int] = Form(None),
    name: Optional[str] = Form(None),
    description: Optional[str] = Form(None),
    price: Optional[float] = Form(None),
    is_featured: Optional[bool] = Form(None),
    is_available: Optional[bool] = Form(None),
    image: Optional[UploadFile] = File(None),
    db: asyncpg.Connection = Depends(get_db),
):
    """Update a menu item. Only provided fields are updated."""
    row = await db.fetchrow("SELECT * FROM menu_items WHERE id = $1", item_id)
    if not row:
        raise HTTPException(status_code=404, detail="Menu item not found")

    image_url = row["image_url"]
    if image and image.filename:
        image_url = await _save_image(image)

    row = await db.fetchrow(
        """
        UPDATE menu_items
        SET category_id  = COALESCE($1, category_id),
            name         = COALESCE($2, name),
            description  = COALESCE($3, description),
            price        = COALESCE($4, price),
            image_url    = COALESCE($5, image_url),
            is_featured  = COALESCE($6, is_featured),
            is_available = COALESCE($7, is_available)
        WHERE id = $8 RETURNING *
        """,
        category_id, name, description, price, image_url, is_featured, is_available, item_id
    )
    return {"message": "Menu item updated", "data": dict(row)}


@router.delete("/menu-items/{item_id}")
async def admin_delete_menu_item(
    item_id: int,
    db: asyncpg.Connection = Depends(get_db),
):
    """Delete a menu item."""
    row = await db.fetchrow("SELECT id FROM menu_items WHERE id = $1", item_id)
    if not row:
        raise HTTPException(status_code=404, detail="Menu item not found")
    await db.execute("DELETE FROM menu_items WHERE id = $1", item_id)
    return {"message": "Menu item deleted"}


@router.post("/menu-items/{item_id}/image")
async def admin_upload_menu_item_image(
    item_id: int,
    image: UploadFile = File(...),
    db: asyncpg.Connection = Depends(get_db),
):
    """Upload / replace the image for an existing menu item."""
    row = await db.fetchrow("SELECT id FROM menu_items WHERE id = $1", item_id)
    if not row:
        raise HTTPException(status_code=404, detail="Menu item not found")

    image_url = await _save_image(image)
    await db.execute("UPDATE menu_items SET image_url = $1 WHERE id = $2", image_url, item_id)
    return {"message": "Image uploaded", "image_url": image_url}


# ─── Bookings (read-only for admin) ───────────────────────────────────────────

@router.get("/bookings")
async def admin_list_bookings(db: asyncpg.Connection = Depends(get_db)):
    """List all bookings."""
    rows = await db.fetch("SELECT * FROM bookings ORDER BY created_at DESC")
    return {"data": [dict(r) for r in rows]}


@router.delete("/bookings/{booking_id}")
async def admin_delete_booking(
    booking_id: int,
    db: asyncpg.Connection = Depends(get_db),
):
    """Delete a booking."""
    row = await db.fetchrow("SELECT id FROM bookings WHERE id = $1", booking_id)
    if not row:
        raise HTTPException(status_code=404, detail="Booking not found")
    await db.execute("DELETE FROM bookings WHERE id = $1", booking_id)
    return {"message": "Booking deleted"}


# ─── Galleries ────────────────────────────────────────────────────────────────

@router.get("/galleries")
async def admin_list_galleries(db: asyncpg.Connection = Depends(get_db)):
    """List all galleries with images and counts."""
    galleries_rows = await db.fetch("SELECT * FROM galleries ORDER BY id DESC")
    gallery_ids = [r["id"] for r in galleries_rows]
    if not gallery_ids:
        return {"data": []}

    images_rows = await db.fetch(
        """
        SELECT id, gallery_id, image_url, caption, sort_order
        FROM gallery_images
        WHERE gallery_id = ANY($1::bigint[])
        ORDER BY gallery_id, sort_order ASC, id ASC
        """,
        gallery_ids,
    )

    images_by_gallery = {}
    for img in images_rows:
        gid = img["gallery_id"]
        if gid not in images_by_gallery:
            images_by_gallery[gid] = []
        images_by_gallery[gid].append({
            "id": img["id"],
            "image_url": img["image_url"],
            "caption": img["caption"],
            "sort_order": img["sort_order"],
        })

    result = []
    for g in galleries_rows:
        item = dict(g)
        imgs = images_by_gallery.get(g["id"], [])
        item["images"] = imgs
        item["image_count"] = len(imgs)
        if not item.get("cover_image") and imgs:
            item["cover_image"] = imgs[0]["image_url"]
        result.append(item)

    return {"data": result}


@router.post("/galleries")
async def admin_create_gallery(
    title: str = Form(...),
    category: str = Form(...),
    description: Optional[str] = Form(None),
    cover_image: Optional[UploadFile] = File(None),
    db: asyncpg.Connection = Depends(get_db),
):
    """Create a new gallery album."""
    cover_image_url = None
    if cover_image and cover_image.filename:
        cover_image_url = await _save_image(cover_image)

    row = await db.fetchrow(
        """
        INSERT INTO galleries (title, category, description, cover_image)
        VALUES ($1, $2, $3, $4) RETURNING *
        """,
        title, category, description, cover_image_url
    )
    item = dict(row)
    item["images"] = []
    item["image_count"] = 0
    return {"message": "Gallery album created", "data": item}


@router.put("/galleries/{gallery_id}")
async def admin_update_gallery(
    gallery_id: int,
    title: Optional[str] = Form(None),
    category: Optional[str] = Form(None),
    description: Optional[str] = Form(None),
    cover_image: Optional[UploadFile] = File(None),
    db: asyncpg.Connection = Depends(get_db),
):
    """Update a gallery album."""
    row = await db.fetchrow("SELECT * FROM galleries WHERE id = $1", gallery_id)
    if not row:
        raise HTTPException(status_code=404, detail="Gallery album not found")

    cover_image_url = row["cover_image"]
    if cover_image and cover_image.filename:
        cover_image_url = await _save_image(cover_image)

    row = await db.fetchrow(
        """
        UPDATE galleries
        SET title       = COALESCE($1, title),
            category    = COALESCE($2, category),
            description = COALESCE($3, description),
            cover_image = COALESCE($4, cover_image)
        WHERE id = $5 RETURNING *
        """,
        title, category, description, cover_image_url, gallery_id
    )

    images_rows = await db.fetch(
        "SELECT id, gallery_id, image_url, caption, sort_order FROM gallery_images WHERE gallery_id = $1 ORDER BY sort_order, id",
        gallery_id
    )
    item = dict(row)
    item["images"] = [dict(img) for img in images_rows]
    item["image_count"] = len(item["images"])
    return {"message": "Gallery album updated", "data": item}


@router.delete("/galleries/{gallery_id}")
async def admin_delete_gallery(
    gallery_id: int,
    db: asyncpg.Connection = Depends(get_db),
):
    """Delete a gallery album (cascades to images)."""
    row = await db.fetchrow("SELECT id FROM galleries WHERE id = $1", gallery_id)
    if not row:
        raise HTTPException(status_code=404, detail="Gallery album not found")
    await db.execute("DELETE FROM galleries WHERE id = $1", gallery_id)
    return {"message": "Gallery album deleted"}


@router.post("/galleries/{gallery_id}/images")
async def admin_upload_gallery_images(
    gallery_id: int,
    images: List[UploadFile] = File(...),
    caption: Optional[str] = Form(None),
    db: asyncpg.Connection = Depends(get_db),
):
    """Upload one or more images into a gallery album."""
    album = await db.fetchrow("SELECT * FROM galleries WHERE id = $1", gallery_id)
    if not album:
        raise HTTPException(status_code=404, detail="Gallery album not found")

    max_order_row = await db.fetchrow(
        "SELECT COALESCE(MAX(sort_order), 0) as max_order FROM gallery_images WHERE gallery_id = $1",
        gallery_id
    )
    current_order = max_order_row["max_order"] if max_order_row else 0

    inserted_images = []
    first_image_url = None

    for file in images:
        if not file.filename:
            continue
        image_url = await _save_image(file)
        if not first_image_url:
            first_image_url = image_url
        current_order += 1
        img_row = await db.fetchrow(
            """
            INSERT INTO gallery_images (gallery_id, image_url, caption, sort_order)
            VALUES ($1, $2, $3, $4) RETURNING *
            """,
            gallery_id, image_url, caption, current_order
        )
        inserted_images.append(dict(img_row))

    if not album.get("cover_image") and first_image_url:
        await db.execute(
            "UPDATE galleries SET cover_image = $1 WHERE id = $2",
            first_image_url, gallery_id
        )

    return {"message": f"Uploaded {len(inserted_images)} images", "data": inserted_images}


@router.delete("/galleries/images/{image_id}")
async def admin_delete_gallery_image(
    image_id: int,
    db: asyncpg.Connection = Depends(get_db),
):
    """Delete a single gallery image."""
    row = await db.fetchrow("SELECT * FROM gallery_images WHERE id = $1", image_id)
    if not row:
        raise HTTPException(status_code=404, detail="Gallery image not found")
    await db.execute("DELETE FROM gallery_images WHERE id = $1", image_id)
    return {"message": "Gallery image deleted"}

