-- ============================================
-- Ẩm Thực Cây Tùng — Full Seed Script (Data Only)
-- Contains: Categories, Events, and Full Menu Items (with image_url mapped to static/images/food/)
-- Run: psql -U postgres -d restaurant -f backend/seed_full_menu.sql
-- ============================================

-- Xóa dữ liệu cũ và reset ID trước khi nạp lại
TRUNCATE TABLE menu_items, events, categories RESTART IDENTITY CASCADE;

-- 1. Insert Categories
INSERT INTO categories (name, slug, description, image_url) VALUES
    ('Các món gỏi', 'mon-goi', 'Các món gỏi thanh mát, chua cay khai vị đậm đà hương vị truyền thống.', '/images/categories/goi.jpg'),
    ('Các món súp', 'mon-sup', 'Các món súp nóng hổi, bổ dưỡng và khai vị tinh tế.', '/images/categories/sup.jpg'),
    ('Các món gà', 'mon-ga', 'Các món chế biến từ gà thả vườn tươi ngon, đậm vị.', '/images/categories/ga.jpg'),
    ('Các món chim', 'mon-chim', 'Món ăn từ chim bồ câu bổ dưỡng, chế biến công phu.', '/images/categories/chim.jpg'),
    ('Các món vịt', 'mon-vit', 'Các món vịt nướng, tiềm, nấu chao đậm đà.', '/images/categories/vit.jpg'),
    ('Các món bò', 'mon-bo', 'Thịt bò tươi mềm chế biến phong phú từ né, hầm đến lúc lắc.', '/images/categories/bo.jpg'),
    ('Các món cá', 'mon-ca', 'Cá tươi ngon hấp Hồng Kông, om riềng mẻ, chiên giòn sốt cam.', '/images/categories/ca.jpg'),
    ('Các món mực', 'mon-muc', 'Mực tươi giòn sần sật hấp hành, xào sa tế, chiên giòn.', '/images/categories/muc.jpg'),
    ('Các món heo', 'mon-heo', 'Heo rừng, sườn non, lưỡi heo chế biến nướng, xào lăn, giả cầy.', '/images/categories/heo.jpg'),
    ('Các món lẩu', 'mon-lau', 'Lẩu Thái, lẩu hải sản, lẩu cá, lẩu dê nghi ngút khói.', '/images/categories/lau.jpg'),
    ('Các món hải sâm', 'mon-hai-sam', 'Hải sâm cao cấp xào đông cô, bào ngư, gân nai.', '/images/categories/hai-sam.jpg'),
    ('Các món cua', 'mon-cua', 'Cua lột chiên bơ, cua rang me, cua hấp gừng tươi ngon.', '/images/categories/cua.jpg'),
    ('Các món chân giò', 'mon-chan-gio', 'Giò heo chiên giòn, hầm thuốc Bắc, um dưa cải.', '/images/categories/chan-gio.jpg'),
    ('Các món dồi trường', 'mon-doi-truong', 'Dồi trường giòn sần sật hấp gừng, xào bông cải, nhúng mẻ.', '/images/categories/doi-truong.jpg'),
    ('Các món dê, thỏ & nai', 'mon-de-tho-nai', 'Đặc sản dê, thỏ, nai hấp tía tô, xào lăn, tái riềng.', '/images/categories/de-tho-nai.jpg'),
    ('Các món tôm', 'mon-tom', 'Tôm tươi ủ muối, nướng muối ớt, hấp bia, cháy tỏi.', '/images/categories/tom.jpg')
ON CONFLICT (slug) DO UPDATE SET 
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    image_url = EXCLUDED.image_url;

-- 2. Insert Events
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
    )
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    image_url = EXCLUDED.image_url,
    features = EXCLUDED.features;

-- 3. Insert Menu Items (mapped with static/images/food/ image files)

