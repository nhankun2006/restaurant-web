'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Hero from '../components/Hero';
import SectionTitle from '../components/SectionTitle';
import MenuCard from '../components/MenuCard';
import { getFeaturedItems } from '../api/client';
import { FiStar, FiAward, FiHeart } from 'react-icons/fi';

export default function HomePage() {
    const [featured, setFeatured] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const res = await getFeaturedItems();
                setFeatured(res.data.data || []);
            } catch (err) {
                console.error('Failed to fetch featured items:', err);
                // Fallback data when API is not available
                setFeatured([
                    { id: 1, name: 'Truffle Bruschetta', description: 'Bánh mì sourdough nướng giòn phủ kem nấm truffle đen, cà chua nướng và sốt húng tây tươi.', price: 16.50, is_featured: true, categories: { name: 'Món Khai Vị' } },
                    { id: 2, name: 'Wagyu Beef Tenderloin', description: 'Thăn nội bò Wagyu A5 nướng hoàn hảo, dùng kèm khoai tây nghiền truffle và sốt rượu vang đỏ.', price: 58.00, is_featured: true, categories: { name: 'Món Chính' } },
                    { id: 3, name: 'Pan-Seared Sea Bass', description: 'Cá vược Chile áp chảo với sốt bơ nghệ tây, đọt măng tây và khoai tây nghiền.', price: 42.00, is_featured: true, categories: { name: 'Hải Sản' } },
                    { id: 4, name: 'Lobster Thermidor', description: 'Tôm hùm Atlantic đút lò với sốt kem phô mai Gruyère, thảo mộc tươi và bơ đun chảy.', price: 65.00, is_featured: true, categories: { name: 'Hải Sản' } },
                    { id: 5, name: 'Chocolate Lava Cake', description: 'Bánh chocolate đắng Valrhona với nhân chocolate tan chảy, dùng kèm kem vani.', price: 16.00, is_featured: true, categories: { name: 'Món Tráng Miệng' } },
                    { id: 6, name: 'Cay Tung Signature Martini', description: 'Martini đặc sản của nhà hàng với vodka thượng hạng, rượu hoa cơm cháy, dưa chuột tươi và chút chanh.', price: 18.00, is_featured: true, categories: { name: 'Đồ Uống' } },
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
                        label="Lựa Chọn Đặc Bật"
                        title="Món Ăn Đặc Sắc Của Đầu Bếp"
                        description="Danh sách các món ăn được yêu thích nhất, chế biến tỉ mỉ từ những nguyên liệu hảo hạng."
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
                        <Link href="/menu" className="btn btn-primary">
                            Xem Toàn Bộ Thực Đơn
                        </Link>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="section section--dark">
                <div className="container">
                    <SectionTitle
                        label="Về Cay Tung"
                        title="Trải Nghiệm Đáng Nhớ"
                        description="Mỗi chi tiết đều được chăm chút tỉ mỉ để mang lại những khoảnh khắc tuyệt vời nhất."
                    />
                    <div className="why-grid">
                        <div className="why-card">
                            <div className="why-card__icon"><FiAward /></div>
                            <h4 className="why-card__title">Ẩm Thực Đạt Giải Thưởng</h4>
                            <p className="why-card__desc">
                                Đội ngũ đầu bếp sao Michelin của chúng tôi sáng tạo những món ăn
                                hảo hạng từ những nguyên liệu tươi ngon nhất thế giới.
                            </p>
                        </div>
                        <div className="why-card">
                            <div className="why-card__icon"><FiStar /></div>
                            <h4 className="why-card__title">Phục Vụ Tận Tâm</h4>
                            <p className="why-card__desc">
                                Đội ngũ nhân viên chuyên nghiệp đảm bảo sự hài lòng tuyệt đối từ lúc
                                đón tiếp cho đến suốt bữa ăn của bạn.
                            </p>
                        </div>
                        <div className="why-card">
                            <div className="why-card__icon"><FiHeart /></div>
                            <h4 className="why-card__title">Không Gian Sang Trọng</h4>
                            <p className="why-card__desc">
                                Bầu không khí tinh tế kết hợp giữa sự hiện đại và nét cổ điển charm —
                                không gian hoàn hảo cho mọi dịp đặc biệt.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section" style={{ textAlign: 'center' }}>
                <div className="container">
                    <SectionTitle
                        label="Đồng Hành Cùng Chúng Tôi"
                        title="Tổ Chức Sự Kiện Đặc Biệt"
                        description="Từ những bữa tối thân mật đến các buổi tiệc lớn, hãy để chúng tôi mang lại trải nghiệm đáng nhớ cho bạn và khách mời."
                    />
                    <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link href="/gallery" className="btn btn-primary">
                            Khám Phá Thư Viện Ảnh
                        </Link>
                        <Link href="/booking" className="btn btn-outline" style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}>
                            Đặt Bàn Ngay
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
