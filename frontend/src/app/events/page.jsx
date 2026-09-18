'use client';

import { useState } from 'react';

const galleryItems = [
    { id: 1, title: 'Tiệc Cưới Gia Đình Nguyễn', category: 'wedding', image: null, description: 'Tiệc cưới 30 bàn tại nhà với khung rạp sang trọng' },
    { id: 2, title: 'Sinh Nhật Bé Minh', category: 'birthday', image: null, description: 'Tiệc sinh nhật tròn 1 tuổi ấm cúng' },
    { id: 3, title: 'Tân Gia Anh Hùng', category: 'housewarming', image: null, description: 'Tiệc tân gia 20 bàn, thực đơn đặc biệt' },
    { id: 4, title: 'Liên Hoan Công Ty ABC', category: 'corporate', image: null, description: 'Tiệc tất niên cuối năm 50 bàn' },
    { id: 5, title: 'Đám Giỗ Gia Đình Trần', category: 'memorial', image: null, description: 'Đám giỗ trang trọng 15 bàn' },
    { id: 6, title: 'Khai Trương Shop Hoa', category: 'opening', image: null, description: 'Tiệc khai trương vui nhộn, sôi động' },
    { id: 7, title: 'Tiệc Cưới Cô Linh & Anh Tuấn', category: 'wedding', image: null, description: 'Tiệc cưới ngoài trời 40 bàn' },
    { id: 8, title: 'Đầy Tháng Bé An', category: 'baby', image: null, description: 'Tiệc thôi nôi 10 bàn' },
    { id: 9, title: 'Đám Hỏi Nhà Hảo', category: 'engagement', image: null, description: 'Lễ đám hỏi truyền thống' },
];

const categories = [
    { id: 'all', label: 'Tất Cả' },
    { id: 'wedding', label: 'Tiệc Cưới' },
    { id: 'housewarming', label: 'Tiệc Tân Gia' },
    { id: 'birthday', label: 'Tiệc Sinh Nhật' },
    { id: 'baby', label: 'Tiệc Thôi Nôi' },
    { id: 'memorial', label: 'Tiệc Đám Giỗ' },
    { id: 'opening', label: 'Tiệc Khai Trương' },
    { id: 'corporate', label: 'Tiệc Công ty' },
    { id: 'engagement', label: 'Tiệc Đám Hỏi' }
];

export default function GalleryPage() {
    const [activeCategory, setActiveCategory] = useState('all');

    const filteredItems = activeCategory === 'all' 
        ? galleryItems 
        : galleryItems.filter(item => item.category === activeCategory);

    return (
        <>
            <div className="page-header" style={{ padding: '120px 0 60px', backgroundColor: 'var(--color-dark)', color: 'white', textAlign: 'center' }}>
                <div className="container">
                    <h1 style={{ color: 'var(--color-gold)', marginBottom: '20px' }}>Gallery</h1>
                    <div style={{ width: '60px', height: '3px', backgroundColor: 'var(--color-primary)', margin: '0 auto 20px' }}></div>
                    <p style={{ fontSize: '1.2rem', color: '#ccc' }}>Những Khoảnh Khắc Đáng Nhớ</p>
                </div>
            </div>

            <section className="section" style={{ padding: '60px 0' }}>
                <div className="container">
                    {/* Filter Tabs */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', marginBottom: '40px' }}>
                        {categories.map(cat => (
                            <button 
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                style={{
                                    padding: '8px 20px',
                                    borderRadius: '30px',
                                    border: `1px solid ${activeCategory === cat.id ? 'var(--color-primary)' : '#ddd'}`,
                                    backgroundColor: activeCategory === cat.id ? 'var(--color-primary)' : 'transparent',
                                    color: activeCategory === cat.id ? 'white' : 'inherit',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    {/* Photo Grid */}
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
                        gap: '30px' 
                    }}>
                        {filteredItems.map(item => (
                            <div key={item.id} style={{
                                borderRadius: '12px',
                                overflow: 'hidden',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                                backgroundColor: 'white'
                            }}>
                                <img 
                                    src={`https://placehold.co/600x400/1A1A2E/D4A843?text=${encodeURIComponent(item.title)}`} 
                                    alt={item.title}
                                    style={{ width: '100%', height: '250px', objectFit: 'cover', display: 'block' }}
                                />
                                <div style={{ padding: '20px' }}>
                                    <span style={{ 
                                        display: 'inline-block', 
                                        padding: '4px 12px', 
                                        backgroundColor: 'var(--color-cream)', 
                                        color: 'var(--color-primary)',
                                        borderRadius: '20px',
                                        fontSize: '0.85rem',
                                        fontWeight: '600',
                                        marginBottom: '10px'
                                    }}>
                                        {categories.find(c => c.id === item.category)?.label}
                                    </span>
                                    <h3 style={{ margin: '0 0 10px 0', fontSize: '1.25rem' }}>{item.title}</h3>
                                    <p style={{ margin: 0, color: '#666', fontSize: '0.95rem' }}>{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats section */}
            <section className="section section--dark" style={{ backgroundColor: 'var(--color-dark)', padding: '60px 0', color: 'white' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px', textAlign: 'center' }}>
                        <div className="stat">
                            <span style={{ display: 'block', fontSize: '3rem', fontWeight: 'bold', color: 'var(--color-gold)' }}>500+</span>
                            <span style={{ fontSize: '1.1rem', color: '#ccc' }}>Sự Kiện Đã Tổ Chức</span>
                        </div>
                        <div className="stat">
                            <span style={{ display: 'block', fontSize: '3rem', fontWeight: 'bold', color: 'var(--color-gold)' }}>150+</span>
                            <span style={{ fontSize: '1.1rem', color: '#ccc' }}>Tiệc Cưới</span>
                        </div>
                        <div className="stat">
                            <span style={{ display: 'block', fontSize: '3rem', fontWeight: 'bold', color: 'var(--color-gold)' }}>200</span>
                            <span style={{ fontSize: '1.1rem', color: '#ccc' }}>Sức Chứa Tối Đa</span>
                        </div>
                        <div className="stat">
                            <span style={{ display: 'block', fontSize: '3rem', fontWeight: 'bold', color: 'var(--color-gold)' }}>98%</span>
                            <span style={{ fontSize: '1.1rem', color: '#ccc' }}>Mức Độ Hài Lòng</span>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
