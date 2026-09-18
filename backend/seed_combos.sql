-- Seed Combo Menus and Combo Menu Items

-- Helper to clear previous data if needed
-- TRUNCATE combo_menus, combo_menu_items, banquet_services RESTART IDENTITY CASCADE;

WITH inserted_menus AS (
    INSERT INTO combo_menus (name, slug, sort_order) VALUES
    ('Menu 1', 'menu-1', 1),
    ('Menu 2', 'menu-2', 2),
    ('Menu 3', 'menu-3', 3),
    ('Menu 4', 'menu-4', 4),
    ('Menu 5', 'menu-5', 5),
    ('Menu 6', 'menu-6', 6),
    ('Menu 7', 'menu-7', 7),
    ('Menu 8', 'menu-8', 8),
    ('Menu 9', 'menu-9', 9),
    ('Menu 10', 'menu-10', 10),
    ('Menu 11', 'menu-11', 11),
    ('Menu 12', 'menu-12', 12),
    ('Menu 13', 'menu-13', 13),
    ('Menu 14', 'menu-14', 14),
    ('Menu 15', 'menu-15', 15),
    ('Menu 16', 'menu-16', 16),
    ('Menu 17', 'menu-17', 17),
    ('Menu 18', 'menu-18', 18),
    ('Menu 19', 'menu-19', 19),
    ('Menu 20', 'menu-20', 20),
    ('Menu 21', 'menu-21', 21),
    ('Menu 22', 'menu-22', 22),
    ('Menu 23', 'menu-23', 23),
    ('Menu 24', 'menu-24', 24),
    ('Menu 25', 'menu-25', 25)
    RETURNING id, name
)
INSERT INTO combo_menu_items (combo_menu_id, item_name, sort_order)
SELECT id, item, row_number() OVER (PARTITION BY id) - 1
FROM (
    SELECT id, unnest(ARRAY[
        'Soup hải sản hột gà', 'Gỏi ngó sen tôm thịt', 'Nai né', 'Bò nấu tiêu xanh', 'Lẩu thái hải sản', 'Rau câu'
    ]) as item FROM inserted_menus WHERE name = 'Menu 1'
    UNION ALL
    SELECT id, unnest(ARRAY[
        'Soup hải sản trứng cút', 'Gỏi củ hủ dừa tôm thịt', 'Bò né', 'Mực hấp hành gừng', 'Lẩu hải sản tươi sống', 'Trái cây thập cẩm'
    ]) FROM inserted_menus WHERE name = 'Menu 2'
    UNION ALL
    SELECT id, unnest(ARRAY[
        'Soup bắp cua gà xé', 'Gỏi tiến vua tôm thịt', 'Mực hấp gừng', 'Diêu hồng chiên xù', 'Lẩu thái hải sản chua cay', 'Trái cây'
    ]) FROM inserted_menus WHERE name = 'Menu 3'
    UNION ALL
    SELECT id, unnest(ARRAY[
        'Ốc bưu nhồi thịt', 'Chả giò hải sản', 'Giò heo nấu giả cầy', 'Lá xách bò hấp tía tô', 'Lẩu ếch lá giang + bún', 'Trái cây thập cẩm'
    ]) FROM inserted_menus WHERE name = 'Menu 4'
    UNION ALL
    SELECT id, unnest(ARRAY[
        'Khai vị 2 món: Chả bò gân + Nai nướng lá lốt', 'Gỏi ngó sen tôm thịt', 'Heo rừng xào lăn', 'Bò nấu tiêu xanh', 'Lẩu thái hải sản', 'Rau câu'
    ]) FROM inserted_menus WHERE name = 'Menu 5'
    UNION ALL
    SELECT id, unnest(ARRAY[
        'Soup hải sản', 'Gỏi ngó sen tôm thịt', 'Bò xào lăn + Bánh mì', 'Gà hấp lá chanh – Xôi', 'Lẩu cá diêu hồng - Bún', 'Nho mỹ'
    ]) FROM inserted_menus WHERE name = 'Menu 6'
    UNION ALL
    SELECT id, unnest(ARRAY[
        'Khai vị 2 món: Chả giò sầu riêng + Tôm lăn bột chiên cốm', 'Gỏi nai bóp thấu + Bánh phồng', 'Mực xào sa tế', 'Bò né', 'Lẩu nấm hải sản', 'Trái cây'
    ]) FROM inserted_menus WHERE name = 'Menu 7'
    UNION ALL
    SELECT id, unnest(ARRAY[
        'Soup cua', 'Khai vị 2 món: Chả giò hải sản + Gỏi sen tôm thịt và bánh phồng', 'Tôm sú hấp bia', 'Tai tượng chiên xù', 'Lẩu thập cẩm', 'Rau câu dừa'
    ]) FROM inserted_menus WHERE name = 'Menu 8'
    UNION ALL
    SELECT id, unnest(ARRAY[
        'Khai vị 2 món: Tôm chiên cốm xanh + Cá trứng chiên giòn', 'Bò né', 'Tai tượng chiên xù', 'Bò nấu tiêu xanh', 'Lẩu khổ qua cá thác lác', 'Trái cây'
    ]) FROM inserted_menus WHERE name = 'Menu 9'
    UNION ALL
    SELECT id, unnest(ARRAY[
        'Soup bắp cua gà xé', 'Khai vị 2 món: Tôm lăn bột chiên giòn + Mực lăn bột chiên cốm', 'Gà bó xôi chiên', 'Bò né', 'Lẩu thái hải sản', 'Rau câu lá dứa'
    ]) FROM inserted_menus WHERE name = 'Menu 10'
    UNION ALL
    SELECT id, unnest(ARRAY[
        'Nộm tái heo', 'Cá lóc chiên xù', 'Vịt nấu giả cầy', 'Mực trứng hấp hành gừng', 'Giò heo nấu măng', 'Nho mỹ'
    ]) FROM inserted_menus WHERE name = 'Menu 11'
    UNION ALL
    SELECT id, unnest(ARRAY[
        'Gỏi bò cải mầm', 'Mực ống hấp hành gừng', 'Xách bò nhúng mẻ', 'Cá chẻm sốt chua ngọt', 'Vịt nấu xào măng + bún', 'Trái cây'
    ]) FROM inserted_menus WHERE name = 'Menu 12'
    UNION ALL
    SELECT id, unnest(ARRAY[
        'Dê tái chanh', 'Ếch chiên nước mắm', 'Cá lóc hấp bầu', 'Mực hấp hành gừng', 'Lẩu gà ác tiềm thuốc bắc + Mì trứng', 'Bánh lăng'
    ]) FROM inserted_menus WHERE name = 'Menu 13'
    UNION ALL
    SELECT id, unnest(ARRAY[
        'Khai vị 2 món: Chả giò cuộn tôm + Cá trứng chiên giòn', 'Gà quay + Xôi chiên phồng', 'Bò tái chanh', 'Giò heo muối chiên giòn', 'Lẩu gà lá giang', 'Trái cây'
    ]) FROM inserted_menus WHERE name = 'Menu 14'
    UNION ALL
    SELECT id, unnest(ARRAY[
        'Nộm bò tơ', 'Chả cá thác lác hấp cải xanh', 'Tôm sú rang tỏi', 'Cá lóc hấp bầu', 'Lẩu gà lá giang + Bún', 'Rau câu thập cẩm'
    ]) FROM inserted_menus WHERE name = 'Menu 15'
    UNION ALL
    SELECT id, unnest(ARRAY[
        'Khai vị 2 món: Bò cuộn Phô mai + Mực chiên giòn', 'Tôm rang me', 'Bò tái chanh', 'Nai né', 'Lẩu cá kèo', 'Nhãn thái'
    ]) FROM inserted_menus WHERE name = 'Menu 16'
    UNION ALL
    SELECT id, unnest(ARRAY[
        'Nộm bò tơ', 'Cá chẻm hấp', 'Gà hấp mắm nhĩ', 'Bắp bò hấp cải chua', 'Lẩu thác lác', 'Trái cây'
    ]) FROM inserted_menus WHERE name = 'Menu 17'
    UNION ALL
    SELECT id, unnest(ARRAY[
        'Khai vị 2 món: Tôm chiên cốm + Càng ghẹ nhúng mè', 'Mực hấp hành gừng', 'Gà quay xôi chiên', 'Bò nấu tiêu xanh', 'Lẩu thác lác khổ qua', 'Trái cây thập cẩm'
    ]) FROM inserted_menus WHERE name = 'Menu 18'
    UNION ALL
    SELECT id, unnest(ARRAY[
        'Khai vị 2 món: Tôm chiên cốm + Bò nướng salad Nga', 'Mực hấp gừng', 'Gà bó xôi chiên', 'Bò nấu tiêu xanh', 'Lẩu thác lác khổ qua', 'Trái cây'
    ]) FROM inserted_menus WHERE name = 'Menu 19'
    UNION ALL
    SELECT id, unnest(ARRAY[
        'Khai vị 2 món: Bò nướng salad Nga + Chả cá thác lác chiên', 'Tôm rang me', 'Gà quay', 'Nai né', 'Lẩu thái', 'Nho mỹ'
    ]) FROM inserted_menus WHERE name = 'Menu 20'
    UNION ALL
    SELECT id, unnest(ARRAY[
        'Gỏi bò tái chanh', 'Dê nhúng dấm', 'Gà ta xé phay', 'Tôm sú ủ muối HongKong', 'Lẩu dê', 'Nhãn thái'
    ]) FROM inserted_menus WHERE name = 'Menu 21'
    UNION ALL
    SELECT id, unnest(ARRAY[
        'Bò trộn cải mầm', 'Dê nhúng mẻ', 'Mực hấp', 'Diêu hồng chiên xù', 'Lẩu thái hải sản chua cay', 'Rau câu dừa'
    ]) FROM inserted_menus WHERE name = 'Menu 22'
    UNION ALL
    SELECT id, unnest(ARRAY[
        'Soup măng tây cua', 'Khai vị 2 món: Chả giò sầu riêng + Mực chiên giòn', 'Mực hấp hành gừng', 'Tôm sú hấp bia', 'Nai né', 'Lẩu thái hải sản', 'Nho mỹ'
    ]) FROM inserted_menus WHERE name = 'Menu 23'
    UNION ALL
    SELECT id, unnest(ARRAY[
        'Khai vị 2 món: Gỏi ngó sen bao tử + Mực lăn cốm xanh', 'Bò né', 'Tôm lăn bột', 'Mực hấp hành gừng', 'Bò tiêu xanh', 'Lẩu cá kèo', 'Bánh Flan'
    ]) FROM inserted_menus WHERE name = 'Menu 24'
    UNION ALL
    SELECT id, unnest(ARRAY[
        'Khai vị 2 món: Gỏi ngó sen bao tử + Mực lăn cốm xanh', 'Nai né', 'Gà hấp lá chanh + Xôi', 'Tôm sú hấp bia', 'Mực hấp hành gừng', 'Lẩu cá kèo + Bún', 'Bánh Flan'
    ]) FROM inserted_menus WHERE name = 'Menu 25'
) items;

