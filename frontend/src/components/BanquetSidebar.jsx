'use client';
import React from 'react';
import Link from 'next/link';
import { FiX, FiPlus, FiMinus, FiTrash2, FiShoppingCart } from 'react-icons/fi';
import { useBanquetCart } from '../context/BanquetCartContext';
import { getDishImage } from '../lib/menuImages';

export default function BanquetSidebar({ isOpen, onClose }) {
    const { state, dispatch, estimatedTotal } = useBanquetCart();

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
        <div style={{
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            width: '360px',
            maxWidth: '90vw',
            backgroundColor: '#fff',
            zIndex: 900,
            transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform 0.3s ease-in-out',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: isOpen ? '-4px 0 25px rgba(0,0,0,0.15)' : 'none',
            borderLeft: '1px solid #E5E7EB',
        }}>
            {/* Header */}
            <div style={{
                padding: '1rem 1.25rem',
                borderBottom: '1px solid #E5E7EB',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: 'var(--color-primary, #6B1D2A)',
                color: '#fff',
                minHeight: '60px',
            }}>
                <h2 style={{ margin: 0, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FiShoppingCart /> Giỏ Tiệc
                </h2>
                <button
                    onClick={onClose}
                    style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', padding: '4px' }}
                    aria-label="Close"
                >
                    <FiX size={22} />
                </button>
            </div>

            {/* Content */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
                {state.items.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '2rem 1rem', color: '#999' }}>
                        <FiShoppingCart size={36} style={{ marginBottom: '0.75rem', opacity: 0.3 }} />
                        <p style={{ margin: 0, fontSize: '0.95rem' }}>Chưa có món nào.<br />Hãy chọn món từ thực đơn!</p>
                    </div>
                ) : (
                    <>
                        {state.items.length > 0 && (
                            <div style={{ marginBottom: '0.75rem' }}>
                                <h3 style={{ fontSize: '0.95rem', marginBottom: '0.5rem', color: '#333' }}>
                                    Thực đơn đã chọn ({state.items.length})
                                </h3>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                    {state.items.map((item, index) => (
                                        <li key={`${item.id}-${index}`} style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            padding: '0.5rem 0',
                                            borderBottom: '1px solid #F3F4F6'
                                        }}>
                                            <img
                                                src={getDishImage(item)}
                                                alt=""
                                                aria-hidden="true"
                                                style={{ width: '44px', height: '40px', objectFit: 'cover', borderRadius: '4px', marginRight: '0.6rem' }}
                                            />
                                            <div style={{ flex: 1, paddingRight: '0.5rem' }}>
                                                <div style={{ fontWeight: '500', fontSize: '0.9rem' }}>{item.name}</div>
                                                {item.price > 0 && (
                                                    <div style={{ fontSize: '0.8rem', color: '#888' }}>
                                                        {new Intl.NumberFormat('vi-VN').format(item.price)}₫
                                                    </div>
                                                )}
                                            </div>
                                            <button
                                                onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}
                                                style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '2px' }}
                                            >
                                                <FiTrash2 size={16} />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div style={{
                            padding: '0.75rem',
                            backgroundColor: '#F9FAFB',
                            borderRadius: '8px',
                            marginTop: '0.5rem',
                        }}>
                            <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '500', fontSize: '0.9rem' }}>
                                Số bàn dự kiến
                            </label>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <button
                                    onClick={handleDecrement}
                                    style={{
                                        width: '30px', height: '30px',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        border: '1px solid #D1D5DB', borderRadius: '4px',
                                        background: '#fff', cursor: 'pointer'
                                    }}
                                    disabled={state.tableCount <= 1}
                                >
                                    <FiMinus size={14} />
                                </button>
                                <span style={{ fontSize: '1.1rem', fontWeight: 'bold', minWidth: '28px', textAlign: 'center' }}>
                                    {state.tableCount}
                                </span>
                                <button
                                    onClick={handleIncrement}
                                    style={{
                                        width: '30px', height: '30px',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        border: '1px solid #D1D5DB', borderRadius: '4px',
                                        background: '#fff', cursor: 'pointer'
                                    }}
                                    disabled={state.tableCount >= 50}
                                >
                                    <FiPlus size={14} />
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Footer */}
            <div style={{
                padding: '1rem 1.25rem',
                borderTop: '1px solid #E5E7EB',
                backgroundColor: '#fff'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={{ fontWeight: '500', fontSize: '0.9rem' }}>Tạm tính:</span>
                    <span style={{ fontSize: '1.15rem', fontWeight: 'bold', color: 'var(--color-primary, #6B1D2A)' }}>
                        {new Intl.NumberFormat('vi-VN').format(estimatedTotal)}₫
                    </span>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                        onClick={() => dispatch({ type: 'CLEAR_CART' })}
                        style={{
                            flex: 1,
                            padding: '0.6rem',
                            border: '1px solid #E5E7EB',
                            backgroundColor: '#fff',
                            borderRadius: '6px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                        }}
                    >
                        Xóa giỏ
                    </button>
                    <Link
                        href="/dat-tiec?step=2"
                        style={{
                            flex: 2,
                            padding: '0.6rem',
                            border: 'none',
                            backgroundColor: 'var(--color-primary, #6B1D2A)',
                            color: '#fff',
                            borderRadius: '6px',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            textDecoration: 'none',
                            display: 'block',
                            fontSize: '0.9rem',
                        }}
                        onClick={onClose}
                    >
                        Đặt Tiệc →
                    </Link>
                </div>
            </div>
        </div>
    );
}
