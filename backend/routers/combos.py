from typing import Optional
import asyncpg
from fastapi import APIRouter, Depends, HTTPException
from database import get_db

router = APIRouter()

@router.get("/")
async def list_combos(db: asyncpg.Connection = Depends(get_db)):
    """List all active combo menus with their items."""
    # First get the combos
    combos_rows = await db.fetch(
        "SELECT * FROM combo_menus WHERE is_active = TRUE ORDER BY sort_order"
    )
    
    # Then get all items for these combos
    combo_ids = [r["id"] for r in combos_rows]
    if not combo_ids:
        return {"data": []}
    
    items_rows = await db.fetch(
        """
        SELECT
            cmi.id,
            cmi.combo_menu_id,
            cmi.item_name,
            cmi.sort_order,
            cmi.menu_item_id,
            mi.name AS menu_item_name,
            mi.description AS menu_item_description,
            mi.price AS menu_item_price,
            mi.image_url AS menu_item_image_url
        FROM combo_menu_items cmi
        LEFT JOIN menu_items mi ON mi.id = cmi.menu_item_id
        WHERE cmi.combo_menu_id = ANY($1::bigint[])
        ORDER BY cmi.combo_menu_id, cmi.sort_order
        """,
        combo_ids,
    )
    
    # Group items by combo_menu_id
    items_by_combo = {}
    for item in items_rows:
        combo_id = item["combo_menu_id"]
        if combo_id not in items_by_combo:
            items_by_combo[combo_id] = []
        items_by_combo[combo_id].append({
            "id": item["id"],
            "item_name": item["item_name"],
            "sort_order": item["sort_order"],
            "menu_item_id": item["menu_item_id"],
            "menu_item_name": item["menu_item_name"],
            "menu_item_description": item["menu_item_description"],
            "menu_item_price": item["menu_item_price"],
            "menu_item_image_url": item["menu_item_image_url"],
        })
    
    # Assemble response
    result = []
    for combo in combos_rows:
        combo_dict = dict(combo)
        combo_dict["items"] = items_by_combo.get(combo["id"], [])
        result.append(combo_dict)
        
    return {"data": result}

@router.get("/{slug}")
async def get_combo(slug: str, db: asyncpg.Connection = Depends(get_db)):
    """Get single combo menu with its items."""
    combo_row = await db.fetchrow(
        "SELECT * FROM combo_menus WHERE slug = $1 AND is_active = TRUE", slug
    )
    if not combo_row:
        raise HTTPException(status_code=404, detail="Combo menu not found")
        
    items_rows = await db.fetch(
        """
        SELECT
            cmi.id,
            cmi.item_name,
            cmi.sort_order,
            cmi.menu_item_id,
            mi.name AS menu_item_name,
            mi.description AS menu_item_description,
            mi.price AS menu_item_price,
            mi.image_url AS menu_item_image_url
        FROM combo_menu_items cmi
        LEFT JOIN menu_items mi ON mi.id = cmi.menu_item_id
        WHERE cmi.combo_menu_id = $1
        ORDER BY cmi.sort_order
        """,
        combo_row["id"],
    )
    
    combo_dict = dict(combo_row)
    combo_dict["items"] = [
        {
            "id": item["id"],
            "item_name": item["item_name"],
            "sort_order": item["sort_order"],
            "menu_item_id": item["menu_item_id"],
            "menu_item_name": item["menu_item_name"],
            "menu_item_description": item["menu_item_description"],
            "menu_item_price": item["menu_item_price"],
            "menu_item_image_url": item["menu_item_image_url"],
        } for item in items_rows
    ]
    
    return {"data": combo_dict}
