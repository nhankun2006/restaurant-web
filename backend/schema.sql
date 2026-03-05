-- ============================================
-- Cay Tung Restaurant — Supabase Schema
-- Run this in your Supabase SQL Editor
-- ============================================

-- Categories Table
CREATE TABLE IF NOT EXISTS categories (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    image_url TEXT
);

-- Menu Items Table
CREATE TABLE IF NOT EXISTS menu_items (
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

-- Events Table
CREATE TABLE IF NOT EXISTS events (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    image_url TEXT,
    features JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bookings Table
CREATE TABLE IF NOT EXISTS bookings (
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

-- ============================================
-- SEED DATA — Categories
-- ============================================

INSERT INTO categories (name, slug, description, image_url) VALUES
    ('Appetizers', 'appetizers', 'Start your culinary journey with our exquisite selection of appetizers crafted from the finest ingredients.', '/images/appetizers.jpg'),
    ('Main Course', 'main-course', 'Indulge in our masterfully prepared main courses featuring premium cuts and fresh seasonal produce.', '/images/main-course.jpg'),
    ('Seafood', 'seafood', 'Fresh catches from the ocean, prepared with Mediterranean flair and served with elegance.', '/images/seafood.jpg'),
    ('Drinks & Cocktails', 'drinks', 'Handcrafted cocktails, fine wines, and refreshing beverages to complement your dining experience.', '/images/drinks.jpg'),
    ('Desserts', 'desserts', 'End your meal on a sweet note with our decadent desserts and pastries.', '/images/desserts.jpg');

-- ============================================
-- SEED DATA — Menu Items
-- ============================================

-- Appetizers (category_id = 1)
INSERT INTO menu_items (category_id, name, description, price, image_url, is_featured) VALUES
    (1, 'Truffle Bruschetta', 'Toasted sourdough topped with black truffle cream, roasted tomatoes, and fresh basil drizzle.', 16.50, '/images/food/bruschetta.jpg', true),
    (1, 'Seared Foie Gras', 'Pan-seared duck foie gras with fig compote, toasted brioche, and balsamic reduction.', 24.00, '/images/food/foie-gras.jpg', false),
    (1, 'Caesar Salad', 'Crisp romaine hearts, aged parmesan shavings, house-made croutons, and classic Caesar dressing.', 14.00, '/images/food/caesar-salad.jpg', false),
    (1, 'Tuna Tartare', 'Fresh ahi tuna with avocado mousse, sesame crisps, and ponzu dressing.', 19.00, '/images/food/tuna-tartare.jpg', true);

-- Main Course (category_id = 2)
INSERT INTO menu_items (category_id, name, description, price, image_url, is_featured) VALUES
    (2, 'Wagyu Beef Tenderloin', 'A5 Wagyu tenderloin grilled to perfection, served with truffle mashed potatoes and red wine jus.', 58.00, '/images/food/wagyu.jpg', true),
    (2, 'Herb-Crusted Rack of Lamb', 'New Zealand rack of lamb with rosemary crust, roasted vegetables, and mint chimichurri.', 45.00, '/images/food/lamb.jpg', true),
    (2, 'Wild Mushroom Risotto', 'Creamy arborio rice with porcini, chanterelle, and shiitake mushrooms finished with aged parmesan.', 28.00, '/images/food/risotto.jpg', false),
    (2, 'Duck Confit', 'Slow-cooked duck leg confit with crispy skin, served with lentils du Puy and orange gastrique.', 36.00, '/images/food/duck-confit.jpg', false);

-- Seafood (category_id = 3)
INSERT INTO menu_items (category_id, name, description, price, image_url, is_featured) VALUES
    (3, 'Pan-Seared Sea Bass', 'Chilean sea bass with saffron beurre blanc, asparagus tips, and crushed fingerling potatoes.', 42.00, '/images/food/sea-bass.jpg', true),
    (3, 'Lobster Thermidor', 'Whole Atlantic lobster baked with creamy Gruyère sauce, fresh herbs, and served with drawn butter.', 65.00, '/images/food/lobster.jpg', true),
    (3, 'Grilled Octopus', 'Tender chargrilled octopus with smoked paprika, chickpea purée, and chorizo vinaigrette.', 32.00, '/images/food/octopus.jpg', false),
    (3, 'Shrimp Scampi', 'Jumbo tiger prawns sautéed in garlic butter, white wine, and fresh herbs over angel hair pasta.', 34.00, '/images/food/shrimp.jpg', false);

-- Drinks (category_id = 4)
INSERT INTO menu_items (category_id, name, description, price, image_url, is_featured) VALUES
    (4, 'Cay Tung Signature Martini', 'Our house martini with premium vodka, elderflower liqueur, fresh cucumber, and a hint of lime.', 18.00, '/images/food/martini.jpg', true),
    (4, 'Smoked Old Fashioned', 'Bourbon whiskey with demerara sugar, Angostura bitters, and applewood smoke.', 20.00, '/images/food/old-fashioned.jpg', false),
    (4, 'French 75', 'Classic champagne cocktail with London dry gin, fresh lemon juice, and simple syrup.', 16.00, '/images/food/french-75.jpg', false),
    (4, 'Virgin Passion Mojito', 'Fresh passionfruit, mint leaves, lime, and soda water — a tropical refreshment without alcohol.', 12.00, '/images/food/mojito.jpg', false);

-- Desserts (category_id = 5)
INSERT INTO menu_items (category_id, name, description, price, image_url, is_featured) VALUES
    (5, 'Crème Brûlée', 'Classic Madagascar vanilla bean custard with a perfectly caramelized sugar crust.', 14.00, '/images/food/creme-brulee.jpg', true),
    (5, 'Chocolate Lava Cake', 'Rich dark Valrhona chocolate fondant with a molten center, served with vanilla bean ice cream.', 16.00, '/images/food/lava-cake.jpg', true),
    (5, 'Tiramisu', 'Traditional Italian layers of espresso-soaked ladyfingers, mascarpone cream, and cocoa dusting.', 14.00, '/images/food/tiramisu.jpg', false),
    (5, 'Seasonal Fruit Tart', 'Buttery pâte sucrée filled with pastry cream and topped with glazed fresh seasonal fruits.', 13.00, '/images/food/fruit-tart.jpg', false);

-- ============================================
-- SEED DATA — Events
-- ============================================

INSERT INTO events (title, slug, description, image_url, features) VALUES
    (
        'Birthday & Celebration Parties',
        'birthday-party',
        'Celebrate life''s special moments in an unforgettable setting. Our dedicated events team will craft a bespoke celebration experience with custom menus, stunning decorations, and impeccable service that will leave your guests in awe.',
        '/images/events/birthday-party.jpg',
        '["Customized party menus & cake", "Private dining rooms (10-80 guests)", "Professional DJ & sound system", "Custom decorations & balloon arrangements", "Dedicated event coordinator", "Complimentary birthday dessert platter"]'::jsonb
    ),
    (
        'Corporate Events & Galas',
        'corporate-event',
        'Impress your clients and colleagues with sophisticated corporate dining. From intimate business dinners to grand company galas, we provide a refined atmosphere with state-of-the-art audiovisual equipment and tailored catering solutions.',
        '/images/events/corporate-event.jpg',
        '["AV equipment & presentation screens", "Customizable seating arrangements", "Premium business lunch & dinner menus", "Private networking spaces", "Full bar service with custom cocktails", "Valet parking available"]'::jsonb
    ),
    (
        'Wedding Receptions',
        'wedding-reception',
        'Say "I do" surrounded by elegance and romance. Cay Tung offers breathtaking indoor and outdoor wedding venues, world-class cuisine, and a dedicated wedding planning team to make your dream celebration a reality.',
        '/images/events/wedding.jpg',
        '["Indoor & outdoor ceremony spaces", "Custom wedding menus & tasting sessions", "Floral arrangements & décor styling", "Professional wedding coordinator", "Dance floor & live band setup", "Honeymoon suite for the couple", "Capacity up to 200 guests"]'::jsonb
    ),
    (
        'Private Dining Experience',
        'private-dining',
        'For those who seek exclusivity, our private dining rooms offer an intimate escape. Perfect for anniversaries, proposals, family reunions, or any occasion that calls for something extraordinary.',
        '/images/events/private-dining.jpg',
        '["Exclusive private rooms (2-20 guests)", "Personalized tasting menu by head chef", "Sommelier-curated wine pairing", "Candlelit ambiance & custom music", "Dedicated wait staff", "Custom dietary accommodations"]'::jsonb
    );
