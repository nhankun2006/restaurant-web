-- Add new columns to menu_items
ALTER TABLE menu_items ADD COLUMN IF NOT EXISTS full_description TEXT;
ALTER TABLE menu_items ADD COLUMN IF NOT EXISTS ingredients TEXT;
ALTER TABLE menu_items ADD COLUMN IF NOT EXISTS serves INTEGER;
ALTER TABLE menu_items ADD COLUMN IF NOT EXISTS prep_time TEXT;
ALTER TABLE menu_items ADD COLUMN IF NOT EXISTS gallery_images JSONB DEFAULT '[]';

-- Combo Menus
CREATE TABLE IF NOT EXISTS combo_menus (
    id          BIGSERIAL PRIMARY KEY,
    name        TEXT NOT NULL,
    slug        TEXT NOT NULL UNIQUE,
    description TEXT,
    price       NUMERIC(12, 0),
    dish_count  INTEGER DEFAULT 6,
    is_active   BOOLEAN DEFAULT TRUE,
    sort_order  INTEGER DEFAULT 0,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Combo Menu Items (junction)
CREATE TABLE IF NOT EXISTS combo_menu_items (
    id            BIGSERIAL PRIMARY KEY,
    combo_menu_id BIGINT REFERENCES combo_menus(id) ON DELETE CASCADE,
    menu_item_id  BIGINT REFERENCES menu_items(id) ON DELETE SET NULL,
    item_name     TEXT NOT NULL,
    sort_order    INTEGER DEFAULT 0,
    UNIQUE(combo_menu_id, sort_order)
);

-- Banquet Services
CREATE TABLE IF NOT EXISTS banquet_services (
    id          BIGSERIAL PRIMARY KEY,
    name        TEXT NOT NULL,
    slug        TEXT NOT NULL UNIQUE,
    description TEXT,
    icon        TEXT,
    price       NUMERIC(12, 0),
    is_active   BOOLEAN DEFAULT TRUE,
    sort_order  INTEGER DEFAULT 0
);

-- Banquet Bookings
CREATE TABLE IF NOT EXISTS banquet_bookings (
    id               BIGSERIAL PRIMARY KEY,
    customer_name    TEXT NOT NULL,
    customer_phone   TEXT NOT NULL,
    customer_email   TEXT,
    customer_address TEXT,
    banquet_type     TEXT NOT NULL,
    event_date       DATE NOT NULL,
    event_time       TEXT,
    table_count      INTEGER NOT NULL DEFAULT 1,
    guest_count      INTEGER,
    combo_menu_id    BIGINT REFERENCES combo_menus(id) ON DELETE SET NULL,
    custom_items     JSONB DEFAULT '[]',
    services         JSONB DEFAULT '[]',
    estimated_total  NUMERIC(12, 0),
    status           TEXT DEFAULT 'pending',
    notes            TEXT DEFAULT '',
    admin_notes      TEXT DEFAULT '',
    created_at       TIMESTAMPTZ DEFAULT NOW(),
    updated_at       TIMESTAMPTZ DEFAULT NOW()
);

-- RLS policies for new tables
ALTER TABLE combo_menus ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read combo_menus" ON combo_menus FOR SELECT USING (true);

ALTER TABLE combo_menu_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read combo_menu_items" ON combo_menu_items FOR SELECT USING (true);

ALTER TABLE banquet_services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read banquet_services" ON banquet_services FOR SELECT USING (true);

ALTER TABLE banquet_bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public insert banquet_bookings" ON banquet_bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read banquet_bookings" ON banquet_bookings FOR SELECT USING (true);
