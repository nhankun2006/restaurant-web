'use client';
import { FiPlus } from 'react-icons/fi';
import { useState } from 'react';

function MenuCard({ item, onClick, onAddToCart }) {
    const [isHovered, setIsHovered] = useState(false);
    const placeholderImage = `https://placehold.co/400x300/1A1A2E/D4A843?text=${encodeURIComponent(item.name)}`;
    const formattedPrice = new Intl.NumberFormat('vi-VN').format(Number(item.price)) + '₫';

    return (
        <div 
            className="card animate-fade-in-up" 
            onClick={() => onClick && onClick(item)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ cursor: 'pointer', position: 'relative' }}
        >
            <div className="card__image-wrapper" style={{ position: 'relative' }}>
                {item.is_featured && <span className="card__badge">Đặc Sản Đầu Bếp</span>}
                <img 
                    src={item.image_url || placeholderImage} 
                    alt={item.name} 
                    className="card__image" 
                    onError={(e) => { e.target.src = placeholderImage; }} 
                />
                
                {isHovered && onAddToCart && (
                    <button
                        style={styles.addButton}
                        onClick={(e) => {
                            e.stopPropagation();
                            onAddToCart(item);
                        }}
                        aria-label="Thêm vào giỏ tiệc"
                    >
                        <FiPlus size={24} />
                    </button>
                )}
            </div>
            <div className="card__content">
                <h3 className="card__title">{item.name}</h3>
                <p className="card__description">{item.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="card__price">{formattedPrice}</span>
                    {item.categories && (
                        <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-gold)', fontWeight: 600 }}>
                            {item.categories.name}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

const styles = {
    addButton: {
        position: 'absolute',
        top: '12px',
        right: '12px',
        backgroundColor: 'var(--color-primary, #6B1D2A)',
        color: '#FFF',
        border: 'none',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
        zIndex: 10,
        transition: 'transform 0.2s',
    }
};

export default MenuCard;