-- 1. Các món gỏi
INSERT INTO menu_items (category_id, name, description, price, image_url, is_featured, is_available) VALUES
    ((SELECT id FROM categories WHERE slug = 'mon-goi'), 'Gỏi ngó sen tôm thịt', 'Ngó sen giòn ngọt kết hợp tôm sú và thịt ba chỉ tươi ngon.', 120000, '/images/food/khai_vi_1.png', true, true),
    ((SELECT id FROM categories WHERE slug = 'mon-goi'), 'Gỏi sò huyết nấm tuyết', 'Sò huyết tươi béo ngậy trộn nấm tuyết giòn sần sật.', 140000, NULL, false, true),
    ((SELECT id FROM categories WHERE slug = 'mon-goi'), 'Gỏi củ hủ dừa tôm thịt', 'Củ hủ dừa Miền Tây ngọt mát trộn tôm thịt đậm đà.', 135000, '/images/food/khai_vi_2.png', true, true),
    ((SELECT id FROM categories WHERE slug = 'mon-goi'), 'Gỏi xoài tôm thịt', 'Xoài keo bào sợi chua ngọt trộn tôm thịt thơm ngon.', 115000, NULL, false, true),
    ((SELECT id FROM categories WHERE slug = 'mon-goi'), 'Gỏi bưởi hương dừa', 'Tép bưởi mọng nước kết hợp cơm dừa bào sợi thơm lừng.', 130000, NULL, false, true),
    ((SELECT id FROM categories WHERE slug = 'mon-goi'), 'Gỏi lưỡi heo bao tử', 'Lưỡi heo và bao tử giòn ngon trộn nước mắm chua ngọt.', 125000, NULL, false, true),
    ((SELECT id FROM categories WHERE slug = 'mon-goi'), 'Gỏi mực', 'Mực tươi luộc tới giòn ngọt trộn rau răm hành tây.', 135000, NULL, false, true),
    ((SELECT id FROM categories WHERE slug = 'mon-goi'), 'Gỏi rong biển', 'Rong biển thanh mát trộn hải sản và sốt chua cay.', 120000, NULL, false, true),
    ((SELECT id FROM categories WHERE slug = 'mon-goi'), 'Gỏi lưỡi heo thập cẩm', 'Lưỡi heo giòn kết hợp rau củ bào sợi rưới sốt đậm đà.', 130000, NULL, false, true),
    ((SELECT id FROM categories WHERE slug = 'mon-goi'), 'Gỏi bò xốt me', 'Bò tái mềm mọng rưới sốt me chua ngọt cay dịu.', 140000, NULL, true, true),
    ((SELECT id FROM categories WHERE slug = 'mon-goi'), 'Gỏi ngó sen gà xé', 'Thịt gà ta xé phay trộn ngó sen tươi giòn.', 125000, NULL, false, true),
    ((SELECT id FROM categories WHERE slug = 'mon-goi'), 'Gỏi tiến vua gà xé', 'Rau tiến vua giòn sần sật kết hợp gà xé phay bóp rau răm.', 135000, NULL, false, true),
    ((SELECT id FROM categories WHERE slug = 'mon-goi'), 'Gỏi mực chua cay kiểu Thái', 'Mực tươi trộn sốt Thái chua cay đậm vị.', 145000, NULL, true, true),
    ((SELECT id FROM categories WHERE slug = 'mon-goi'), 'Gỏi bò tôm kiểu Thái', 'Thịt bò tái ngọt kết hợp tôm tươi và sốt chanh sa tế Thái.', 150000, NULL, false, true),
    ((SELECT id FROM categories WHERE slug = 'mon-goi'), 'Gỏi bồn bồn tôm thịt', 'Đặc sản bồn bồn Miền Tây giòn xốp trộn tôm thịt.', 130000, NULL, false, true);

-- 2. Các món súp
INSERT INTO menu_items (category_id, name, description, price, image_url, is_featured, is_available) VALUES
    ((SELECT id FROM categories WHERE slug = 'mon-sup'), 'Súp cua nấm gà', 'Thịt cua tươi kết hợp nấm hương và gà xé sánh mịn.', 45000, '/images/food/sup_1.png', true, true),
    ((SELECT id FROM categories WHERE slug = 'mon-sup'), 'Súp tôm cua', 'Súp đậm đà vị ngọt từ tôm và cua biển tươi.', 50000, '/images/food/sup_2.png', true, true),
    ((SELECT id FROM categories WHERE slug = 'mon-sup'), 'Súp gà nấm hương', 'Gà ta hầm nấm hương thơm lừng thanh vị.', 40000, NULL, false, true),
    ((SELECT id FROM categories WHERE slug = 'mon-sup'), 'Súp cua nấm linh chi', 'Cua tươi kết hợp nấm linh chi bổ dưỡng.', 55000, NULL, false, true),
    ((SELECT id FROM categories WHERE slug = 'mon-sup'), 'Súp cua nấm tuyết', 'Thịt cua kết hợp nấm tuyết giòn thanh.', 48000, NULL, false, true),
    ((SELECT id FROM categories WHERE slug = 'mon-sup'), 'Súp lươn', 'Súp lươn Nghệ An đậm đà bổ dưỡng.', 55000, NULL, false, true);

