'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { FiX, FiPlus, FiMinus, FiTrash2, FiShoppingCart } from 'react-icons/fi';
import { useBanquetCart } from '../context/BanquetCartContext';

export default function BanquetSidebar({ isOpen, onClose }) {
    const { state, dispatch, estimatedTotal } = useBanquetCart();

    // Prevent body scroll when sidebar is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    const handleIncrement = () => {
        if (state.tableCount < 50) {
            dispatch({ type: 'SET_TABLE_COUNT', payload: state.tableCount + 1 });
        }
    };

    const handleDecrement = () => {
        if (state.tableCount > 1) {
            dispatch({ type: 'SET_TABLE_COUNT', payload: state.tableCount - 1 });
        }
    };

    return (
        <>
            {/* Backdrop */}
            {isOpen && (
                <div 
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 9998,
                        transition: 'opacity 0.3s ease-in-out'
                    }}
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <div style={{
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                width: '100%',
                maxWidth: '400px',
                backgroundColor: '#fff',
                zIndex: 9999,
                transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
                transition: 'transform 0.3s ease-in-out',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '-4px 0 15px rgba(0,0,0,0.1)'
            }}>
                {/* Header */}
                <div style={{
                    padding: '1.25rem',
                    borderBottom: '1px solid #E5E7EB',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: 'var(--color-primary, #6B1D2A)',
                    color: '#fff'
                }}>
                    <h2 style={{ margin: 0, fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <FiShoppingCart /> Giỏ Tiệc
                    </h2>
                    <button 
                        onClick={onClose}
                        style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', padding: '4px' }}
                        aria-label="Close"
                    >
                        <FiX size={24} />
                    </button>
                </div>

                {/* Content */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem' }}>
                    {state.combo === null && state.items.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#666' }}>
                            <FiShoppingCart size={48} style={{ marginBottom: '1rem', opacity: 0.2 }} />
                            <p>Chưa có món nào. Hãy chọn món từ thực đơn!</p>
                        </div>
                    ) : (
                        <>
                            {/* Selected Combo */}
                            {state.combo && (
                                <div style={{ 
                                    border: '1px solid var(--color-gold, #D4A843)', 
                                    borderRadius: '8px', 
                                    padding: '1rem',
                                    marginBottom: '1rem',
                                    backgroundColor: 'var(--color-cream, #FFF8F0)'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                        <h3 style={{ margin: 0, color: 'var(--color-primary, #6B1D2A)', fontSize: '1.1rem' }}>
                                            {state.combo.name}
                                        </h3>
                                        <button 
                                            onClick={() => dispatch({ type: 'CLEAR_COMBO' })}
                                            style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer' }}
                                        >
                                            <FiTrash2 size={18} />
                                        </button>
                                    </div>
                                    <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.9rem', color: '#444' }}>
                                        {state.combo.items?.map(item => (
                                            <li key={item.id}>{item.item_name}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* A la carte Items */}
                            {state.items.length > 0 && (
                                <div style={{ marginBottom: '1rem' }}>
                                    <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem', color: '#333' }}>
                                        Món chọn thêm ({state.items.length})
                                    </h3>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                        {state.items.map((item, index) => (
                                            <li key={`${item.id}-${index}`} style={{ 
                                                display: 'flex', 
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                padding: '0.75rem 0',
                                                borderBottom: '1px solid #F3F4F6'
                                            }}>
                                                <div style={{ flex: 1, paddingRight: '1rem' }}>
                                                    <div style={{ fontWeight: '500' }}>{item.name}</div>
                                                    {item.price > 0 && (
                                                        <div style={{ fontSize: '0.85rem', color: '#666' }}>
                                                            {new Intl.NumberFormat('vi-VN').format(item.price)}₫
                                                        </div>
                                                    )}
                                                </div>
                                                <button 
                                                    onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}
                                                    style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '4px' }}
                                                >
                                                    <FiTrash2 size={18} />
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            
                            {/* Table Count */}
                            <div style={{ 
                                marginTop: '2rem',
                                padding: '1rem',
                                backgroundColor: '#F9FAFB',
                                borderRadius: '8px'
                            }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                                    Số bàn dự kiến
                                </label>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <button 
                                        onClick={handleDecrement}
                                        style={{ 
                                            width: '32px', height: '32px', 
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            border: '1px solid #D1D5DB', borderRadius: '4px',
                                            background: '#fff', cursor: 'pointer'
                                        }}
                                        disabled={state.tableCount <= 1}
                                    >
                                        <FiMinus />
                                    </button>
                                    <span style={{ fontSize: '1.1rem', fontWeight: 'bold', minWidth: '30px', textAlign: 'center' }}>
                                        {state.tableCount}
                                    </span>
                                    <button 
                                        onClick={handleIncrement}
                                        style={{ 
                                            width: '32px', height: '32px', 
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            border: '1px solid #D1D5DB', borderRadius: '4px',
                                            background: '#fff', cursor: 'pointer'
                                        }}
                                        disabled={state.tableCount >= 50}
                                    >
                                        <FiPlus />
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Footer */}
                <div style={{ 
                    padding: '1.25rem',
                    borderTop: '1px solid #E5E7EB',
                    backgroundColor: '#fff'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <span style={{ fontWeight: '500' }}>Tạm tính:</span>
                        <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--color-primary, #6B1D2A)' }}>
                            {new Intl.NumberFormat('vi-VN').format(estimatedTotal)}₫
                        </span>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <button 
                            onClick={() => dispatch({ type: 'CLEAR_CART' })}
                            style={{ 
                                flex: 1, 
                                padding: '0.75rem',
                                border: '1px solid #E5E7EB',
                                backgroundColor: '#fff',
                                borderRadius: '6px',
                                fontWeight: '500',
                                cursor: 'pointer',
                                transition: 'background-color 0.2s'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F3F4F6'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#fff'}
                        >
                            Xóa giỏ
                        </button>
                        <Link 
                            href="/dat-tiec"
                            style={{ 
                                flex: 2, 
                                padding: '0.75rem',
                                border: 'none',
                                backgroundColor: 'var(--color-primary, #6B1D2A)',
                                color: '#fff',
                                borderRadius: '6px',
                                fontWeight: 'bold',
                                textAlign: 'center',
                                textDecoration: 'none',
                                display: 'block'
                            }}
                            onClick={onClose}
                        >
                            Đặt Tiệc →
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
