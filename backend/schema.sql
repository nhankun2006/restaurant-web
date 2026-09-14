-- ============================================
-- Cay Tung Restaurant — PostgreSQL Schema
-- Run this in your PostgreSQL database (e.g., psql -U postgres -d restaurant -f schema.sql)
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
    ('Món Khai Vị', 'appetizers', 'Khởi đầu hành trình ẩm thực với bộ sưu tập các món khai vị tinh tế được chế biến từ những nguyên liệu tươi ngon nhất.', '/images/appetizers.jpg'),
    ('Món Chính', 'main-course', 'Thưởng thức các món chính được chế biến công phu từ thịt cao cấp và nông sản tươi ngon theo mùa.', '/images/main-course.jpg'),
    ('Hải Sản', 'seafood', 'Hải sản tươi sống từ đại dương, chế biến theo phong cách Địa Trung Hải đầy tinh tế.', '/images/seafood.jpg'),
    ('Đồ Uống & Cocktail', 'drinks', 'Cocktail pha chế thủ công, rượu vang hảo hạng và các thức uống thanh mát đồng hành cùng bữa ăn của bạn.', '/images/drinks.jpg'),
    ('Món Tráng Miệng', 'desserts', 'Kết thúc bữa ăn thật ngọt ngào với các món tráng miệng và bánh ngọt hấp dẫn.', '/images/desserts.jpg');

-- ============================================
-- SEED DATA — Menu Items
-- ============================================

-- Appetizers (category_id = 1)
INSERT INTO menu_items (category_id, name, description, price, image_url, is_featured) VALUES
    (1, 'Truffle Bruschetta', 'Bánh mì sourdough nướng giòn phủ kem nấm truffle đen, cà chua nướng và sốt húng tây tươi.', 16.50, '/images/food/bruschetta.jpg', true),
    (1, 'Seared Foie Gras', 'Gan ngỗng Pháp áp chảo ăn kèm mứt quả vả, bánh brioche nướng và sốt cô đặc balsamic.', 24.00, '/images/food/foie-gras.jpg', false),
    (1, 'Caesar Salad', 'Rau xà lách romaine giòn tươi, phô mai parmesan bào, bánh mì nướng bơ gỏi và sốt Caesar đặc trưng.', 14.00, '/images/food/caesar-salad.jpg', false),
    (1, 'Tuna Tartare', 'Cá ngừ tươi băm nhỏ kèm bơ xay mịn, bánh giòn vung đen và sốt ponzu thanh mát.', 19.00, '/images/food/tuna-tartare.jpg', true);

-- Main Course (category_id = 2)
INSERT INTO menu_items (category_id, name, description, price, image_url, is_featured) VALUES
    (2, 'Wagyu Beef Tenderloin', 'Thăn nội bò Wagyu A5 nướng hoàn hảo, dùng kèm khoai tây nghiền truffle và sốt rượu vang đỏ.', 58.00, '/images/food/wagyu.jpg', true),
    (2, 'Herb-Crusted Rack of Lamb', 'Sườn cừu New Zealand phủ lớp thảo mộc hương thảo, rau củ nướng và sốt chimichurri bạc hà.', 45.00, '/images/food/lamb.jpg', true),
    (2, 'Wild Mushroom Risotto', 'Cơm Ý arborio dẻo quánh với nấm porcini, chanterelle và nấm đông cô, hoàn thiện với phô mai parmesan.', 28.00, '/images/food/risotto.jpg', false),
    (2, 'Duck Confit', 'Đùi vịt nấu chậm da giòn rụm, ăn kèm đậu lentils du Puy và sốt cam thanh ngọt.', 36.00, '/images/food/duck-confit.jpg', false);

-- Seafood (category_id = 3)
INSERT INTO menu_items (category_id, name, description, price, image_url, is_featured) VALUES
    (3, 'Pan-Seared Sea Bass', 'Cá vược Chile áp chảo với sốt bơ nghệ tây, đọt măng tây và khoai tây nghiền.', 42.00, '/images/food/sea-bass.jpg', true),
    (3, 'Lobster Thermidor', 'Tôm hùm Atlantic đút lò với sốt kem phô mai Gruyère, thảo mộc tươi và bơ đun chảy.', 65.00, '/images/food/lobster.jpg', true),
    (3, 'Grilled Octopus', 'Bạch tuộc nướng than hoa mềm thơm với ớt bột smoked paprika, sốt đậu gà purée và sốt mỡ chorizo.', 32.00, '/images/food/octopus.jpg', false),
    (3, 'Shrimp Scampi', 'Tôm sú cỡ lớn xào bơ tỏi, rượu vang trắng và thảo mộc tươi trên nền mì pasta angel hair.', 34.00, '/images/food/shrimp.jpg', false);