-- 3. Các món gà
INSERT INTO menu_items (category_id, name, description, price, image_url, is_featured, is_available) VALUES
    ((SELECT id FROM categories WHERE slug = 'mon-ga'), 'Gà hấp lá chanh', 'Gà ta thả vườn hấp lá chanh thơm lừng da giòn.', 280000, '/images/food/ga_hap_1.png', true, true),
    ((SELECT id FROM categories WHERE slug = 'mon-ga'), 'Gà hấp cải bẹ', 'Gà hấp cùng cải bẹ xanh vị đắng nhẹ thanh mát.', 280000, NULL, false, true),
    ((SELECT id FROM categories WHERE slug = 'mon-ga'), 'Gà bó xôi', 'Gà nguyên con bọc xôi chiên phồng da giòn rụm.', 350000, NULL, true, true),
    ((SELECT id FROM categories WHERE slug = 'mon-ga'), 'Gà hấp nấm', 'Gà hấp các loại nấm quý ngọt vị.', 290000, NULL, false, true),
    ((SELECT id FROM categories WHERE slug = 'mon-ga'), 'Gà hấp hành', 'Gà ta hấp hành củ ngọt ngào béo ngậy.', 280000, NULL, false, true),
    ((SELECT id FROM categories WHERE slug = 'mon-ga'), 'Gà rang me', 'Thịt gà giòn rụm sốt me chua ngọt.', 250000, NULL, false, true),
    ((SELECT id FROM categories WHERE slug = 'mon-ga'), 'Gà xào sa tế', 'Thịt gà xào sa tế cay nồng đưa cơm.', 220000, NULL, false, true),
    ((SELECT id FROM categories WHERE slug = 'mon-ga'), 'Gà xào sả ớt', 'Gà xào sả ớt thơm cay chuẩn vị Việt.', 220000, NULL, false, true),
    ((SELECT id FROM categories WHERE slug = 'mon-ga'), 'Gà chiên nước mắm', 'Gà chiên giòn áo lớp nước mắm tỏi ớt đậm đà.', 240000, '/images/food/ga_hap_2.png', true, true),
    ((SELECT id FROM categories WHERE slug = 'mon-ga'), 'Gà rang muối', 'Gà chiên giòn xóc muối hột và sả chiên.', 250000, NULL, false, true),
    ((SELECT id FROM categories WHERE slug = 'mon-ga'), 'Gà nấu nho', 'Gà hầm nho tươi sốt béo ngậy ăn kèm bánh mì.', 290000, NULL, false, true),
    ((SELECT id FROM categories WHERE slug = 'mon-ga'), 'Gỏi gà rau răm', 'Gà xé phay bóp rau răm chanh tỏi ớt.', 240000, NULL, false, true),
    ((SELECT id FROM categories WHERE slug = 'mon-ga'), 'Cà ri gà bánh mì', 'Cà ri gà nước cốt dừa béo lỏng dùng kèm bánh mì nóng.', 260000, NULL, false, true),
    ((SELECT id FROM categories WHERE slug = 'mon-ga'), 'Gà la-gu bánh mì', 'Gà la-gu củ quả khoai tây ăn cùng bánh mì giòn.', 260000, NULL, false, true),
    ((SELECT id FROM categories WHERE slug = 'mon-ga'), 'Gà tiềm thuốc Bắc', 'Gà ác/gà ta tiềm thuốc Bắc bổ dưỡng hồi phục sức khỏe.', 320000, NULL, true, true);

-- 4. Các món chim
INSERT INTO menu_items (category_id, name, description, price, image_url, is_featured, is_available) VALUES
    ((SELECT id FROM categories WHERE slug = 'mon-chim'), 'Bồ câu tần hạt sen', 'Chim bồ câu hầm hạt sen táo đỏ bổ dưỡng.', 180000, '/images/food/chim_cau_1.png', true, true),
    ((SELECT id FROM categories WHERE slug = 'mon-chim'), 'Xôi hạt sen chim câu', 'Xôi dẻo thơm ăn kèm thịt chim câu xào đậm đà.', 220000, '/images/food/chim_cau_2.png', true, true),
    ((SELECT id FROM categories WHERE slug = 'mon-chim'), 'Cháo chim câu hạt sen', 'Cháo bồ câu sánh mịn hầm hạt sen thơm ngon.', 170000, NULL, false, true),
    ((SELECT id FROM categories WHERE slug = 'mon-chim'), 'Chim câu quay bánh bao', 'Chim câu quay da giòn rụm dùng kèm bánh bao chiên.', 200000, NULL, false, true);

