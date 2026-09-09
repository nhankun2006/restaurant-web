import Link from 'next/link';

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
                    Nơi Mỗi Bữa Ăn<br />Trở Thành Kỷ Niệm
                </h1>
                <p className="hero__description">
                    Trải nghiệm nghệ thuật ẩm thực tinh tế trong không gian sang trọng và ấm cúng.
                    Các đầu bếp hàng đầu của chúng tôi chế biến từng món ăn bằng tất cả đam mê,
                    sự tỉ mỉ và những nguyên liệu tươi ngon nhất.
                </p>
                <div className="hero__buttons">
                    <Link href="/menu" className="btn btn-gold">
                        Khám Phá Thực Đơn
                    </Link>
                    <Link href="/booking" className="btn btn-outline">
                        Đặt Bàn Ngay
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default Hero;
