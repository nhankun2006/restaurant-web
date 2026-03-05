import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';
import { FiAward, FiUsers, FiHeart, FiStar } from 'react-icons/fi';

function About() {
    return (
        <>
            <div className="page-header">
                <div className="container">
                    <h1>About Cay Tung</h1>
                    <div className="page-header__divider"></div>
                    <p>A legacy of culinary excellence and heartfelt hospitality since 1987.</p>
                </div>
            </div>

            {/* Our Story */}
            <section className="section">
                <div className="container">
                    <div className="about-story">
                        <div>
                            <img
                                src="/images/hero-banner.png"
                                alt="Cay Tung restaurant interior"
                                className="about-story__image"
                            />
                        </div>
                        <div className="about-story__text">
                            <SectionTitle label="Our Story" title="A Tradition of Excellence" />
                            <p>
                                Founded in 1987 by Chef Antoine Dubois, Cay Tung began as a small
                                Parisian-inspired bistro with a dream: to bring the essence of French
                                culinary artistry to the heart of Beverly Hills.
                            </p>
                            <p>
                                Over three decades later, that dream has blossomed into one of the
                                most celebrated fine dining destinations on the West Coast. Our kitchen
                                team, led by Executive Chef Marie Laurent, continues to honor Chef
                                Dubois's vision while pushing the boundaries of contemporary gastronomy.
                            </p>
                            <p>
                                Every dish at Cay Tung tells a story — of flavors discovered in
                                sun-drenched Mediterranean markets, of techniques perfected over
                                generations, and of an unwavering commitment to excellence that
                                transforms every meal into an unforgettable experience.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="section section--dark">
                <div className="container">
                    <div className="stats-bar">
                        <div className="stat">
                            <span className="stat__number">37+</span>
                            <span className="stat__label">Years of Excellence</span>
                        </div>
                        <div className="stat">
                            <span className="stat__number">3</span>
                            <span className="stat__label">Michelin Stars</span>
                        </div>
                        <div className="stat">
                            <span className="stat__number">50K+</span>
                            <span className="stat__label">Happy Guests</span>
                        </div>
                        <div className="stat">
                            <span className="stat__number">120+</span>
                            <span className="stat__label">Menu Creations</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className="section">
                <div className="container">
                    <SectionTitle
                        label="Our Philosophy"
                        title="What Drives Us"
                        description="At Cay Tung, every decision is guided by our core values."
                    />
                    <div className="grid-4" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '2.5rem', color: 'var(--color-gold)', marginBottom: 'var(--space-md)' }}>
                                <FiAward />
                            </div>
                            <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: 'var(--space-sm)' }}>Quality</h4>
                            <p style={{ color: 'var(--color-text-light)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                                Only the finest ingredients make it to our kitchen. We source locally and globally for perfection.
                            </p>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '2.5rem', color: 'var(--color-gold)', marginBottom: 'var(--space-md)' }}>
                                <FiHeart />
                            </div>
                            <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: 'var(--space-sm)' }}>Passion</h4>
                            <p style={{ color: 'var(--color-text-light)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                                Every dish is crafted with love, creativity, and decades of culinary expertise.
                            </p>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '2.5rem', color: 'var(--color-gold)', marginBottom: 'var(--space-md)' }}>
                                <FiUsers />
                            </div>
                            <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: 'var(--space-sm)' }}>Community</h4>
                            <p style={{ color: 'var(--color-text-light)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                                We believe in building lasting relationships with our guests, purveyors, and team.
                            </p>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '2.5rem', color: 'var(--color-gold)', marginBottom: 'var(--space-md)' }}>
                                <FiStar />
                            </div>
                            <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: 'var(--space-sm)' }}>Innovation</h4>
                            <p style={{ color: 'var(--color-text-light)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                                While honoring tradition, we constantly explore new flavors, techniques, and presentations.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section section--dark" style={{ textAlign: 'center' }}>
                <div className="container">
                    <SectionTitle
                        label="Join Us"
                        title="Experience Cay Tung"
                        description="We invite you to discover why Cay Tung has been Beverly Hills' most beloved dining destination for over three decades."
                    />
                    <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link to="/booking" className="btn btn-gold">
                            Reserve Your Table
                        </Link>
                        <Link to="/menu" className="btn btn-outline">
                            Browse Our Menu
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}

export default About;
