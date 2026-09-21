'use client';
import { useEffect } from 'react';
import { FiX, FiPlus } from 'react-icons/fi';
import { getDishImage, formatCurrency } from '../lib/utils';

function DishDetailModal({ item, isOpen, onClose, onAddToCart }) {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen || !item) return null;

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button style={styles.closeBtn} onClick={onClose} aria-label="Đóng">
                    <FiX size={24} />
                </button>
                
                <div style={styles.imageContainer}>
                    <img 
                        src={getDishImage(item)} 
                        alt={item.name} 
                        style={styles.image}
                    />
                </div>
                
                <div style={styles.content}>
                    <div style={styles.header}>
                        <h2 style={styles.title}>{item.name}</h2>
                        <span style={styles.price}>{formatCurrency(item.price)}</span>
                    </div>
                    
                    {item.categories && (
                        <span style={styles.categoryBadge}>{item.categories.name}</span>
                    )}

                    <p style={styles.description}>
                        {item.full_description || item.description}
                    </p>

                    {item.ingredients && (
                        <div style={styles.section}>
                            <h3 style={styles.sectionTitle}>Nguyên liệu chính</h3>
                            <p style={styles.sectionText}>{item.ingredients}</p>
                        </div>
                    )}

                    <div style={styles.infoRow}>
                        {item.serves && (
                            <span style={styles.infoItem}>Phục vụ: {item.serves} người</span>
                        )}
                        {item.prep_time && (
                            <span style={styles.infoItem}>Thời gian chuẩn bị: {item.prep_time}</span>
                        )}
                    </div>

                    <button 
                        style={styles.addToCartBtn} 
                        onClick={() => {
                            if (onAddToCart) onAddToCart(item);
                            onClose();
                        }}
                    >
                        <FiPlus size={20} style={{ marginRight: '8px' }} />
                        Thêm vào giỏ tiệc
                    </button>
                </div>
            </div>
        </div>
    );
}

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(26, 26, 46, 0.7)',
        backdropFilter: 'blur(4px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
    },
    modal: {
        backgroundColor: 'var(--color-cream, #FFF8F0)',
        borderRadius: '12px',
        width: '100%',
        maxWidth: '600px',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    },
    closeBtn: {
        position: 'absolute',
        top: '16px',
        right: '16px',
        background: 'rgba(26, 26, 46, 0.5)',
        color: '#FFF8F0',
        border: 'none',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 10,
        transition: 'background 0.2s',
    },
    imageContainer: {
        width: '100%',
        height: '300px',
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    content: {
        padding: '2rem',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '0.5rem',
    },
    title: {
        fontFamily: "'Playfair Display', serif",
        fontSize: '1.75rem',
        color: 'var(--color-primary, #6B1D2A)',
        margin: 0,
        fontWeight: 600,
    },
    price: {
        fontSize: '1.25rem',
        fontWeight: 700,
        color: 'var(--color-gold, #D4A843)',
        marginLeft: '1rem',
    },
    categoryBadge: {
        display: 'inline-block',
        fontSize: '0.75rem',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        color: 'var(--color-gold, #D4A843)',
        fontWeight: 600,
        marginBottom: '1.5rem',
    },
    description: {
        fontSize: '1rem',
        lineHeight: 1.6,
        color: 'var(--color-dark, #1A1A2E)',
        marginBottom: '1.5rem',
    },
    section: {
        marginBottom: '1.5rem',
    },
    sectionTitle: {
        fontFamily: "'Playfair Display', serif",
        fontSize: '1.125rem',
        color: 'var(--color-primary, #6B1D2A)',
        marginBottom: '0.5rem',
    },
    sectionText: {
        fontSize: '0.95rem',
        color: 'var(--color-dark, #1A1A2E)',
    },
    infoRow: {
        display: 'flex',
        gap: '1.5rem',
        marginBottom: '2rem',
        padding: '1rem',
        backgroundColor: 'rgba(212, 168, 67, 0.1)',
        borderRadius: '8px',
    },
    infoItem: {
        fontSize: '0.9rem',
        color: 'var(--color-dark, #1A1A2E)',
        fontWeight: 500,
    },
    addToCartBtn: {
        width: '100%',
        padding: '1rem',
        backgroundColor: 'var(--color-primary, #6B1D2A)',
        color: '#FFF',
        border: 'none',
        borderRadius: '8px',
        fontSize: '1.1rem',
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'opacity 0.2s',
    },
};

export default DishDetailModal;
