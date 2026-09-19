'use client';

import React, { useState, useEffect } from 'react';
import { getCategories, getMenuItems, getComboMenus } from '../../api/client';
import MenuCard from '../../components/MenuCard';
import DishDetailModal from '../../components/DishDetailModal';
import ComboMenuGrid from '../../components/ComboMenuGrid';
import BanquetSidebar from '../../components/BanquetSidebar';
import FloatingCartButton from '../../components/FloatingCartButton';
import { useBanquetCart } from '../../context/BanquetCartContext';


const fallbackCombos = [
    { id: 1, name: 'Menu 1', slug: 'menu-1', price: null, dish_count: 6, items: [
        { id: 1, item_name: 'Soup hải sản hột gà', sort_order: 1 },
        { id: 2, item_name: 'Gỏi ngó sen tôm thịt', sort_order: 2 },
        { id: 3, item_name: 'Nai né', sort_order: 3 },
        { id: 4, item_name: 'Bò nấu tiêu xanh', sort_order: 4 },
        { id: 5, item_name: 'Lẩu thái hải sản', sort_order: 5 },
        { id: 6, item_name: 'Rau câu', sort_order: 6 },
    ]},
    { id: 2, name: 'Menu 2', slug: 'menu-2', price: null, dish_count: 6, items: [
        { id: 7, item_name: 'Soup hải sản trứng cút', sort_order: 1 },
        { id: 8, item_name: 'Gỏi củ hủ dừa tôm thịt', sort_order: 2 },
        { id: 9, item_name: 'Bò né', sort_order: 3 },
        { id: 10, item_name: 'Mực hấp hành gừng', sort_order: 4 },
        { id: 11, item_name: 'Lẩu hải sản tươi sống', sort_order: 5 },
        { id: 12, item_name: 'Trái cây thập cẩm', sort_order: 6 },
    ]},
    { id: 3, name: 'Menu 3', slug: 'menu-3', price: null, dish_count: 6, items: [
        { id: 13, item_name: 'Soup bắp cua gà xé', sort_order: 1 },
        { id: 14, item_name: 'Gỏi tiến vua tôm thịt', sort_order: 2 },
        { id: 15, item_name: 'Mực hấp gừng', sort_order: 3 },
        { id: 16, item_name: 'Diêu hồng chiên xù', sort_order: 4 },
        { id: 17, item_name: 'Lẩu thái hải sản chua cay', sort_order: 5 },
        { id: 18, item_name: 'Trái cây', sort_order: 6 },
    ]},
];