-- 5. Các món vịt
INSERT INTO menu_items (category_id, name, description, price, image_url, is_featured, is_available) VALUES
    ((SELECT id FROM categories WHERE slug = 'mon-vit'), 'Vịt nướng Vân Đình', 'Vịt nướng than hoa thơm lừng gia vị chuẩn Vân Đình.', 280000, '/images/food/vit_nuong_van_dinh.png', true, true),
    ((SELECT id FROM categories WHERE slug = 'mon-vit'), 'Vịt nấu chao', 'Vịt nấu chao môn đậm đà béo ngậy Miền Tây.', 320000, NULL, true, true),
    ((SELECT id FROM categories WHERE slug = 'mon-vit'), 'Vịt tiềm mì', 'Vịt tiềm nấm thảo mộc ăn cùng mì trứng.', 160000, NULL, false, true),
    ((SELECT id FROM categories WHERE slug = 'mon-vit'), 'Vịt tiềm bát trân', 'Vịt tiềm 8 vị thảo mộc thuốc Bắc bổ dưỡng.', 350000, NULL, false, true);

-- 6. Các món bò
INSERT INTO menu_items (category_id, name, description, price, image_url, is_featured, is_available) VALUES
    ((SELECT id FROM categories WHERE slug = 'mon-bo'), 'Bò né', 'Bò né chảo nóng bơ tỏi áp chảo xèo xèo.', 150000, NULL, false, true),
    ((SELECT id FROM categories WHERE slug = 'mon-bo'), 'Bò nấu rượu vang - Bánh mì', 'Bò hầm rượu vang đỏ Pháp sốt sánh mịn kèm bánh mì.', 220000, NULL, true, true),
    ((SELECT id FROM categories WHERE slug = 'mon-bo'), 'Bò hầm tiêu xanh - Bánh mì', 'Bò hầm tiêu xanh Phú Quốc cay nồng đưa vị.', 210000, NULL, true, true),
    ((SELECT id FROM categories WHERE slug = 'mon-bo'), 'Bò nấu la-gu - Bánh mì', 'Bò la-gu khoai tây cà rốt đậm đà.', 200000, NULL, false, true),
    ((SELECT id FROM categories WHERE slug = 'mon-bo'), 'Bò nấu cà ri - Bánh mì', 'Cà ri bò nước cốt dừa thơm béo.', 200000, NULL, false, true),
    ((SELECT id FROM categories WHERE slug = 'mon-bo'), 'Bò lúc lắc khoai tây chiên', 'Bò xào lúc lắc mộng nước kèm khoai tây chiên giòn.', 180000, NULL, true, true),
    ((SELECT id FROM categories WHERE slug = 'mon-bo'), 'Bò Tây Ban Nha', 'Bò nướng gia vị Tây Ban Nha sốt cay béo.', 240000, NULL, false, true),
    ((SELECT id FROM categories WHERE slug = 'mon-bo'), 'Bò tơ tái mè', 'Bò tơ tái mềm trộn mè rang thơm phức.', 170000, NULL, false, true),
    ((SELECT id FROM categories WHERE slug = 'mon-bo'), 'Bò bóp thấu', 'Bò bóp thấu khế chua chuối chát vị truyền thống.', 160000, NULL, false, true);

