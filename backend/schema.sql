-- ============================================
-- Cay Tung Restaurant — PostgreSQL Schema (Migration Only)
-- Run: psql -U postgres -d restaurant -f backend/schema.sql
-- ============================================

-- 1. Reset tables if they already exist (Safe Re-run)
DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS menu_items CASCADE;
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
    price NUMERIC(10, 2) NOT NULL,
    image_url TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Events Table
CREATE TABLE events (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    image_url TEXT,
    features JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Bookings Table
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

-- ============================================
-- Enable Row Level Security (public read, insert)
-- ============================================

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Public read access for categories
CREATE POLICY "Allow public read categories" ON categories
    FOR SELECT USING (true);

-- Public read access for menu_items
CREATE POLICY "Allow public read menu_items" ON menu_items
    FOR SELECT USING (true);

-- Public read access for events
CREATE POLICY "Allow public read events" ON events
    FOR SELECT USING (true);

-- Public insert access for bookings (anyone can book)
CREATE POLICY "Allow public insert bookings" ON bookings
    FOR INSERT WITH CHECK (true);

-- Public read access for bookings (for admin view)
CREATE POLICY "Allow public read bookings" ON bookings
    FOR SELECT USING (true);