-- Drinks (category_id = 4)
INSERT INTO menu_items (category_id, name, description, price, image_url, is_featured) VALUES
    (4, 'Cay Tung Signature Martini', 'Martini đặc sản của nhà hàng với vodka thượng hạng, rượu hoa cơm cháy, dưa chuột tươi và chút chanh.', 18.00, '/images/food/martini.jpg', true),
    (4, 'Smoked Old Fashioned', 'Rượu Bourbon whiskey kết hợp đường demerara, đắng Angostura và khói gỗ táo bồng bềnh.', 20.00, '/images/food/old-fashioned.jpg', false),
    (4, 'French 75', 'Cocktail champagne cổ điển kết hợp gin London dry, nước cốt chanh tươi và siro ngọt nhẹ.', 16.00, '/images/food/french-75.jpg', false),
    (4, 'Virgin Passion Mojito', 'Chanh dây tươi, lá húng lủi, chanh và nước soda — thức uống nhiệt đới sảng khoái không cồn.', 12.00, '/images/food/mojito.jpg', false);

-- Desserts (category_id = 5)
INSERT INTO menu_items (category_id, name, description, price, image_url, is_featured) VALUES
    (5, 'Crème Brûlée', 'Kem trứng vani Madagascar truyền thống với lớp đường đốt giòn tan quyến rũ.', 14.00, '/images/food/creme-brulee.jpg', true),
    (5, 'Chocolate Lava Cake', 'Bánh chocolate đắng Valrhona với nhân chocolate tan chảy, dùng kèm kem vani.', 16.00, '/images/food/lava-cake.jpg', true),
    (5, 'Tiramisu', 'Bánh Ý truyền thống lớp bánh sampa thấm vị cà phê espresso, kem phô mai mascarpone và phủ bột cacao.', 14.00, '/images/food/tiramisu.jpg', false),
    (5, 'Seasonal Fruit Tart', 'Vỏ bánh pâte sucrée giòn bơ chứa nhân kem pastry và phủ trái cây tươi mọng nước.', 13.00, '/images/food/fruit-tart.jpg', false);

-- ============================================
-- SEED DATA — Events
-- ============================================

INSERT INTO events (title, slug, description, image_url, features) VALUES
    (
        'Tiệc Sinh Nhật & Kỷ Niệm',
        'birthday-party',
        'Tôn vinh những khoảnh khắc đáng nhớ trong không gian lãng mạn. Đội ngũ sự kiện chuyên nghiệp của chúng tôi sẽ thiết kế trải nghiệm tiệc theo yêu cầu với thực đơn tùy chỉnh, trang trí ấn tượng và dịch vụ chu đáo.',
        '/images/events/birthday-party.jpg',
        '["Thực đơn tiệc & bánh sinh nhật theo yêu cầu", "Phòng tiệc riêng (10-80 khách)", "Hệ thống âm thanh & DJ chuyên nghiệp", "Trang trí tiệc & bóng bay cao cấp", "Quản lý sự kiện hỗ trợ riêng", "Tặng kèm đĩa bánh sinh nhật đặc biệt"]'::jsonb
    ),
    (
        'Sự Kiện Công Ty & Hội Nghị',
        'corporate-event',
        'Tạo ấn tượng sâu sắc với đối tác và đồng nghiệp. Từ những bữa tối doanh nhân thân mật đến các buổi đại tiệc công ty, chúng tôi cung cấp không gian sang trọng với thiết bị âm thanh ánh sáng hiện đại.',
        '/images/events/corporate-event.jpg',
        '["Thiết bị AV & màn hình chiếu hiện đại", "Bố trí chỗ ngồi linh hoạt", "Thực đơn ăn trưa & tối cao cấp", "Không gian giao lưu riêng tư", "Quầy bar đầy đủ với cocktail sáng tạo", "Có dịch vụ đỗ xe (Valet)"]'::jsonb
    ),
    (
        'Tiệc Cưới Trọn Gói',
        'wedding-reception',
        'Ghi dấu ngày trọng đại trong không gian lãng mạn. Cay Tung mang đến sảnh tiệc trong nhà & ngoài trời tuyệt đẹp cùng ẩm thực đẳng cấp để biến ngày cưới trong mơ của bạn thành hiện thực.',
        '/images/events/wedding.jpg',
        '["Không gian lễ cưới trong nhà & ngoài trời", "Thực đơn cưới riêng & thử món miễn phí", "Trang trí hoa tươi & concept thiết kế riêng", "Quản lý tiệc cưới đồng hành suốt sự kiện", "Sân khấu & khu vực khiêu vũ", "Phòng tân hôn dành cho cặp đôi", "Sức chứa lên tới 200 khách"]'::jsonb
    ),
    (
        'Trải Nghiệm Ẩm Thực Riêng Tư',
        'private-dining',
        'Dành cho những ai tìm kiếm sự riêng tư tuyệt đối. Phòng ăn VIP thích hợp cho lễ kỷ niệm, cầu hôn hay gặp mặt gia đình để tận hưởng những giây phút đặc biệt.',
        '/images/events/private-dining.jpg',
        '["Phòng VIP riêng biệt (2-20 khách)", "Thực đơn thử món thiết kế riêng bởi bếp trưởng", "Gợi ý kết hợp rượu vang từ Sommelier", "Không gian nến nồng ấm & âm nhạc tùy chọn", "Nhân viên phục vụ riêng", "Đáp ứng các yêu cầu chế độ ăn đặc biệt"]'::jsonb
    );