-- Update dish_count correctly
UPDATE combo_menus
SET dish_count = (SELECT COUNT(*) FROM combo_menu_items WHERE combo_menu_id = combo_menus.id);

-- Banquet Services
INSERT INTO banquet_services (name, slug, icon, price, sort_order, description) VALUES
('Khung rạp', 'khung-rap', '🏗️', 1000000, 1, 'Rạp cưới / rạp tiệc đầy đủ bàn ghế'),
('MC', 'mc', '🎤', 1000000, 2, 'MC dẫn chương trình chuyên nghiệp'),
('Dàn nhạc', 'dan-nhac', '🎵', 1000000, 3, 'Ban nhạc acoustic / DJ'),
('Sân khấu', 'san-khau', '🎬', 1000000, 4, 'Sân khấu + backdrop + ánh sáng'),
('Trang trí sân khấu', 'trang-tri-san-khau', '🌟', 1000000, 5, 'Trang trí sân khấu chuyên nghiệp'),
('Phông bạt', 'phong-bat', '🎪', 1000000, 6, 'Phông bạt trang trí tiệc'),
('Trang trí cổng', 'trang-tri-cong', '🚪', 1000000, 7, 'Trang trí cổng chào tiệc'),
('Chụp ảnh', 'chup-anh', '📸', 1000000, 8, 'Ekip chụp ảnh sự kiện');
