'use client';

import { useState, useEffect } from 'react';
import SectionTitle from '../../components/SectionTitle';
import MenuCard from '../../components/MenuCard';
import CategoryFilter from '../../components/CategoryFilter';
import { getCategories, getMenuItems } from '../../api/client';

export default function MenuPage() {
    const [categories, setCategories] = useState([]);
    const [items, setItems] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fallback data when API is not available
    const fallbackCategories = [
        { id: 1, name: 'Món Khai Vị', slug: 'appetizers' },
        { id: 2, name: 'Món Chính', slug: 'main-course' },
        { id: 3, name: 'Hải Sản', slug: 'seafood' },
        { id: 4, name: 'Đồ Uống & Cocktail', slug: 'drinks' },
        { id: 5, name: 'Món Tráng Miệng', slug: 'desserts' },
    ];

    const fallbackItems = [
        { id: 1, name: 'Truffle Bruschetta', description: 'Bánh mì sourdough nướng giòn phủ kem nấm truffle đen, cà chua nướng và sốt húng tây tươi.', price: 16.50, is_featured: true, category_id: 1, categories: { name: 'Món Khai Vị', slug: 'appetizers' } },
        { id: 2, name: 'Seared Foie Gras', description: 'Gan ngỗng Pháp áp chảo ăn kèm mứt quả vả, bánh brioche nướng và sốt cô đặc balsamic.', price: 24.00, is_featured: false, category_id: 1, categories: { name: 'Món Khai Vị', slug: 'appetizers' } },
        { id: 3, name: 'Caesar Salad', description: 'Rau xà lách romaine giòn tươi, phô mai parmesan bào, bánh mì nướng bơ gỏi và sốt Caesar đặc trưng.', price: 14.00, is_featured: false, category_id: 1, categories: { name: 'Món Khai Vị', slug: 'appetizers' } },
        { id: 4, name: 'Tuna Tartare', description: 'Cá ngừ tươi băm nhỏ kèm bơ xay mịn, bánh giòn vung đen và sốt ponzu thanh mát.', price: 19.00, is_featured: true, category_id: 1, categories: { name: 'Món Khai Vị', slug: 'appetizers' } },
        { id: 5, name: 'Wagyu Beef Tenderloin', description: 'Thăn nội bò Wagyu A5 nướng hoàn hảo, dùng kèm khoai tây nghiền truffle và sốt rượu vang đỏ.', price: 58.00, is_featured: true, category_id: 2, categories: { name: 'Món Chính', slug: 'main-course' } },
        { id: 6, name: 'Herb-Crusted Rack of Lamb', description: 'Sườn cừu New Zealand phủ lớp thảo mộc hương thảo, rau củ nướng và sốt chimichurri bạc hà.', price: 45.00, is_featured: true, category_id: 2, categories: { name: 'Món Chính', slug: 'main-course' } },
        { id: 7, name: 'Wild Mushroom Risotto', description: 'Cơm Ý arborio dẻo quánh với nấm porcini, chanterelle và nấm đông cô, hoàn thiện với phô mai parmesan.', price: 28.00, is_featured: false, category_id: 2, categories: { name: 'Món Chính', slug: 'main-course' } },
        { id: 8, name: 'Duck Confit', description: 'Đùi vịt nấu chậm da giòn rụm, ăn kèm đậu lentils du Puy và sốt cam thanh ngọt.', price: 36.00, is_featured: false, category_id: 2, categories: { name: 'Món Chính', slug: 'main-course' } },
        { id: 9, name: 'Pan-Seared Sea Bass', description: 'Cá vược Chile áp chảo với sốt bơ nghệ tây, đọt măng tây và khoai tây nghiền.', price: 42.00, is_featured: true, category_id: 3, categories: { name: 'Hải Sản', slug: 'seafood' } },
        { id: 10, name: 'Lobster Thermidor', description: 'Tôm hùm Atlantic đút lò với sốt kem phô mai Gruyère, thảo mộc tươi và bơ đun chảy.', price: 65.00, is_featured: true, category_id: 3, categories: { name: 'Hải Sản', slug: 'seafood' } },
        { id: 11, name: 'Grilled Octopus', description: 'Bạch tuộc nướng than hoa mềm thơm với ớt bột smoked paprika, sốt đậu gà purée và sốt mỡ chorizo.', price: 32.00, is_featured: false, category_id: 3, categories: { name: 'Hải Sản', slug: 'seafood' } },
        { id: 12, name: 'Shrimp Scampi', description: 'Tôm sú cỡ lớn xào bơ tỏi, rượu vang trắng và thảo mộc tươi trên nền mì pasta angel hair.', price: 34.00, is_featured: false, category_id: 3, categories: { name: 'Hải Sản', slug: 'seafood' } },
        { id: 13, name: 'Cay Tung Signature Martini', description: 'Martini đặc sản của nhà hàng với vodka thượng hạng, rượu hoa cơm cháy, dưa chuột tươi và chút chanh.', price: 18.00, is_featured: true, category_id: 4, categories: { name: 'Đồ Uống & Cocktail', slug: 'drinks' } },
        { id: 14, name: 'Smoked Old Fashioned', description: 'Rượu Bourbon whiskey kết hợp đường demerara, đắng Angostura và khói gỗ táo bồng bềnh.', price: 20.00, is_featured: false, category_id: 4, categories: { name: 'Đồ Uống & Cocktail', slug: 'drinks' } },
        { id: 15, name: 'French 75', description: 'Cocktail champagne cổ điển kết hợp gin London dry, nước cốt chanh tươi và siro ngọt nhẹ.', price: 16.00, is_featured: false, category_id: 4, categories: { name: 'Đồ Uống & Cocktail', slug: 'drinks' } },
        { id: 16, name: 'Virgin Passion Mojito', description: 'Chanh dây tươi, lá húng lủi, chanh và nước soda — thức uống nhiệt đới sảng khoái không cồn.', price: 12.00, is_featured: false, category_id: 4, categories: { name: 'Đồ Uống & Cocktail', slug: 'drinks' } },
        { id: 17, name: 'Crème Brûlée', description: 'Kem trứng vani Madagascar truyền thống với lớp đường đốt giòn tan quyến rũ.', price: 14.00, is_featured: true, category_id: 5, categories: { name: 'Món Tráng Miệng', slug: 'desserts' } },
        { id: 18, name: 'Chocolate Lava Cake', description: 'Bánh chocolate đắng Valrhona với nhân chocolate tan chảy, dùng kèm kem vani.', price: 16.00, is_featured: true, category_id: 5, categories: { name: 'Món Tráng Miệng', slug: 'desserts' } },
        { id: 19, name: 'Tiramisu', description: 'Bánh Ý truyền thống lớp bánh sampa thấm vị cà phê espresso, kem phô mai mascarpone và phủ bột cacao.', price: 14.00, is_featured: false, category_id: 5, categories: { name: 'Món Tráng Miệng', slug: 'desserts' } },
        { id: 20, name: 'Seasonal Fruit Tart', description: 'Vỏ bánh pâte sucrée giòn bơ chứa nhân kem pastry và phủ trái cây tươi mọng nước.', price: 13.00, is_featured: false, category_id: 5, categories: { name: 'Món Tráng Miệng', slug: 'desserts' } },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [catRes, itemsRes] = await Promise.all([
                    getCategories(),
                    getMenuItems(),
                ]);
                setCategories(catRes.data.data || []);
                setItems(itemsRes.data.data || []);
            } catch (err) {
                console.error('Failed to fetch menu data:', err);
                setCategories(fallbackCategories);
                setItems(fallbackItems);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleCategorySelect = async (slug) => {
        setActiveCategory(slug);
        setLoading(true);
        try {
            const res = await getMenuItems(slug);
            setItems(res.data.data || []);
        } catch (err) {
            console.error('Failed to filter items:', err);
            if (slug) {
                setItems(fallbackItems.filter(item => item.categories.slug === slug));
            } else {
                setItems(fallbackItems);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="page-header">
                <div className="container">
                    <h1>Thực Đơn</h1>
                    <div className="page-header__divider"></div>
                    <p>Bộ sưu tập các món ăn tuyệt hảo, từ món khai vị tươi ngon đến những món tráng miệng ngọt ngào.</p>
                </div>
            </div>

            <section className="section">
                <div className="container">
                    <CategoryFilter
                        categories={categories.length ? categories : fallbackCategories}
                        activeSlug={activeCategory}
                        onSelect={handleCategorySelect}
                    />

                    {loading ? (
                        <div className="menu-grid">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="skeleton skeleton--card"></div>
                            ))}
                        </div>
                    ) : items.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: 'var(--space-3xl) 0' }}>
                            <p style={{ color: 'var(--color-text-light)', fontSize: '1.1rem' }}>
                                Không tìm thấy món ăn nào trong danh mục này.
                            </p>
                        </div>
                    ) : (
                        <div className="menu-grid">
                            {items.map((item) => (
                                <MenuCard key={item.id} item={item} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
