'use client';

import { useState } from 'react';
import { createBooking } from '../api/client';
import { FiCheck } from 'react-icons/fi';

function BookingForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        event_type: 'dinner',
        date: '',
        time: '19:00',
        guests: 2,
        message: '',
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await createBooking(formData);
            setSubmitted(true);
        } catch (err) {
            setError('Đã có lỗi xảy ra. Vui lòng thử lại hoặc liên hệ trực tiếp với chúng tôi.');
            console.error('Booking error:', err);
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="booking-success animate-fade-in-up">
                <div className="booking-success__icon">
                    <FiCheck />
                </div>
                <h3 className="booking-success__title">Đặt Bàn Thành Công!</h3>
                <p className="booking-success__message">
                    Cảm ơn quý khách <strong>{formData.name}</strong>! Chúng tôi đã nhận được yêu cầu
                    đặt bàn cho <strong>{formData.guests} khách</strong> vào lúc <strong>{formData.time}</strong> ngày <strong>{formData.date}</strong>.
                    <br /><br />
                    Thông tin xác nhận sẽ được gửi tới <strong>{formData.email}</strong> trong thời gian sớm nhất.
                    Rất hân hạnh được đón tiếp quý khách tại Cay Tung!
                </p>
                <button
                    className="btn btn-gold"
                    style={{ marginTop: '2rem' }}
                    onClick={() => {
                        setSubmitted(false);
                        setFormData({
                            name: '', email: '', phone: '', event_type: 'dinner',
                            date: '', time: '19:00', guests: 2, message: '',
                        });
                    }}
                >
                    Tạo Đơn Đặt Bàn Khác
                </button>
            </div>
        );
    }

    return (
        <form className="booking-form animate-fade-in-up" onSubmit={handleSubmit}>
            <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.8rem',
                textAlign: 'center',
                marginBottom: 'var(--space-2xl)',
                color: 'var(--color-dark)',
            }}>
                Đặt Bàn Trực Tuyến
            </h3>

            {error && (
                <div style={{
                    background: '#FEE',
                    border: '1px solid var(--color-error)',
                    borderRadius: 'var(--radius-sm)',
                    padding: 'var(--space-md)',
                    marginBottom: 'var(--space-lg)',
                    color: 'var(--color-error)',
                    textAlign: 'center',
                }}>
                    {error}
                </div>
            )}

            <div className="booking-form__grid">
                <div className="form-group">
                    <label className="form-label" htmlFor="name">Họ và Tên</label>
                    <input
                        id="name" name="name" type="text" className="form-input"
                        placeholder="Nguyễn Văn A" value={formData.name}
                        onChange={handleChange} required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input
                        id="email" name="email" type="email" className="form-input"
                        placeholder="nguyenvana@example.com" value={formData.email}
                        onChange={handleChange} required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="phone">Số Điện Thoại</label>
                    <input
                        id="phone" name="phone" type="tel" className="form-input"
                        placeholder="0901234567" value={formData.phone}
                        onChange={handleChange} required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="event_type">Loại Sự Kiện</label>
                    <select
                        id="event_type" name="event_type" className="form-select"
                        value={formData.event_type} onChange={handleChange}
                    >
                        <option value="dinner">Bữa Tối</option>
                        <option value="lunch">Bữa Trưa</option>
                        <option value="birthday-party">Tiệc Sinh Nhật</option>
                        <option value="corporate-event">Sự Kiện Công Ty</option>
                        <option value="wedding-reception">Tiệc Cưới</option>
                        <option value="private-dining">Tiệc Riêng Tư</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="date">Ngày Đặt</label>
                    <input
                        id="date" name="date" type="date" className="form-input"
                        value={formData.date} onChange={handleChange}
                        min={new Date().toISOString().split('T')[0]} required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="time">Giờ Đặt</label>
                    <select
                        id="time" name="time" className="form-select"
                        value={formData.time} onChange={handleChange}
                    >
                        <option value="11:30">11:30</option>
                        <option value="12:00">12:00</option>
                        <option value="12:30">12:30</option>
                        <option value="13:00">13:00</option>
                        <option value="17:00">17:00</option>
                        <option value="17:30">17:30</option>
                        <option value="18:00">18:00</option>
                        <option value="18:30">18:30</option>
                        <option value="19:00">19:00</option>
                        <option value="19:30">19:30</option>
                        <option value="20:00">20:00</option>
                        <option value="20:30">20:30</option>
                        <option value="21:00">21:00</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="guests">Số Lượng Khách</label>
                    <input
                        id="guests" name="guests" type="number" className="form-input"
                        min="1" max="200" value={formData.guests}
                        onChange={handleChange} required
                    />
                </div>

                <div className="form-group booking-form__full">
                    <label className="form-label" htmlFor="message">Yêu Cầu Đặc Biệt</label>
                    <textarea
                        id="message" name="message" className="form-textarea"
                        placeholder="Ghi chú về chế độ ăn uống, vị trí ngồi, hoặc dịp đặc biệt..."
                        value={formData.message} onChange={handleChange}
                    />
                </div>

                <div className="booking-form__full" style={{ textAlign: 'center' }}>
                    <button
                        type="submit"
                        className="btn btn-gold"
                        disabled={loading}
                        style={{ minWidth: '250px' }}
                    >
                        {loading ? 'Đang gửi...' : 'Xác Nhận Đặt Bàn'}
                    </button>
                </div>
            </div>
        </form>
    );
}

export default BookingForm;
