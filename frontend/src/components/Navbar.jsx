import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();
    const isHome = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setMobileOpen(false);
    }, [location]);

    const navClass = scrolled || !isHome
        ? 'navbar navbar--solid'
        : 'navbar navbar--transparent';

    const links = [
        { to: '/', label: 'Home' },
        { to: '/menu', label: 'Menu' },
        { to: '/events', label: 'Events' },
        { to: '/about', label: 'About' },
    ];

    return (
        <>
            <nav className={navClass}>
                <div className="navbar__inner">
                    <Link to="/" className="navbar__logo">
                        Cay <span>Tung</span>
                    </Link>

                    <div className="navbar__links">
                        {links.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`navbar__link ${location.pathname === link.to ? 'navbar__link--active' : ''
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link to="/booking" className="btn btn-gold navbar__cta">
                            Reserve a Table
                        </Link>
                    </div>

                    <button
                        className="navbar__hamburger"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle navigation"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </nav>

            <div className={`navbar__mobile-menu ${mobileOpen ? 'navbar__mobile-menu--open' : ''}`}>
                {links.map((link) => (
                    <Link key={link.to} to={link.to} className="navbar__mobile-link">
                        {link.label}
                    </Link>
                ))}
                <Link to="/booking" className="btn btn-gold">
                    Reserve a Table
                </Link>
            </div>
        </>
    );
}

export default Navbar;
