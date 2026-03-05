import { useState, useEffect } from 'react';
import SectionTitle from '../components/SectionTitle';
import EventCard from '../components/EventCard';
import { getEvents } from '../api/client';

function Events() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    const fallbackEvents = [
        {
            id: 1,
            title: 'Birthday & Celebration Parties',
            slug: 'birthday-party',
            description: 'Celebrate life\'s special moments in an unforgettable setting. Our dedicated events team will craft a bespoke celebration experience with custom menus, stunning decorations, and impeccable service.',
            features: ['Customized party menus & cake', 'Private dining rooms (10-80 guests)', 'Professional DJ & sound system', 'Custom decorations & balloon arrangements', 'Dedicated event coordinator', 'Complimentary birthday dessert platter'],
        },
        {
            id: 2,
            title: 'Corporate Events & Galas',
            slug: 'corporate-event',
            description: 'Impress your clients and colleagues with sophisticated corporate dining. From intimate business dinners to grand company galas, we provide a refined atmosphere with state-of-the-art audiovisual equipment.',
            features: ['AV equipment & presentation screens', 'Customizable seating arrangements', 'Premium business lunch & dinner menus', 'Private networking spaces', 'Full bar service with custom cocktails', 'Valet parking available'],
        },
        {
            id: 3,
            title: 'Wedding Receptions',
            slug: 'wedding-reception',
            description: 'Say "I do" surrounded by elegance and romance. Cay Tung offers breathtaking indoor and outdoor wedding venues, world-class cuisine, and a dedicated wedding planning team to make your dream celebration a reality.',
            features: ['Indoor & outdoor ceremony spaces', 'Custom wedding menus & tasting sessions', 'Floral arrangements & décor styling', 'Professional wedding coordinator', 'Dance floor & live band setup', 'Honeymoon suite for the couple', 'Capacity up to 200 guests'],
        },
        {
            id: 4,
            title: 'Private Dining Experience',
            slug: 'private-dining',
            description: 'For those who seek exclusivity, our private dining rooms offer an intimate escape. Perfect for anniversaries, proposals, family reunions, or any occasion that calls for something extraordinary.',
            features: ['Exclusive private rooms (2-20 guests)', 'Personalized tasting menu by head chef', 'Sommelier-curated wine pairing', 'Candlelit ambiance & custom music', 'Dedicated wait staff', 'Custom dietary accommodations'],
        },
    ];

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await getEvents();
                setEvents(res.data.data || []);
            } catch (err) {
                console.error('Failed to fetch events:', err);
                setEvents(fallbackEvents);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    return (
        <>
            <div className="page-header">
                <div className="container">
                    <h1>Events & Celebrations</h1>
                    <div className="page-header__divider"></div>
                    <p>From intimate gatherings to grand celebrations, we create unforgettable experiences tailored to your vision.</p>
                </div>
            </div>

            <section className="section">
                <div className="container">
                    <SectionTitle
                        label="Our Services"
                        title="Create Lasting Memories"
                        description="Every event at Cay Tung is a masterpiece. Our dedicated team ensures every detail is perfect."
                    />

                    {loading ? (
                        <div className="grid-2">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="skeleton skeleton--card" style={{ height: '500px' }}></div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid-2">
                            {events.map((event) => (
                                <EventCard key={event.id} event={event} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Stats section */}
            <section className="section section--dark">
                <div className="container">
                    <div className="stats-bar">
                        <div className="stat">
                            <span className="stat__number">500+</span>
                            <span className="stat__label">Events Hosted</span>
                        </div>
                        <div className="stat">
                            <span className="stat__number">150+</span>
                            <span className="stat__label">Weddings</span>
                        </div>
                        <div className="stat">
                            <span className="stat__number">200</span>
                            <span className="stat__label">Max Capacity</span>
                        </div>
                        <div className="stat">
                            <span className="stat__number">98%</span>
                            <span className="stat__label">Satisfaction Rate</span>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Events;