-- 7. Các món cá
INSERT INTO menu_items (category_id, name, description, price, image_url, is_featured, is_available) VALUES
    ((SELECT id FROM categories WHERE slug = 'mon-ca'), 'Cá chép om dưa', 'Cá chép om dưa chua thì là đậm vị Bắc.', 260000, NULL, true, true),
    ((SELECT id FROM categories WHERE slug = 'mon-ca'), 'Cá om riềng mẻ', 'Cá tươi om riềng mẻ thơm nồng.', 250000, NULL, false, true),
    ((SELECT id FROM categories WHERE slug = 'mon-ca'), 'Cá chẽm lăn bột chiên giòn', 'Cá chẽm phi lê chiên giòn sốt chấm bơ tỏi.', 280000, NULL, false, true),
    ((SELECT id FROM categories WHERE slug = 'mon-ca'), 'Cá chẽm hấp Hồng Kông', 'Cá chẽm hấp nước tương Hồng Kông hành xé.', 320000, NULL, true, true),
    ((SELECT id FROM categories WHERE slug = 'mon-ca'), 'Cá chẽm hấp kiểu kỳ lân', 'Cá chẽm hấp nấm đông cô nấm mèo và thịt nướng.', 330000, NULL, false, true),
    ((SELECT id FROM categories WHERE slug = 'mon-ca'), 'Cá chẽm hấp tàu xì', 'Cá chẽm hấp sốt tàu xì đậm đà thơm phức.', 320000, NULL, false, true),
    ((SELECT id FROM categories WHERE slug = 'mon-ca'), 'Cá lóc hấp bầu', 'Cá lóc nguyên con hấp trái bầu ngọt mát.', 240000, NULL, false, true),
    ((SELECT id FROM categories WHERE slug = 'mon-ca'), 'Cá trứng chiên giòn', 'Cá trứng Nauy chiên giòn rụm chấm mắm me.', 140000, NULL, false, true),
    ((SELECT id FROM categories WHERE slug = 'mon-ca'), 'Phi lê cá sốt cam', 'Phi lê cá áp chảo sốt cam tươi thanh dịu.', 220000, NULL, false, true),
    ((SELECT id FROM categories WHERE slug = 'mon-ca'), 'Phi lê cá chiên sốt chua ngọt', 'Cá chiên xù sốt chua ngọt rau củ.', 200000, NULL, false, true),
    ((SELECT id FROM categories WHERE slug = 'mon-ca'), 'Cá chẽm sốt cam', 'Cá chẽm nguyên con rưới sốt cam ngọt mát.', 300000, '/images/food/ca_chem_sot_cam.png', true, true),
    ((SELECT id FROM categories WHERE slug = 'mon-ca'), 'Cá sấu xào sa tế', 'Thịt cá sấu săn chắc xào sa tế cay nồng.', 220000, NULL, false, true);

-- 8. Các món mực
INSERT INTO menu_items (category_id, name, description, price, image_url, is_featured, is_available) VALUES
    ((SELECT id FROM categories WHERE slug = 'mon-muc'), 'Mực hấp hành', 'Mực ống giòn ngọt hấp hành gừng thơm lừng.', 190000, '/images/food/muc_1.png', true, true),
    ((SELECT id FROM categories WHERE slug = 'mon-muc'), 'Mực xào nấm hương', 'Mực xào nấm hương và rau củ tươi.', 180000, NULL, false, true),
    ((SELECT id FROM categories WHERE slug = 'mon-muc'), 'Mực xào thơm', 'Mực xào dứa chua ngọt giòn sần sật.', 180000, NULL, false, true),
    ((SELECT id FROM categories WHERE slug = 'mon-muc'), 'Mực xào sa tế', 'Mực tươi xào sa tế ớt chuông cay đậm.', 190000, '/images/food/muc_2.png', true, true),
    ((SELECT id FROM categories WHERE slug = 'mon-muc'), 'Mực chiên giòn', 'Mực tẩm bột chiên giòn chấm sốt mayonnaise.', 185000, NULL, false, true);