export default function MenuPage() {
    const [activeTab, setActiveTab] = useState('menu');
    const [categories, setCategories] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [combos, setCombos] = useState([]);
    const [activeCategory, setActiveCategory] = useState('all');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Modal & Sidebar state
    const [selectedItem, setSelectedItem] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    
    // Cart Context
    const { dispatch, totalItems } = useBanquetCart();

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                setLoading(true);
                // Fetch Categories
                try {
                    const catRes = await getCategories();
                    setCategories(catRes.data.data || []);
                } catch (e) {
                    console.error("Failed to fetch categories", e);
                    setCategories([{ slug: 'khai-vi', name: 'Khai Vị' }, { slug: 'mon-chinh', name: 'Món Chính' }]);
                }
                
                // Fetch Combos
                try {
                    const comboRes = await getComboMenus();
                    setCombos(comboRes.data.data || fallbackCombos);
                } catch (e) {
                    console.error("Failed to fetch combos", e);
                    setCombos(fallbackCombos);
                }
                
                // Fetch Menu Items
                const itemsRes = await getMenuItems();
                setMenuItems(itemsRes.data.data || []);
            } catch (err) {
                console.error("Error fetching menu page data:", err);
                setError("Có lỗi xảy ra khi tải thực đơn. Vui lòng thử lại sau.");
                // Fallback for menu items
                setMenuItems([
                    { id: 1, name: 'Gỏi ngó sen tôm thịt', price: 150000, description: 'Gỏi ngó sen tôm thịt thanh mát.', category_id: 1, category_slug: 'khai-vi' },
                    { id: 2, name: 'Bò nấu tiêu xanh', price: 250000, description: 'Bò nấu tiêu xanh thơm ngon.', category_id: 2, category_slug: 'mon-chinh' }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchInitialData();
    }, []);

    useEffect(() => {
        const fetchItemsByCategory = async () => {
            setLoading(true);
            try {
                const res = await getMenuItems(activeCategory === 'all' ? null : activeCategory);
                setMenuItems(res.data.data || []);
            } catch (err) {
                console.error("Error fetching filtered menu items:", err);
            } finally {
                setLoading(false);
            }
        };

        if (!loading && activeTab === 'menu') {
            fetchItemsByCategory();
        }
    }, [activeCategory, activeTab]);

    const handleAddToCart = (item) => {
        dispatch({ type: 'ADD_ITEM', payload: item });
        if (showModal) {
            setShowModal(false);
        }
    };

    const handleSelectCombo = (combo) => {
        dispatch({ type: 'SET_COMBO', payload: combo });
    };

    const handleItemClick = (item) => {
        setSelectedItem(item);
        setShowModal(true);
    };

    return (
        <div className="menu-page">
            <div className="page-header">
                <div className="container">
                    <h1>Thực Đơn</h1>
                    <div className="page-header__divider"></div>
                    <p>Khám phá phong vị ẩm thực đặc sắc từ các món ăn truyền thống đến hiện đại</p>
                </div>
            </div>

            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
                {/* Tabs */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
                    <button 
                        onClick={() => setActiveTab('menu')}
                        style={{
                            padding: '0.75rem 1.5rem',
                            border: '1px solid var(--color-primary, #6B1D2A)',
                            backgroundColor: activeTab === 'menu' ? 'var(--color-primary, #6B1D2A)' : '#fff',
                            color: activeTab === 'menu' ? '#fff' : 'var(--color-primary, #6B1D2A)',
                            borderRadius: '8px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        🍽️ Thực Đơn
                    </button>
                    <button 
                        onClick={() => setActiveTab('combo')}
                        style={{
                            padding: '0.75rem 1.5rem',
                            border: '1px solid var(--color-primary, #6B1D2A)',
                            backgroundColor: activeTab === 'combo' ? 'var(--color-primary, #6B1D2A)' : '#fff',
                            color: activeTab === 'combo' ? '#fff' : 'var(--color-primary, #6B1D2A)',
                            borderRadius: '8px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        📦 Combo Tiệc
                    </button>
                </div>

                {error && <div style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>{error}</div>}

                {/* Content Area */}
                {activeTab === 'menu' && (
                    <>
                        {/* Category Filter */}
                        <div className="category-filter" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem', justifyContent: 'center' }}>
                            <button 
                                onClick={() => setActiveCategory('all')}
                                style={{
                                    padding: '0.5rem 1rem',
                                    borderRadius: '20px',
                                    border: '1px solid #E5E7EB',
                                    backgroundColor: activeCategory === 'all' ? 'var(--color-gold, #D4A843)' : '#fff',
                                    color: activeCategory === 'all' ? '#fff' : '#333',
                                    cursor: 'pointer'
                                }}
                            >
                                Tất cả
                            </button>
                            {categories.map(cat => (
                                <button 
                                    key={cat.slug}
                                    onClick={() => setActiveCategory(cat.slug)}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        borderRadius: '20px',
                                        border: '1px solid #E5E7EB',
                                        backgroundColor: activeCategory === cat.slug ? 'var(--color-gold, #D4A843)' : '#fff',
                                        color: activeCategory === cat.slug ? '#fff' : '#333',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>

                        {/* Menu Grid */}
                        {loading ? (
                            <div style={{ textAlign: 'center', padding: '3rem' }}>Đang tải...</div>
                        ) : (
                            <div className="menu-grid" style={{ 
                                display: 'grid', 
                                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
                                gap: '1.5rem' 
                            }}>
                                {menuItems.map(item => (
                                    <MenuCard 
                                        key={item.id} 
                                        item={item} 
                                        onClick={() => handleItemClick(item)}
                                        onAddToCart={() => handleAddToCart(item)}
                                    />
                                ))}
                                {menuItems.length === 0 && !loading && (
                                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem', color: '#666' }}>
                                        Không tìm thấy món ăn nào trong danh mục này.
                                    </div>
                                )}
                            </div>
                        )}
                    </>
                )}

                {activeTab === 'combo' && (
                    <ComboMenuGrid combos={combos} onSelectCombo={handleSelectCombo} />
                )}
            </div>

            {/* Modals and Sidebars */}
            <DishDetailModal 
                item={selectedItem} 
                isOpen={showModal} 
                onClose={() => setShowModal(false)}
                onAddToCart={() => handleAddToCart(selectedItem)}
            />

            <BanquetSidebar 
                isOpen={showSidebar} 
                onClose={() => setShowSidebar(false)} 
            />

            {totalItems > 0 && (
                <FloatingCartButton 
                    itemCount={totalItems} 
                    onClick={() => setShowSidebar(true)} 
                />
            )}
        </div>
    );
}
