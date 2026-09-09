import { FiCheck } from 'react-icons/fi';
import Link from 'next/link';

function EventCard({ event }) {
    const placeholderImage = `https://placehold.co/600x400/1A1A2E/D4A843?text=${encodeURIComponent(event.title)}`;
    const features = typeof event.features === 'string'
        ? JSON.parse(event.features)
        : event.features || [];

    return (
        <div className="event-card animate-fade-in-up">
            <div className="event-card__image-wrapper">
                <img
                    src={event.image_url || placeholderImage}
                    alt={event.title}
                    className="event-card__image"
                    onError={(e) => { e.target.src = placeholderImage; }}
                />
                <div className="event-card__overlay"></div>
            </div>
            <div className="event-card__content">
                <h3 className="event-card__title">{event.title}</h3>
                <p className="event-card__description">{event.description}</p>

                {features.length > 0 && (
                    <div className="event-card__features">
                        {features.slice(0, 4).map((feature, i) => (
                            <div key={i} className="event-card__feature">
                                <FiCheck className="event-card__feature-icon" />
                                <span>{feature}</span>
                            </div>
                        ))}
                        {features.length > 4 && (
                            <div className="event-card__feature" style={{ color: 'var(--color-gold)' }}>
                                <span>+ {features.length - 4} tiện ích khác</span>
                            </div>
                        )}
                    </div>
                )}

                <Link href="/booking" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                    Đặt Sự Kiện Này
                </Link>
            </div>
        </div>
    );
}

export default EventCard;