-- 9. Các món heo
INSERT INTO menu_items (category_id, name, description, price, image_url, is_featured, is_available) VALUES
    ((SELECT id FROM categories WHERE slug = 'mon-heo'), 'Heo rừng hấp tía tô', 'Heo rừng thái mỏng hấp lá tía tô chấm mắm tôm/chao.', 210000, NULL, true, true),
    ((SELECT id FROM categories WHERE slug = 'mon-heo'), 'Heo rừng xào lăn', 'Heo rừng xào lăn nước cốt dừa sả ớt.', 210000, NULL, true, true),
    ((SELECT id FROM categories WHERE slug = 'mon-heo'), 'Heo rừng xào sa tế', 'Heo rừng xào sa tế cay thơm nồng.', 200000, NULL, false, true),
    ((SELECT id FROM categories WHERE slug = 'mon-heo'), 'Heo rừng nấu giả cầy', 'Heo rừng nấu riềng sả mẻ chuẩn vị miền Bắc.', 220000, NULL, false, true),
    ((SELECT id FROM categories WHERE slug = 'mon-heo'), 'Sườn non sốt chua cay', 'Sườn non chiên sốt chua cay đậm đà.', 180000, NULL, false, true),
    ((SELECT id FROM categories WHERE slug = 'mon-heo'), 'Sườn non nấu lagu – Bánh mì', 'Sườn heo hầm lagu rau củ bánh mì giòn.', 190000, NULL, false, true),
    ((SELECT id FROM categories WHERE slug = 'mon-heo'), 'Sườn non nướng ngũ vị', 'Sườn nướng than hoa ướp sốt ngũ vị hương.', 200000, '/images/food/heo_chien.png', true, true),
    ((SELECT id FROM categories WHERE slug = 'mon-heo'), 'Lưỡi heo nấu đậu', 'Lưỡi heo giòn mềm hầm đậu white beans béo ngậy.', 180000, NULL, false, true);

-- 10. Các món lẩu
INSERT INTO menu_items (category_id, name, description, price, image_url, is_featured, is_available) VALUES
    ((SELECT id FROM categories WHERE slug = 'mon-lau'), 'Lẩu Thái chua cay', 'Lẩu Thái nước dùng chua cay đậm đà hải sản tôm mực.', 350000, '/images/food/lau_1.png', true, true),
    ((SELECT id FROM categories WHERE slug = 'mon-lau'), 'Lẩu hải sản', 'Lẩu hải sản thập cẩm tôm, mực, cá, nghêu.', 380000, NULL, true, true),
    ((SELECT id FROM categories WHERE slug = 'mon-lau'), 'Lẩu cá bớp', 'Lẩu cá bớp lá giang chua ngọt thanh mát.', 360000, NULL, false, true),
    ((SELECT id FROM categories WHERE slug = 'mon-lau'), 'Lẩu cá lăng', 'Lẩu cá lăng măng chua thơm ngon đặc sắc.', 360000, NULL, false, true),
    ((SELECT id FROM categories WHERE slug = 'mon-lau'), 'Lẩu cá tầm', 'Lẩu cá tầm sụn giòn ngọt nước dùng măng chua.', 450000, NULL, true, true),
    ((SELECT id FROM categories WHERE slug = 'mon-lau'), 'Lẩu cua đồng', 'Lẩu cua đồng riêu béo ngậy kèm bắp bò và mồng tơi.', 320000, NULL, false, true),
    ((SELECT id FROM categories WHERE slug = 'mon-lau'), 'Lẩu ba ba', 'Lẩu ba ba chuối đậu thuốc Bắc bổ dưỡng.', 550000, NULL, true, true),
    ((SELECT id FROM categories WHERE slug = 'mon-lau'), 'Lẩu cá mú rau ngót', 'Lẩu cá mú tươi ngọt kết hợp rau ngót thanh nhiệt.', 420000, NULL, false, true),
    ((SELECT id FROM categories WHERE slug = 'mon-lau'), 'Lẩu cá thác lác', 'Lẩu chả cá thác lác khổ qua đậm đà thanh mát.', 320000, NULL, false, true),
    ((SELECT id FROM categories WHERE slug = 'mon-lau'), 'Lẩu nấm hải sản', 'Lẩu nấm tổng hợp ngọt thanh kèm hải sản.', 380000, NULL, false, true),
    ((SELECT id FROM categories WHERE slug = 'mon-lau'), 'Lẩu cá chép nấu riêu', 'Lẩu cá chép riêu cua dưa chua đậm đà.', 320000, NULL, false, true),
    ((SELECT id FROM categories WHERE slug = 'mon-lau'), 'Lẩu dê', 'Lẩu thịt dê tươi hầm thuốc Bắc ăn kèm mì rau.', 390000, NULL, true, true),
    ((SELECT id FROM categories WHERE slug = 'mon-lau'), 'Lẩu cá chép giòn', 'Lẩu cá chép giòn ngọt sần sật măng chua.', 380000, NULL, false, true);

