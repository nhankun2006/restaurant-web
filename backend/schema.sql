-- ============================================
-- Cay Tung Restaurant — PostgreSQL Schema (Migration Only)
-- Run: psql -U postgres -d restaurant -f backend/schema.sql
-- ============================================

-- 1. Reset tables if they already exist (Safe Re-run)
DROP TABLE IF EXISTS banquet_bookings CASCADE;
DROP TABLE IF EXISTS banquet_services CASCADE;
DROP TABLE IF EXISTS combo_menu_items CASCADE;
DROP TABLE IF EXISTS combo_menus CASCADE;
DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS menu_items CASCADE;
DROP TABLE IF EXISTS gallery_images CASCADE;
DROP TABLE IF EXISTS galleries CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

-- 2. Categories Table
CREATE TABLE categories (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    image_url TEXT
);

-- 3. Menu Items Table
CREATE TABLE menu_items (
    id BIGSERIAL PRIMARY KEY,
    category_id BIGINT REFERENCES categories(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    full_description TEXT,
    ingredients TEXT,
    serves INTEGER,
    prep_time TEXT,
    gallery_images JSONB DEFAULT '[]'::jsonb,
    price NUMERIC(10, 2) NOT NULL,
    image_url TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Combo Menus Table
CREATE TABLE combo_menus (
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

-- 5. Combo Menu Items Table (Junction)
CREATE TABLE combo_menu_items (
    id            BIGSERIAL PRIMARY KEY,
    combo_menu_id BIGINT REFERENCES combo_menus(id) ON DELETE CASCADE,
    menu_item_id  BIGINT REFERENCES menu_items(id) ON DELETE SET NULL,
    item_name     TEXT NOT NULL,
    sort_order    INTEGER DEFAULT 0,
    UNIQUE(combo_menu_id, sort_order)
);

-- 6. Banquet Services Table
CREATE TABLE banquet_services (
    id          BIGSERIAL PRIMARY KEY,
    name        TEXT NOT NULL,
    slug        TEXT NOT NULL UNIQUE,
    description TEXT,
    icon        TEXT,
    price       NUMERIC(12, 0),
    is_active   BOOLEAN DEFAULT TRUE,
    sort_order  INTEGER DEFAULT 0
);

-- 7. Events Table
CREATE TABLE events (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    image_url TEXT,
    features JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Galleries Table (Album collections)
CREATE TABLE galleries (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    cover_image TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Gallery Images Table (1-N with galleries)
CREATE TABLE gallery_images (
    id BIGSERIAL PRIMARY KEY,
    gallery_id BIGINT REFERENCES galleries(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    caption TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Bookings Table (Table reservations)
CREATE TABLE bookings (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    event_type TEXT NOT NULL,
    date DATE NOT NULL,
    time TEXT NOT NULL,
    guests INTEGER NOT NULL,
    message TEXT DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. Banquet Bookings Table (Party & banquet reservations)
CREATE TABLE banquet_bookings (
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
    custom_items     JSONB DEFAULT '[]'::jsonb,
    services         JSONB DEFAULT '[]'::jsonb,
    estimated_total  NUMERIC(12, 0),
    status           TEXT DEFAULT 'pending',
    notes            TEXT DEFAULT '',
    admin_notes      TEXT DEFAULT '',
    created_at       TIMESTAMPTZ DEFAULT NOW(),
    updated_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Enable Row Level Security (RLS)
-- ============================================

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE combo_menus ENABLE ROW LEVEL SECURITY;
ALTER TABLE combo_menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE banquet_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE galleries ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE banquet_bookings ENABLE ROW LEVEL SECURITY;

-- Public read access for categories
CREATE POLICY "Allow public read categories" ON categories
    FOR SELECT USING (true);

-- Public read access for menu_items
CREATE POLICY "Allow public read menu_items" ON menu_items
    FOR SELECT USING (true);

-- Public read access for combo_menus
CREATE POLICY "Allow public read combo_menus" ON combo_menus
    FOR SELECT USING (true);

-- Public read access for combo_menu_items
CREATE POLICY "Allow public read combo_menu_items" ON combo_menu_items
    FOR SELECT USING (true);

-- Public read access for banquet_services
CREATE POLICY "Allow public read banquet_services" ON banquet_services
    FOR SELECT USING (true);

-- Public read access for events
CREATE POLICY "Allow public read events" ON events
    FOR SELECT USING (true);

-- Public read access for galleries
CREATE POLICY "Allow public read galleries" ON galleries
    FOR SELECT USING (true);

-- Public read access for gallery_images
CREATE POLICY "Allow public read gallery_images" ON gallery_images
    FOR SELECT USING (true);

-- Public insert/read access for bookings
CREATE POLICY "Allow public insert bookings" ON bookings
    FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read bookings" ON bookings
    FOR SELECT USING (true);

-- Public insert/read access for banquet_bookings
CREATE POLICY "Allow public insert banquet_bookings" ON banquet_bookings
    FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read banquet_bookings" ON banquet_bookings
    FOR SELECT USING (true);
