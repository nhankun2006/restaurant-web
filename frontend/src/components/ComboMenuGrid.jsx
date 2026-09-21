'use client';

import { useMemo } from 'react';
import { FiPlus, FiX } from 'react-icons/fi';
import { useBanquetCart } from '../context/BanquetCartContext';
import { getDishImage, formatCurrency } from '../lib/utils';

const fallbackCombos = [
    {
        id: 'fallback-1', name: 'Menu 1', dish_count: 6,
        items: [
            { id: '1-1', item_name: 'Soup hải sản hột gà', sort_order: 1 },
            { id: '1-2', item_name: 'Gỏi ngó sen tôm thịt', sort_order: 2 },
            { id: '1-3', item_name: 'Nai né', sort_order: 3 },
            { id: '1-4', item_name: 'Bò nấu tiêu xanh', sort_order: 4 },
            { id: '1-5', item_name: 'Lẩu Thái hải sản', sort_order: 5 },
            { id: '1-6', item_name: 'Rau câu', sort_order: 6 },
        ],
    },
    {
        id: 'fallback-2', name: 'Menu 2', dish_count: 6,
        items: [
            { id: '2-1', item_name: 'Soup hải sản trứng cút', sort_order: 1 },
            { id: '2-2', item_name: 'Gỏi củ hủ dừa tôm thịt', sort_order: 2 },
            { id: '2-3', item_name: 'Bò né', sort_order: 3 },
            { id: '2-4', item_name: 'Mực hấp hành gừng', sort_order: 4 },
            { id: '2-5', item_name: 'Lẩu hải sản tươi sống', sort_order: 5 },
            { id: '2-6', item_name: 'Trái cây thập cẩm', sort_order: 6 },
        ],
    },
];

function normalizeDishName(value = '') {
    return value
        .toLocaleLowerCase('vi-VN')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/[^a-z0-9]+/g, ' ')
        .trim();
}

function findMatchingMenuItem(comboItem, menuItemsById, menuItems) {
    if (comboItem.menu_item_id && menuItemsById.get(comboItem.menu_item_id)) {
        return menuItemsById.get(comboItem.menu_item_id);
    }

    const comboName = normalizeDishName(comboItem.menu_item_name || comboItem.item_name);
    if (!comboName) return null;

    const exactMatch = menuItems.find(item => normalizeDishName(item.name) === comboName);
    if (exactMatch) return exactMatch;

    return menuItems.find(item => {
        const menuName = normalizeDishName(item.name);
        return menuName.length > 5 && (comboName.includes(menuName) || menuName.includes(comboName));
    }) || null;
}

function createCartItem(combo, comboItem, menuItemsById, menuItems) {
    const menuItem = findMatchingMenuItem(comboItem, menuItemsById, menuItems);
    const itemName = menuItem?.name || comboItem.menu_item_name || comboItem.item_name;

    return {
        id: menuItem?.id || comboItem.menu_item_id || `combo-${combo.id}-${comboItem.id}`,
        name: itemName,
        description: menuItem?.description || comboItem.menu_item_description || '',
        price: Number(menuItem?.price ?? comboItem.menu_item_price ?? 0),
        image_url: menuItem?.image_url || comboItem.menu_item_image_url || null,
        combo_source: combo.name,
    };
}

