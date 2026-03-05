import { Link } from 'react-router-dom';

function Hero() {
    return (
        <section className="hero" id="hero">
            <div className="hero__background">
                <img
                    src="/images/hero-banner.png"
                    alt="Cay Tung restaurant interior"
                    className="hero__image"
                />
                <div className="hero__overlay"></div>
            </div>

            <div className="hero__content">
                <p className="hero__subtitle">Welcome to Cay Tung</p>
                <div className="hero__divider"></div>
                <h1 className="hero__title">
                    Where Every Meal<br />Becomes a Memory
                </h1>
                <p className="hero__description">
                    Experience the art of fine dining in an atmosphere of timeless elegance.
                    Our world-class chefs craft each dish with passion, precision, and the
                    finest seasonal ingredients from around the globe.
                </p>
                <div className="hero__buttons">
                    <Link to="/menu" className="btn btn-gold">
                        Explore Our Menu
                    </Link>
                    <Link to="/booking" className="btn btn-outline">
                        Reserve a Table
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default Hero;
