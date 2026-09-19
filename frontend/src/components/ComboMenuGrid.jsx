'use client';
import React from 'react';
import { FiCheck } from 'react-icons/fi';
import { useBanquetCart } from '../context/BanquetCartContext';

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

export default function ComboMenuGrid({ combos }) {
    const { state, dispatch } = useBanquetCart();
    const displayCombos = combos?.length > 0 ? combos : fallbackCombos;

    const isItemChecked = (comboId, sortOrder) => {
        return state.items.some(i => i.id === `combo-${comboId}-${sortOrder}`);
    };

    const toggleItem = (comboId, item) => {
        const itemId = `combo-${comboId}-${item.sort_order}`;
        if (isItemChecked(comboId, item.sort_order)) {
            dispatch({ type: 'REMOVE_ITEM', payload: itemId });
        } else {
            dispatch({ type: 'ADD_ITEM', payload: { id: itemId, name: item.item_name, price: 0, image_url: null } });
        }
    };

    const selectAll = (combo) => {
        combo.items.forEach(item => {
            const itemId = `combo-${combo.id}-${item.sort_order}`;
            if (!state.items.some(i => i.id === itemId)) {
                dispatch({ type: 'ADD_ITEM', payload: { id: itemId, name: item.item_name, price: 0, image_url: null } });
            }
        });
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(480px, 1fr))', gap: '2rem', padding: '1rem 0' }}>
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
                        backgroundColor: 'var(--color-gold, #D4A843)',
                        color: 'var(--color-dark, #1A1A2E)',
                        padding: '1rem',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: '1.25rem',
                    }}>
                        {combo.name.toUpperCase()}
                    </div>
                    <div style={{ padding: '0 1rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, flexGrow: 1 }}>
                            {combo.items?.sort((a, b) => a.sort_order - b.sort_order).map((item, index) => (
                                <li key={item.id} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '1rem 0',
                                    borderBottom: '1px solid #E5E7EB'
                                }}>
                                    <img 
                                        src={`https://placehold.co/60x60/1A1A2E/D4A843?text=${encodeURIComponent(item.item_name.substring(0,6))}`}
                                        alt={item.item_name}
                                        style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px', marginRight: '1rem' }}
                                    />
                                    <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                                        <span style={{ 
                                            color: 'var(--color-primary, #6B1D2A)', 
                                            fontWeight: 'bold', 
                                            marginRight: '0.5rem',
                                            minWidth: '24px'
                                        }}>
                                            {index + 1}.
                                        </span>
                                        <span style={{ fontWeight: '500', color: 'var(--color-dark, #1A1A2E)' }}>{item.item_name}</span>
                                    </div>
                                    <div 
                                        onClick={() => toggleItem(combo.id, item)}
                                        style={{ 
                                            width: '24px', 
                                            height: '24px', 
                                            borderRadius: '4px',
                                            border: '2px solid var(--color-gold, #D4A843)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                            backgroundColor: isItemChecked(combo.id, item.sort_order) ? 'var(--color-gold, #D4A843)' : 'transparent',
                                            marginLeft: '1rem'
                                        }}
                                    >
                                        {isItemChecked(combo.id, item.sort_order) && <FiCheck color="var(--color-dark, #1A1A2E)" />}
                                    </div>
                                </li>
                            ))}
                        </ul>
                        
                        <div style={{ padding: '1rem 0', marginTop: 'auto' }}>
                            <button 
                                onClick={() => selectAll(combo)}
                                style={{
                                    width: '100%',
                                    backgroundColor: 'var(--color-primary, #6B1D2A)',
                                    color: '#FFF',
                                    border: 'none',
                                    padding: '0.75rem',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    transition: 'background-color 0.2s',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--color-gold, #D4A843)'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--color-primary, #6B1D2A)'}
                            >
                                Chọn tất cả
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
