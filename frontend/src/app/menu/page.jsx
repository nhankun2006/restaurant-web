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
        { id: 1, name: 'Appetizers', slug: 'appetizers' },
        { id: 2, name: 'Main Course', slug: 'main-course' },
        { id: 3, name: 'Seafood', slug: 'seafood' },
        { id: 4, name: 'Drinks & Cocktails', slug: 'drinks' },
        { id: 5, name: 'Desserts', slug: 'desserts' },
    ];

    const fallbackItems = [
        { id: 1, name: 'Truffle Bruschetta', description: 'Toasted sourdough topped with black truffle cream, roasted tomatoes, and fresh basil drizzle.', price: 16.50, is_featured: true, category_id: 1, categories: { name: 'Appetizers', slug: 'appetizers' } },
        { id: 2, name: 'Seared Foie Gras', description: 'Pan-seared duck foie gras with fig compote, toasted brioche, and balsamic reduction.', price: 24.00, is_featured: false, category_id: 1, categories: { name: 'Appetizers', slug: 'appetizers' } },
        { id: 3, name: 'Caesar Salad', description: 'Crisp romaine hearts, aged parmesan shavings, house-made croutons, and classic Caesar dressing.', price: 14.00, is_featured: false, category_id: 1, categories: { name: 'Appetizers', slug: 'appetizers' } },
        { id: 4, name: 'Tuna Tartare', description: 'Fresh ahi tuna with avocado mousse, sesame crisps, and ponzu dressing.', price: 19.00, is_featured: true, category_id: 1, categories: { name: 'Appetizers', slug: 'appetizers' } },
        { id: 5, name: 'Wagyu Beef Tenderloin', description: 'A5 Wagyu tenderloin grilled to perfection, served with truffle mashed potatoes and red wine jus.', price: 58.00, is_featured: true, category_id: 2, categories: { name: 'Main Course', slug: 'main-course' } },
        { id: 6, name: 'Herb-Crusted Rack of Lamb', description: 'New Zealand rack of lamb with rosemary crust, roasted vegetables, and mint chimichurri.', price: 45.00, is_featured: true, category_id: 2, categories: { name: 'Main Course', slug: 'main-course' } },
        { id: 7, name: 'Wild Mushroom Risotto', description: 'Creamy arborio rice with porcini, chanterelle, and shiitake mushrooms finished with aged parmesan.', price: 28.00, is_featured: false, category_id: 2, categories: { name: 'Main Course', slug: 'main-course' } },
        { id: 8, name: 'Duck Confit', description: 'Slow-cooked duck leg confit with crispy skin, served with lentils du Puy and orange gastrique.', price: 36.00, is_featured: false, category_id: 2, categories: { name: 'Main Course', slug: 'main-course' } },
        { id: 9, name: 'Pan-Seared Sea Bass', description: 'Chilean sea bass with saffron beurre blanc, asparagus tips, and crushed fingerling potatoes.', price: 42.00, is_featured: true, category_id: 3, categories: { name: 'Seafood', slug: 'seafood' } },
        { id: 10, name: 'Lobster Thermidor', description: 'Whole Atlantic lobster baked with creamy Gruyère sauce, fresh herbs, and served with drawn butter.', price: 65.00, is_featured: true, category_id: 3, categories: { name: 'Seafood', slug: 'seafood' } },
        { id: 11, name: 'Grilled Octopus', description: 'Tender chargrilled octopus with smoked paprika, chickpea purée, and chorizo vinaigrette.', price: 32.00, is_featured: false, category_id: 3, categories: { name: 'Seafood', slug: 'seafood' } },
        { id: 12, name: 'Shrimp Scampi', description: 'Jumbo tiger prawns sautéed in garlic butter, white wine, and fresh herbs over angel hair pasta.', price: 34.00, is_featured: false, category_id: 3, categories: { name: 'Seafood', slug: 'seafood' } },
        { id: 13, name: 'Cay Tung Signature Martini', description: 'Our house martini with premium vodka, elderflower liqueur, fresh cucumber, and a hint of lime.', price: 18.00, is_featured: true, category_id: 4, categories: { name: 'Drinks & Cocktails', slug: 'drinks' } },
        { id: 14, name: 'Smoked Old Fashioned', description: 'Bourbon whiskey with demerara sugar, Angostura bitters, and applewood smoke.', price: 20.00, is_featured: false, category_id: 4, categories: { name: 'Drinks & Cocktails', slug: 'drinks' } },
        { id: 15, name: 'French 75', description: 'Classic champagne cocktail with London dry gin, fresh lemon juice, and simple syrup.', price: 16.00, is_featured: false, category_id: 4, categories: { name: 'Drinks & Cocktails', slug: 'drinks' } },
        { id: 16, name: 'Virgin Passion Mojito', description: 'Fresh passionfruit, mint leaves, lime, and soda water — a tropical refreshment without alcohol.', price: 12.00, is_featured: false, category_id: 4, categories: { name: 'Drinks & Cocktails', slug: 'drinks' } },
        { id: 17, name: 'Crème Brûlée', description: 'Classic Madagascar vanilla bean custard with a perfectly caramelized sugar crust.', price: 14.00, is_featured: true, category_id: 5, categories: { name: 'Desserts', slug: 'desserts' } },
        { id: 18, name: 'Chocolate Lava Cake', description: 'Rich dark Valrhona chocolate fondant with a molten center, served with vanilla bean ice cream.', price: 16.00, is_featured: true, category_id: 5, categories: { name: 'Desserts', slug: 'desserts' } },
        { id: 19, name: 'Tiramisu', description: 'Traditional Italian layers of espresso-soaked ladyfingers, mascarpone cream, and cocoa dusting.', price: 14.00, is_featured: false, category_id: 5, categories: { name: 'Desserts', slug: 'desserts' } },
        { id: 20, name: 'Seasonal Fruit Tart', description: 'Buttery pâte sucrée filled with pastry cream and topped with glazed fresh seasonal fruits.', price: 13.00, is_featured: false, category_id: 5, categories: { name: 'Desserts', slug: 'desserts' } },
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
                    <h1>Our Menu</h1>
                    <div className="page-header__divider"></div>
                    <p>A curated collection of culinary masterpieces, from farm-fresh appetizers to decadent desserts.</p>
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
                                No items found in this category.
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
