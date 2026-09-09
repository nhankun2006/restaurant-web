function MenuCard({ item }) {
    const placeholderImage = `https://placehold.co/400x300/1A1A2E/D4A843?text=${encodeURIComponent(item.name)}`;

    return (
        <div className="card animate-fade-in-up">
            <div className="card__image-wrapper">
                {item.is_featured && <span className="card__badge">Đặc Sản Đầu Bếp</span>}
                <img
                    src={item.image_url || placeholderImage}
                    alt={item.name}
                    className="card__image"
                    onError={(e) => { e.target.src = placeholderImage; }}
                />
            </div>
            <div className="card__content">
                <h3 className="card__title">{item.name}</h3>
                <p className="card__description">{item.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="card__price">${Number(item.price).toFixed(2)}</span>
                    {item.categories && (
                        <span style={{
                            fontSize: '0.75rem',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            color: 'var(--color-gold)',
                            fontWeight: 600,
                        }}>
                            {item.categories.name}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MenuCard;
