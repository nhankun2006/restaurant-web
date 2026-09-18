'use client';
import React from 'react';

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
    { id: 4, name: 'Menu 4', slug: 'menu-4', price: null, dish_count: 6, items: [
        { id: 19, item_name: 'Soup hải sản', sort_order: 1 },
        { id: 20, item_name: 'Gỏi sứa tôm thịt', sort_order: 2 },
        { id: 21, item_name: 'Đà điểu né bơ', sort_order: 3 },
        { id: 22, item_name: 'Gà bó xôi', sort_order: 4 },
        { id: 23, item_name: 'Lẩu cá bóp', sort_order: 5 },
        { id: 24, item_name: 'Bánh flan', sort_order: 6 },
    ]},
    { id: 5, name: 'Menu 5', slug: 'menu-5', price: null, dish_count: 6, items: [
        { id: 25, item_name: 'Khai vị 2 món (Chả giò, Nem nướng)', sort_order: 1 },
        { id: 26, item_name: 'Gỏi bò bóp thấu', sort_order: 2 },
        { id: 27, item_name: 'Mực xào sa tế', sort_order: 3 },
        { id: 28, item_name: 'Cá chẽm chưng tương', sort_order: 4 },
        { id: 29, item_name: 'Lẩu nấm hải sản', sort_order: 5 },
        { id: 30, item_name: 'Chè hạt sen', sort_order: 6 },
    ]}
];

export default function ComboMenuGrid({ combos, onSelectCombo }) {
    const displayCombos = combos?.length > 0 ? combos : fallbackCombos;

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem', padding: '1rem 0' }}>
            {displayCombos.map(combo => (
                <div key={combo.id} style={{
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: 'var(--color-cream, #FFF8F0)',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
                }}>
                    <div style={{
                        backgroundColor: 'var(--color-primary, #6B1D2A)',
                        color: 'var(--color-gold, #D4A843)',
                        padding: '1rem',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: '1.25rem',
                        borderBottom: '2px solid var(--color-gold, #D4A843)'
                    }}>
                        {combo.name}
                    </div>
                    <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, flexGrow: 1 }}>
                            {combo.items?.sort((a, b) => a.sort_order - b.sort_order).map((item, index) => (
                                <li key={item.id} style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'flex-start' }}>
                                    <span style={{ 
                                        color: 'var(--color-primary, #6B1D2A)', 
                                        fontWeight: 'bold', 
                                        marginRight: '0.5rem',
                                        minWidth: '24px'
                                    }}>
                                        {index + 1}.
                                    </span>
                                    <span>{item.item_name}</span>
                                </li>
                            ))}
                        </ul>
                        
                        <div style={{ 
                            marginTop: '1.5rem', 
                            textAlign: 'center', 
                            fontWeight: 'bold', 
                            fontSize: '1.1rem',
                            color: 'var(--color-primary, #6B1D2A)' 
                        }}>
                            {combo.price ? `${new Intl.NumberFormat('vi-VN').format(combo.price)}₫` : 'Liên hệ báo giá'}
                        </div>
                        
                        <button 
                            onClick={() => onSelectCombo(combo)}
                            style={{
                                marginTop: '1rem',
                                backgroundColor: 'var(--color-primary, #6B1D2A)',
                                color: '#FFF',
                                border: 'none',
                                padding: '0.75rem',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                transition: 'background-color 0.2s'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--color-gold, #D4A843)'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--color-primary, #6B1D2A)'}
                        >
                            Chọn combo này
                        </button>
                        
                        <p style={{ 
                            marginTop: '1rem', 
                            fontSize: '0.85rem', 
                            color: '#666', 
                            textAlign: 'center',
                            fontStyle: 'italic' 
                        }}>
                            * Quý khách có thể chọn tự do các món trong menu
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
