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
                            Trải nghiệm ẩm thực cao cấp nơi nghệ thuật nấu ăn kết hợp cùng sự
                            hiếu khách ấm áp. Mỗi món ăn là một câu chuyện, mỗi lần ghé thăm là một kỷ niệm.
                        </p>
                    </div>

                    {/* Hours */}
                    <div>
                        <h4 className="footer__heading">Giờ Mở Cửa</h4>
                        <div className="footer__contact-item">
                            <FiClock className="footer__contact-icon" />
                            <div>
                                <div>Thứ 2 — Thứ 6: 11:30 — 22:00</div>
                                <div>Thứ 7 — Chủ Nhật: 10:00 — 23:00</div>
                            </div>
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="footer__heading">Liên Hệ</h4>
                        <div className="footer__contact-item">
                            <FiMapPin className="footer__contact-icon" />
                            <span>{process.env.NEXT_PUBLIC_RESTAURANT_ADDRESS}</span>
                        </div>
                        <div className="footer__contact-item">
                            <FiPhone className="footer__contact-icon" />
                            <span>{process.env.NEXT_PUBLIC_RESTAURANT_PHONE}</span>
                        </div>
                        <div className="footer__contact-item">
                            <FiMail className="footer__contact-icon" />
                            <span>{process.env.NEXT_PUBLIC_RESTAURANT_EMAIL}</span>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="footer__bottom">
                    <span>&copy; {new Date().getFullYear()} Cay Tung.</span>
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
