from typing import Optional
import asyncpg
from fastapi import APIRouter, Depends, HTTPException
from database import get_db

router = APIRouter()


@router.get("/")
async def list_galleries(category: Optional[str] = None, db: asyncpg.Connection = Depends(get_db)):
    """List all galleries/albums, optionally filtered by category, with their images."""
    if category and category != "all":
        galleries_rows = await db.fetch(
            "SELECT * FROM galleries WHERE category = $1 ORDER BY id DESC",
            category
        )
    else:
        galleries_rows = await db.fetch(
            "SELECT * FROM galleries ORDER BY id DESC"
        )

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
        # Fallback cover_image if null: use first image
        if not item.get("cover_image") and imgs:
            item["cover_image"] = imgs[0]["image_url"]
        result.append(item)

    return {"data": result}


@router.get("/{gallery_id}")
async def get_gallery(gallery_id: int, db: asyncpg.Connection = Depends(get_db)):
    """Get a single gallery album with all its images."""
    gallery_row = await db.fetchrow(
        "SELECT * FROM galleries WHERE id = $1",
        gallery_id
    )
    if not gallery_row:
        raise HTTPException(status_code=404, detail=f"Gallery album with ID {gallery_id} not found")

    images_rows = await db.fetch(
        """
        SELECT id, gallery_id, image_url, caption, sort_order
        FROM gallery_images
        WHERE gallery_id = $1
        ORDER BY sort_order ASC, id ASC
        """,
        gallery_id,
    )

    item = dict(gallery_row)
    imgs = [
        {
            "id": img["id"],
            "image_url": img["image_url"],
            "caption": img["caption"],
            "sort_order": img["sort_order"],
        }
        for img in images_rows
    ]
    item["images"] = imgs
    item["image_count"] = len(imgs)
    if not item.get("cover_image") and imgs:
        item["cover_image"] = imgs[0]["image_url"]

    return {"data": item}
