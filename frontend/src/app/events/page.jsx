'use client';

import { useState, useEffect } from 'react';
import SectionTitle from '../../components/SectionTitle';
import EventCard from '../../components/EventCard';
import { getEvents } from '../../api/client';

export default function EventsPage() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    const fallbackEvents = [
        {
            id: 1,
            title: 'Tiệc Sinh Nhật & Kỷ Niệm',
            slug: 'birthday-party',
            description: 'Tôn vinh những khoảnh khắc đáng nhớ trong không gian lãng mạn. Đội ngũ sự kiện chuyên nghiệp của chúng tôi sẽ thiết kế trải nghiệm tiệc theo yêu cầu với thực đơn tùy chỉnh, trang trí ấn tượng và dịch vụ chu đáo.',
            features: ['Thực đơn tiệc & bánh sinh nhật theo yêu cầu', 'Phòng tiệc riêng (10-80 khách)', 'Hệ thống âm thanh & DJ chuyên nghiệp', 'Trang trí tiệc & bóng bay cao cấp', 'Quản lý sự kiện hỗ trợ riêng', 'Tặng kèm đĩa bánh sinh nhật đặc biệt'],
        },
        {
            id: 2,
            title: 'Sự Kiện Công Ty & Hội Nghị',
            slug: 'corporate-event',
            description: 'Tạo ấn tượng sâu sắc với đối tác và đồng nghiệp. Từ những bữa tối doanh nhân thân mật đến các buổi đại tiệc công ty, chúng tôi cung cấp không gian sang trọng với thiết bị âm thanh ánh sáng hiện đại.',
            features: ['Thiết bị AV & màn hình chiếu hiện đại', 'Bố trí chỗ ngồi linh hoạt', 'Thực đơn ăn trưa & tối cao cấp', 'Không gian giao lưu riêng tư', 'Quầy bar đầy đủ với cocktail sáng tạo', 'Có dịch vụ đỗ xe (Valet)'],
        },
        {
            id: 3,
            title: 'Tiệc Cưới Trọn Gói',
            slug: 'wedding-reception',
            description: 'Ghi dấu ngày trọng đại trong không gian lãng mạn. Cay Tung mang đến sảnh tiệc trong nhà & ngoài trời tuyệt đẹp cùng ẩm thực đẳng cấp để biến ngày cưới trong mơ của bạn thành hiện thực.',
            features: ['Không gian lễ cưới trong nhà & ngoài trời', 'Thực đơn cưới riêng & thử món miễn phí', 'Trang trí hoa tươi & concept thiết kế riêng', 'Quản lý tiệc cưới đồng hành suốt sự kiện', 'Sân khấu & khu vực khiêu vũ', 'Phòng tân hôn dành cho cặp đôi', 'Sức chứa lên tới 200 khách'],
        },
        {
            id: 4,
            title: 'Trải Nghiệm Ẩm Thực Riêng Tư',
            slug: 'private-dining',
            description: 'Dành cho những ai tìm kiếm sự riêng tư tuyệt đối. Phòng ăn VIP thích hợp cho lễ kỷ niệm, cầu hôn hay gặp mặt gia đình để tận hưởng những giây phút đặc biệt.',
            features: ['Phòng VIP riêng biệt (2-20 khách)', 'Thực đơn thử món thiết kế riêng bởi bếp trưởng', 'Gợi ý kết hợp rượu vang từ Sommelier', 'Không gian nến nồng ấm & âm nhạc tùy chọn', 'Nhân viên phục vụ riêng', 'Đáp ứng các yêu cầu chế độ ăn đặc biệt'],
        },
    ];

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await getEvents();
                setEvents(res.data.data || []);
            } catch (err) {
                console.error('Failed to fetch events:', err);
                setEvents(fallbackEvents);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    return (
        <>
            <div className="page-header">
                <div className="container">
                    <h1>Sự Kiện & Tiệc Riêng</h1>
                    <div className="page-header__divider"></div>
                    <p>Từ những buổi họp mặt ấm cúng đến các bữa tiệc hoành tráng, chúng tôi mang đến trải nghiệm hoàn hảo theo yêu cầu của bạn.</p>
                </div>
            </div>

            <section className="section">
                <div className="container">
                    <SectionTitle
                        label="Dịch Vụ Của Chúng Tôi"
                        title="Kiến Tạo Kỷ Niệm Đáng Nhớ"
                        description="Mỗi sự kiện tại Cay Tung là một tác phẩm nghệ thuật được chăm chút tỉ mỉ từng chi tiết."
                    />

                    {loading ? (
                        <div className="grid-2">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="skeleton skeleton--card" style={{ height: '500px' }}></div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid-2">
                            {events.map((event) => (
                                <EventCard key={event.id} event={event} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Stats section */}
            <section className="section section--dark">
                <div className="container">
                    <div className="stats-bar">
                        <div className="stat">
                            <span className="stat__number">500+</span>
                            <span className="stat__label">Sự Kiện Đã Tổ Chức</span>
                        </div>
                        <div className="stat">
                            <span className="stat__number">150+</span>
                            <span className="stat__label">Tiệc Cưới</span>
                        </div>
                        <div className="stat">
                            <span className="stat__number">200</span>
                            <span className="stat__label">Sức Chứa Tối Đa</span>
                        </div>
                        <div className="stat">
                            <span className="stat__number">98%</span>
                            <span className="stat__label">Mức Độ Hài Lòng</span>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
