import SectionTitle from '../../components/SectionTitle';
import BookingForm from '../../components/BookingForm';

export const metadata = {
    title: 'Đặt Bàn — Nhà Hàng Cay Tung',
    description: 'Đặt bàn hoặc tổ chức sự kiện tại Nhà Hàng Cay Tung.',
};

export default function BookingPage() {
    return (
        <>
            <div className="page-header">
                <div className="container">
                    <h1>Đặt Bàn</h1>
                    <div className="page-header__divider"></div>
                    <p>Đặt bàn trước tại Cay Tung để có trải nghiệm ẩm thực trọn vẹn và đáng nhớ nhất.</p>
                </div>
            </div>

            <section className="section booking-section">
                <div className="container">
                    <SectionTitle
                        label="Trải Nghiệm Ẩm Thực"
                        title="Đặt Bàn Trực Tuyến"
                        description="Quý khách vui lòng điền thông tin bên dưới, chúng tôi sẽ xác nhận đơn đặt bàn trong thời gian sớm nhất."
                    />
                    <BookingForm />
                </div>
            </section>
        </>
    );
}
