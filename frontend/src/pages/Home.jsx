import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import SectionTitle from '../components/SectionTitle';
import MenuCard from '../components/MenuCard';
import { getFeaturedItems } from '../api/client';
import { FiStar, FiAward, FiHeart } from 'react-icons/fi';

function Home() {
    const [featured, setFeatured] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const res = await getFeaturedItems();
                setFeatured(res.data.data || []);
            } catch (err) {
                console.error('Failed to fetch featured items:', err);
                // Show fallback data when API is not available
                setFeatured([
                    { id: 1, name: 'Truffle Bruschetta', description: 'Toasted sourdough topped with black truffle cream, roasted tomatoes, and fresh basil drizzle.', price: 16.50, is_featured: true, categories: { name: 'Appetizers' } },
                    { id: 2, name: 'Wagyu Beef Tenderloin', description: 'A5 Wagyu tenderloin grilled to perfection, served with truffle mashed potatoes and red wine jus.', price: 58.00, is_featured: true, categories: { name: 'Main Course' } },
                    { id: 3, name: 'Pan-Seared Sea Bass', description: 'Chilean sea bass with saffron beurre blanc, asparagus tips, and crushed fingerling potatoes.', price: 42.00, is_featured: true, categories: { name: 'Seafood' } },
                    { id: 4, name: 'Lobster Thermidor', description: 'Whole Atlantic lobster baked with creamy Gruyère sauce, fresh herbs, and served with drawn butter.', price: 65.00, is_featured: true, categories: { name: 'Seafood' } },
                    { id: 5, name: 'Chocolate Lava Cake', description: 'Rich dark Valrhona chocolate fondant with a molten center, served with vanilla bean ice cream.', price: 16.00, is_featured: true, categories: { name: 'Desserts' } },
                    { id: 6, name: 'Cay Tung Signature Martini', description: 'Our house martini with premium vodka, elderflower liqueur, fresh cucumber, and a hint of lime.', price: 18.00, is_featured: true, categories: { name: 'Drinks' } },
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetchFeatured();
    }, []);

    return (
        <>
            <Hero />

            {/* Featured Section */}
            <section className="section">
                <div className="container">
                    <SectionTitle
                        label="Our Selection"
                        title="Chef's Signature Dishes"
                        description="A curated selection of our most beloved creations, crafted with passion and the finest ingredients."
                    />
                    {loading ? (
                        <div className="featured-grid">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="skeleton skeleton--card"></div>
                            ))}
                        </div>
                    ) : (
                        <div className="featured-grid">
                            {featured.map((item, i) => (
                                <div key={item.id} className={`delay-${i + 1}`}>
                                    <MenuCard item={item} />
                                </div>
                            ))}
                        </div>
                    )}
                    <div style={{ textAlign: 'center', marginTop: 'var(--space-2xl)' }}>
                        <Link to="/menu" className="btn btn-primary">
                            View Full Menu
                        </Link>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="section section--dark">
                <div className="container">
                    <SectionTitle
                        label="Why Cay Tung"
                        title="An Unforgettable Experience"
                        description="Every detail is designed to create moments that linger long after the last course."
                    />
                    <div className="why-grid">
                        <div className="why-card">
                            <div className="why-card__icon"><FiAward /></div>
                            <h4 className="why-card__title">Award-Winning Cuisine</h4>
                            <p className="why-card__desc">
                                Our Michelin-starred chef team creates extraordinary dishes using only
                                the finest seasonal ingredients from trusted purveyors worldwide.
                            </p>
                        </div>
                        <div className="why-card">
                            <div className="why-card__icon"><FiStar /></div>
                            <h4 className="why-card__title">Impeccable Service</h4>
                            <p className="why-card__desc">
                                Our dedicated staff ensures every visit is seamless, from warm
                                welcomes to personalized attention throughout your dining experience.
                            </p>
                        </div>
                        <div className="why-card">
                            <div className="why-card__icon"><FiHeart /></div>
                            <h4 className="why-card__title">Timeless Ambiance</h4>
                            <p className="why-card__desc">
                                An atmosphere of refined elegance where modern sophistication meets
                                classic charm — the perfect backdrop for any occasion.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section" style={{ textAlign: 'center' }}>
                <div className="container">
                    <SectionTitle
                        label="Celebrate With Us"
                        title="Host Your Special Event"
                        description="From intimate dinners to grand celebrations, let us create an unforgettable experience for you and your guests."
                    />
                    <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link to="/events" className="btn btn-primary">
                            Explore Events
                        </Link>
                        <Link to="/booking" className="btn btn-outline" style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}>
                            Make a Reservation
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;
