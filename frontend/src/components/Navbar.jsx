'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const pathname = usePathname();
    const isHome = pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setMobileOpen(false);
    }, [pathname]);

    const navClass = scrolled || !isHome
        ? 'navbar navbar--solid'
        : 'navbar navbar--transparent';

    const links = [
        { href: '/', label: 'Home' },
        { href: '/menu', label: 'Menu' },
        { href: '/events', label: 'Events' },
        { href: '/about', label: 'About' },
    ];

    return (
        <>
            <nav className={navClass}>
                <div className="navbar__inner">
                    <Link href="/" className="navbar__logo">
                        Cay <span>Tung</span>
                    </Link>

                    <div className="navbar__links">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`navbar__link ${pathname === link.href ? 'navbar__link--active' : ''}`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link href="/booking" className="btn btn-gold navbar__cta">
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
                    <Link key={link.href} href={link.href} className="navbar__mobile-link">
                        {link.label}
                    </Link>
                ))}
                <Link href="/booking" className="btn btn-gold">
                    Reserve a Table
                </Link>
            </div>
        </>
    );
}

export default Navbar;