export default function ComboMenuGrid({ combos, menuItems = [] }) {
    const { state, dispatch } = useBanquetCart();
    const displayCombos = combos?.length > 0 ? combos : fallbackCombos;
    const selectedItemIds = useMemo(() => new Set(state.items.map(item => item.id)), [state.items]);
    const menuItemsById = useMemo(() => new Map(menuItems.map(item => [item.id, item])), [menuItems]);

    const getCartItem = (combo, comboItem) => createCartItem(combo, comboItem, menuItemsById, menuItems);

    const toggleItem = (combo, comboItem) => {
        const cartItem = getCartItem(combo, comboItem);
        const isSelected = selectedItemIds.has(cartItem.id);
        dispatch({ type: isSelected ? 'REMOVE_ITEM' : 'ADD_ITEM', payload: isSelected ? cartItem.id : cartItem });
    };

    const toggleCombo = (cartItems) => {
        const allSelected = cartItems.length > 0 && cartItems.every(item => selectedItemIds.has(item.id));
        dispatch({
            type: allSelected ? 'REMOVE_ITEMS' : 'ADD_ITEMS',
            payload: allSelected ? cartItems.map(item => item.id) : cartItems,
        });
    };

    return (
        <section aria-labelledby="combo-menu-heading">
            <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 1.5rem' }}>
                <h2 id="combo-menu-heading" style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Combo Tiệc</h2>
                <p style={{ color: 'var(--color-text-light)', margin: 0 }}>
                    Chọn nhanh cả combo hoặc tick từng món từ nhiều menu khác nhau. Mọi món được thêm vào cùng một thực đơn riêng của bạn.
                </p>
            </div>

            <div style={styles.grid}>
                {displayCombos.map(combo => {
                    const comboItems = [...(combo.items || [])].sort((a, b) => a.sort_order - b.sort_order);
                    const cartItems = comboItems.map(item => getCartItem(combo, item));
                    const selectedCount = cartItems.filter(item => selectedItemIds.has(item.id)).length;
                    const allSelected = cartItems.length > 0 && selectedCount === cartItems.length;

                    return (
                        <article key={combo.id} style={{ ...styles.card, borderColor: selectedCount > 0 ? 'var(--color-gold)' : '#E5E7EB' }}>
                            <header style={styles.header}>
                                <div>
                                    <p style={styles.eyebrow}>PRESET THỰC ĐƠN</p>
                                    <h3 style={styles.title}>{combo.name}</h3>
                                </div>
                                <span style={styles.count}>{comboItems.length} món</span>
                            </header>

                            <div style={styles.list}>
                                {comboItems.map((comboItem, index) => {
                                    const cartItem = cartItems[index];
                                    const isSelected = selectedItemIds.has(cartItem.id);

                                    return (
                                        <label key={comboItem.id} style={{ ...styles.item, backgroundColor: isSelected ? '#FFFBF0' : '#FFF' }}>
                                            <img
                                                src={getDishImage(cartItem)}
                                                alt=""
                                                aria-hidden="true"
                                                style={styles.thumbnail}
                                            />
                                            <span style={styles.itemContent}>
                                                <span style={styles.itemName}><b>{index + 1}.</b> {cartItem.name}</span>
                                                {cartItem.price > 0 && <span style={styles.itemPrice}>{formatCurrency(cartItem.price)}</span>}
                                            </span>
                                            <input
                                                type="checkbox"
                                                checked={isSelected}
                                                onChange={() => toggleItem(combo, comboItem)}
                                                aria-label={`Chọn ${cartItem.name}`}
                                                style={styles.checkbox}
                                            />
                                        </label>
                                    );
                                })}
                            </div>

                            <footer style={styles.footer}>
                                <span style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>
                                    {selectedCount > 0 ? `Đã chọn ${selectedCount}/${cartItems.length} món` : 'Chưa chọn món nào'}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => toggleCombo(cartItems)}
                                    disabled={cartItems.length === 0}
                                    style={styles.comboButton}
                                >
                                    {allSelected ? <FiX aria-hidden="true" /> : <FiPlus aria-hidden="true" />}
                                    {allSelected ? 'Bỏ chọn combo' : selectedCount > 0 ? `Thêm ${cartItems.length - selectedCount} món còn lại` : 'Chọn combo này'}
                                </button>
                            </footer>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}

const styles = {
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
        gap: '1.5rem',
    },
    card: {
        overflow: 'hidden',
        border: '1px solid',
        borderRadius: 'var(--radius-md)',
        backgroundColor: '#FFF',
        boxShadow: 'var(--shadow-sm)',
    },
    header: {
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem',
        padding: '1rem 1.25rem', background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))', color: '#FFF',
    },
    eyebrow: { margin: '0 0 0.2rem', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.09em', opacity: 0.8 },
    title: { margin: 0, color: '#FFF', fontSize: '1.3rem' },
    count: { flexShrink: 0, padding: '0.25rem 0.55rem', borderRadius: '999px', backgroundColor: 'rgba(255,255,255,0.16)', fontSize: '0.8rem', fontWeight: 700 },
    list: { display: 'flex', flexDirection: 'column' },
    item: {
        display: 'grid', gridTemplateColumns: '64px minmax(0, 1fr) 22px', alignItems: 'center', gap: '0.8rem',
        padding: '0.65rem 1rem', borderBottom: '1px solid #F0F0F2', cursor: 'pointer',
    },
    thumbnail: { width: '64px', height: '56px', borderRadius: '6px', objectFit: 'cover', backgroundColor: '#F5EDE0' },
    itemContent: { display: 'flex', flexDirection: 'column', gap: '0.18rem', minWidth: 0 },
    itemName: { color: 'var(--color-dark)', fontSize: '0.92rem', fontWeight: 500, lineHeight: 1.35 },
    itemPrice: { color: 'var(--color-text-light)', fontSize: '0.78rem' },
    checkbox: { width: '20px', height: '20px', accentColor: 'var(--color-primary)', cursor: 'pointer' },
    footer: { display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', padding: '1rem' },
    comboButton: {
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', padding: '0.65rem 0.85rem',
        borderRadius: '6px', backgroundColor: 'var(--color-gold)', color: 'var(--color-dark)', fontSize: '0.84rem', fontWeight: 700,
    },
};
