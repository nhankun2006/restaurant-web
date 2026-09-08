import Link from 'next/link';
import { FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi';
import { FaFacebookF, FaInstagram, FaTwitter, FaYelp } from 'react-icons/fa';

function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__grid">
                    {/* Brand */}
                    <div>
                        <h3 className="footer__brand-name">Cay Tung</h3>
                        <p className="footer__brand-desc">
                            An exquisite fine dining experience where culinary artistry meets warm
                            hospitality. Every dish tells a story, every visit creates a memory.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="footer__heading">Quick Links</h4>
                        <Link href="/" className="footer__link">Home</Link>
                        <Link href="/menu" className="footer__link">Our Menu</Link>
                        <Link href="/events" className="footer__link">Events</Link>
                        <Link href="/booking" className="footer__link">Reservations</Link>
                        <Link href="/about" className="footer__link">About Us</Link>
                    </div>

                    {/* Hours */}
                    <div>
                        <h4 className="footer__heading">Opening Hours</h4>
                        <div className="footer__contact-item">
                            <FiClock className="footer__contact-icon" />
                            <div>
                                <div>Mon — Fri: 11:30 AM — 10:00 PM</div>
                                <div>Sat — Sun: 10:00 AM — 11:00 PM</div>
                            </div>
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="footer__heading">Contact Us</h4>
                        <div className="footer__contact-item">
                            <FiMapPin className="footer__contact-icon" />
                            <span>123 Gourmet Avenue, Beverly Hills, CA 90210</span>
                        </div>
                        <div className="footer__contact-item">
                            <FiPhone className="footer__contact-icon" />
                            <span>(310) 555-DINE</span>
                        </div>
                        <div className="footer__contact-item">
                            <FiMail className="footer__contact-icon" />
                            <span>reservations@lamaison.com</span>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="footer__bottom">
                    <span>&copy; {new Date().getFullYear()} Cay Tung. All rights reserved.</span>
                    <div className="footer__socials">
                        <a href="#" className="footer__social-icon" aria-label="Facebook">
                            <FaFacebookF />
                        </a>
                        <a href="#" className="footer__social-icon" aria-label="Instagram">
                            <FaInstagram />
                        </a>
                        <a href="#" className="footer__social-icon" aria-label="Twitter">
                            <FaTwitter />
                        </a>
                        <a href="#" className="footer__social-icon" aria-label="Yelp">
                            <FaYelp />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