-- 11. Các món hải sâm
INSERT INTO menu_items (category_id, name, description, price, image_url, is_featured, is_available) VALUES
    ((SELECT id FROM categories WHERE slug = 'mon-hai-sam'), 'Hải sâm xào đông cô', 'Hải sâm xào nấm đông cô sốt dầu hàu đậm đà.', 350000, NULL, true, true),
    ((SELECT id FROM categories WHERE slug = 'mon-hai-sam'), 'Hải sâm gân nai xào đông cô', 'Hải sâm kết hợp gân nai dẻo quánh xào nấm.', 420000, NULL, true, true),
    ((SELECT id FROM categories WHERE slug = 'mon-hai-sam'), 'Hải sâm bào ngư xào đông cô', 'Hải sâm và bào ngư tươi xào nấm đông cô thượng hạng.', 550000, NULL, true, true);

-- 12. Các món cua
INSERT INTO menu_items (category_id, name, description, price, image_url, is_featured, is_available) VALUES
    ((SELECT id FROM categories WHERE slug = 'mon-cua'), 'Cua lột chiên bơ', 'Cua lột chiên bơ tỏi giòn tan béo ngậy.', 280000, '/images/food/cua_1.png', true, true),
    ((SELECT id FROM categories WHERE slug = 'mon-cua'), 'Cua rang me', 'Cua biển tươi sốt me chua ngọt đậm vị.', 350000, NULL, true, true),
    ((SELECT id FROM categories WHERE slug = 'mon-cua'), 'Cua thịt rang muối Hương Cảng', 'Cua thịt xóc muối tỏi ớt giòn rụm.', 360000, NULL, false, true),
    ((SELECT id FROM categories WHERE slug = 'mon-cua'), 'Cua hấp gừng', 'Cua hấp gừng sả giữ trọn vị ngọt tự nhiên.', 340000, NULL, false, true);

-- 13. Các món chân giò
INSERT INTO menu_items (category_id, name, description, price, image_url, is_featured, is_available) VALUES
    ((SELECT id FROM categories WHERE slug = 'mon-chan-gio'), 'Giò heo giả cầy', 'Giò heo nấu riềng mẻ sả ướp đậm đà chuẩn Bắc.', 220000, NULL, false, true),
    ((SELECT id FROM categories WHERE slug = 'mon-chan-gio'), 'Giò heo hầm thuốc Bắc', 'Giò heo hầm mềm với táo đỏ hạt sen bổ dưỡng.', 250000, '/images/food/chan_gio_2.png', true, true),
    ((SELECT id FROM categories WHERE slug = 'mon-chan-gio'), 'Giò heo um dưa cải', 'Giò heo um dưa chua đậm đà hao cơm.', 220000, NULL, false, true),
    ((SELECT id FROM categories WHERE slug = 'mon-chan-gio'), 'Giò heo chiên giòn', 'Giò heo chiên da giòn rụm chấm nước mắm chua ngọt.', 260000, '/images/food/chan_gio_1.png', true, true);

-- 14. Các món dồi trường
INSERT INTO menu_items (category_id, name, description, price, image_url, is_featured, is_available) VALUES
    ((SELECT id FROM categories WHERE slug = 'mon-doi-truong'), 'Dồi trường hấp gừng', 'Dồi trường tươi giòn hấp gừng hành thơm nức.', 190000, '/images/food/doi_truong_1.png', true, true),
    ((SELECT id FROM categories WHERE slug = 'mon-doi-truong'), 'Dồi trường xào bông cải', 'Dồi trường xào bông cải xanh tươi sần sật.', 180000, NULL, false, true),
    ((SELECT id FROM categories WHERE slug = 'mon-doi-truong'), 'Dồi trường nhúng mẻ', 'Dồi trường nhúng nước dùng mẻ chua thanh.', 200000, '/images/food/doi_truong_2.png', true, true);

