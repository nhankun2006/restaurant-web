import Link from 'next/link';
import SectionTitle from '../../components/SectionTitle';
import { FiAward, FiUsers, FiHeart, FiStar } from 'react-icons/fi';

export const metadata = {
    title: 'Về Chúng Tôi — Nhà Hàng Cay Tung',
    description: 'Tìm hiểu về lịch sử, câu chuyện và triết lý ẩm thực của Nhà Hàng Cay Tung.',
};

export default function AboutPage() {
    return (
        <>
            <div className="page-header">
                <div className="container">
                    <h1>Về Cay Tung</h1>
                    <div className="page-header__divider"></div>
                    <p>Hành trình 37 năm kiến tạo nghệ thuật ẩm thực và lòng hiếu khách chân thành.</p>
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
                            <SectionTitle label="Câu Chuyện Của Chúng Tôi" title="Truyền Thống Của Sự Hoàn Hảo" />
                            <p>
                                Thành lập vào năm 1987 bởi Đầu bếp Antoine Dubois, Cay Tung khởi đầu là một
                                quán ăn nhỏ mang cảm hứng Paris với ước mơ mang tinh hoa ẩm thực Pháp tinh tế
                                phục vụ những thực khách sành ăn.
                            </p>
                            <p>
                                Hơn ba thập kỷ sau, ước mơ đó đã phát triển thành một trong những điểm đến
                                ẩm thực cao cấp được yêu thích nhất. Đội ngũ bếp do Bếp trưởng điều hành Marie Laurent
                                dẫn dắt tiếp tục tôn vinh tầm nhìn của Đầu bếp Dubois đồng thời mở rộng ranh giới
                                của ẩm thực hiện đại.
                            </p>
                            <p>
                                Mỗi món ăn tại Cay Tung là một câu chuyện — về những hương vị khám phá từ
                                các khu chợ Địa Trung Hải ngập nắng, những kỹ thuật hoàn thiện qua nhiều thế hệ,
                                và cam kết không ngừng mang lại những trải nghiệm ẩm thực đỉnh cao.
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
                            <span className="stat__label">Năm Kinh Nghiệm</span>
                        </div>
                        <div className="stat">
                            <span className="stat__number">3</span>
                            <span className="stat__label">Sao Michelin</span>
                        </div>
                        <div className="stat">
                            <span className="stat__number">50K+</span>
                            <span className="stat__label">Khách Hàng Hài Lòng</span>
                        </div>
                        <div className="stat">
                            <span className="stat__number">120+</span>
                            <span className="stat__label">Món Ăn Độc Đáo</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className="section">
                <div className="container">
                    <SectionTitle
                        label="Triết Lý"
                        title="Giá Trị Cốt Lõi"
                        description="Tại Cay Tung, mọi quyết định đều xuất phát từ những giá trị cốt lõi của chúng tôi."
                    />
                    <div className="grid-4" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '2.5rem', color: 'var(--color-gold)', marginBottom: 'var(--space-md)' }}>
                                <FiAward />
                            </div>
                            <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: 'var(--space-sm)' }}>Chất Lượng</h4>
                            <p style={{ color: 'var(--color-text-light)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                                Chỉ những nguyên liệu tươi ngon nhất mới được lựa chọn vào căn bếp của chúng tôi.
                            </p>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '2.5rem', color: 'var(--color-gold)', marginBottom: 'var(--space-md)' }}>
                                <FiHeart />
                            </div>
                            <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: 'var(--space-sm)' }}>Đam Mê</h4>
                            <p style={{ color: 'var(--color-text-light)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                                Mỗi món ăn được gửi gắm tình yêu, sự sáng tạo và kỹ thuật ẩm thực tinh tế.
                            </p>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '2.5rem', color: 'var(--color-gold)', marginBottom: 'var(--space-md)' }}>
                                <FiUsers />
                            </div>
                            <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: 'var(--space-sm)' }}>Cộng Đồng</h4>
                            <p style={{ color: 'var(--color-text-light)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                                Chúng tôi gắn kết chân thành với từng khách hàng, đối tác và đội ngũ nhân viên.
                            </p>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '2.5rem', color: 'var(--color-gold)', marginBottom: 'var(--space-md)' }}>
                                <FiStar />
                            </div>
                            <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: 'var(--space-sm)' }}>Sáng Tạo</h4>
                            <p style={{ color: 'var(--color-text-light)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                                Gìn giữ truyền thống nhưng không ngừng khám phá những hương vị và kỹ thuật mới.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section section--dark" style={{ textAlign: 'center' }}>
                <div className="container">
                    <SectionTitle
                        label="Trải Nghiệm"
                        title="Khám Phá Cay Tung"
                        description="Trân trọng kính mời quý khách đến và cảm nhận không gian ẩm thực sang trọng hàng đầu."
                    />
                    <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link href="/booking" className="btn btn-gold">
                            Đặt Bàn Ngay
                        </Link>
                        <Link href="/menu" className="btn btn-outline">
                            Xem Thực Đơn
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
