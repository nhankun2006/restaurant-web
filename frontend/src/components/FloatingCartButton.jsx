'use client';
import { FiShoppingCart } from 'react-icons/fi';
import { useEffect, useState } from 'react';

function FloatingCartButton({ itemCount, onClick }) {
    const [pulse, setPulse] = useState(false);

    useEffect(() => {
        if (itemCount > 0) {
            setPulse(true);
            const timer = setTimeout(() => setPulse(false), 300);
            return () => clearTimeout(timer);
        }
    }, [itemCount]);

    if (itemCount === 0) return null;

    return (
        <button 
            style={{...styles.button, transform: pulse ? 'scale(1.1)' : 'scale(1)'}} 
            onClick={onClick}
            aria-label="Xem giỏ tiệc"
        >
            <FiShoppingCart size={24} />
            <span style={styles.badge}>{itemCount}</span>
        </button>
    );
}

const styles = {
    button: {
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        backgroundColor: 'var(--color-gold, #D4A843)',
        color: 'var(--color-dark, #1A1A2E)',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
        cursor: 'pointer',
        zIndex: 1000,
        transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    },
    badge: {
        position: 'absolute',
        top: '-5px',
        right: '-5px',
        backgroundColor: 'var(--color-primary, #6B1D2A)',
        color: '#FFF',
        fontSize: '0.8rem',
        fontWeight: 700,
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px solid var(--color-cream, #FFF8F0)',
    }
};

export default FloatingCartButton;