-- 15. Các món dê, thỏ và nai
INSERT INTO menu_items (category_id, name, description, price, image_url, is_featured, is_available) VALUES
    ((SELECT id FROM categories WHERE slug = 'mon-de-tho-nai'), 'Dê hấp tía tô', 'Thịt dê tươi hấp lá tía tô thơm phức chấm chao.', 220000, NULL, true, true),
    ((SELECT id FROM categories WHERE slug = 'mon-de-tho-nai'), 'Dê xào lăn', 'Thịt dê xào lăn nước cốt dừa hành tây.', 220000, NULL, true, true),
    ((SELECT id FROM categories WHERE slug = 'mon-de-tho-nai'), 'Dê nhúng mẻ', 'Dê thái mỏng nhúng mẻ chua ngọt dịu.', 230000, NULL, false, true),
    ((SELECT id FROM categories WHERE slug = 'mon-de-tho-nai'), 'Dê tái chanh', 'Thịt dê tái chanh trộn sả vừng thơm giòn.', 210000, NULL, false, true),
    ((SELECT id FROM categories WHERE slug = 'mon-de-tho-nai'), 'Dê tái riềng', 'Dê tái trộn riềng giã nồng vị béo.', 210000, NULL, false, true),
    ((SELECT id FROM categories WHERE slug = 'mon-de-tho-nai'), 'Thỏ né bánh đa', 'Thịt thỏ né chảo nóng dùng kèm bánh đa giòn.', 210000, NULL, false, true),
    ((SELECT id FROM categories WHERE slug = 'mon-de-tho-nai'), 'Thỏ tái riềng mè', 'Thịt thỏ tái riềng rắc mè rang thơm phức.', 200000, NULL, false, true),
    ((SELECT id FROM categories WHERE slug = 'mon-de-tho-nai'), 'Thỏ xào lăn', 'Thịt thỏ xào lăn đậm đà gia vị.', 210000, NULL, false, true),
    ((SELECT id FROM categories WHERE slug = 'mon-de-tho-nai'), 'Thỏ cà ri – Bánh mì', 'Thỏ nấu cà ri cốt dừa béo ngậy kèm bánh mì.', 220000, NULL, false, true),
    ((SELECT id FROM categories WHERE slug = 'mon-de-tho-nai'), 'Thỏ chiên giòn', 'Thịt thỏ tẩm bột chiên giòn rụm.', 200000, NULL, false, true),
    ((SELECT id FROM categories WHERE slug = 'mon-de-tho-nai'), 'Thỏ tẩm mè chiên giòn', 'Thịt thỏ tẩm mè chiên thơm béo.', 210000, NULL, false, true),
    ((SELECT id FROM categories WHERE slug = 'mon-de-tho-nai'), 'Nai né bánh đa', 'Thịt nai né chảo bơ sả ăn cùng bánh đa.', 220000, NULL, true, true),
    ((SELECT id FROM categories WHERE slug = 'mon-de-tho-nai'), 'Nai xào lăn', 'Thịt nai săn chắc xào lăn nước cốt dừa.', 220000, NULL, false, true);

-- 16. Các món tôm
INSERT INTO menu_items (category_id, name, description, price, image_url, is_featured, is_available) VALUES
    ((SELECT id FROM categories WHERE slug = 'mon-tom'), 'Tôm ủ muối', 'Tôm sú ủ muối hột giòn ngọt đậm đà.', 220000, '/images/food/tom_rang_1.png', true, true),
    ((SELECT id FROM categories WHERE slug = 'mon-tom'), 'Tôm rang muối', 'Tôm rang muối Hồng Kông giòn rụm.', 220000, NULL, true, true),
    ((SELECT id FROM categories WHERE slug = 'mon-tom'), 'Tôm hấp bia', 'Tôm tươi hấp bia sả thơm ngọt tự nhiên.', 210000, NULL, false, true),
    ((SELECT id FROM categories WHERE slug = 'mon-tom'), 'Tôm hấp nước dừa', 'Tôm hấp nước dừa xiêm béo ngọt.', 220000, NULL, false, true),
    ((SELECT id FROM categories WHERE slug = 'mon-tom'), 'Tôm rang me', 'Tôm rang sốt me chua ngọt cay dịu.', 210000, NULL, false, true),
    ((SELECT id FROM categories WHERE slug = 'mon-tom'), 'Tôm cháy tỏi', 'Tôm chiên cháy tỏi phi thơm lừng.', 230000, NULL, true, true),
    ((SELECT id FROM categories WHERE slug = 'mon-tom'), 'Tôm nướng muối ớt', 'Tôm nướng sa tế muối ớt đậm đà cay nồng.', 230000, NULL, true, true),
    ((SELECT id FROM categories WHERE slug = 'mon-tom'), 'Tôm chiên giòn', 'Tôm tẩm bột xù chiên giòn chấm mayonnaise.', 200000, NULL, false, true),
    ((SELECT id FROM categories WHERE slug = 'mon-tom'), 'Tôm tái Thái', 'Tôm sú tươi tái chanh sốt Thái chua cay bùng vị.', 240000, NULL, true, true);
