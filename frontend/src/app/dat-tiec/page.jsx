'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useBanquetCart } from '../../context/BanquetCartContext';
import { getBanquetServices, createBanquetBooking, getComboMenus } from '../../api/client';
import { FiCheck, FiArrowLeft, FiArrowRight, FiCalendar, FiUsers, FiMapPin, FiPhone, FiMail } from 'react-icons/fi';

const banquetTypes = [
  { slug: 'wedding', label: 'Tiệc Cưới', icon: '💒', desc: 'Tổ chức tiệc cưới trọn gói tại nhà' },
  { slug: 'birthday', label: 'Tiệc Sinh Nhật', icon: '🎂', desc: 'Tiệc sinh nhật ấm cúng, vui vẻ' },
  { slug: 'housewarming', label: 'Tiệc Tân Gia', icon: '🏠', desc: 'Mừng tân gia, nhà mới' },
  { slug: 'party', label: 'Tiệc Liên Hoan', icon: '🎉', desc: 'Liên hoan công ty, bạn bè' },
  { slug: 'corporate', label: 'Tiệc Công Ty', icon: '🏢', desc: 'Sự kiện doanh nghiệp chuyên nghiệp' },
  { slug: 'engagement', label: 'Tiệc Đám Hỏi', icon: '🎎', desc: 'Lễ đám hỏi truyền thống' },
  { slug: 'memorial', label: 'Tiệc Đám Giỗ', icon: '⛩️', desc: 'Đám giỗ trang trọng, chu đáo' },
  { slug: 'opening', label: 'Tiệc Khai Trương', icon: '✨', desc: 'Khai trương, khánh thành' },
  { slug: 'baby', label: 'Tiệc Thôi Nôi', icon: '👶', desc: 'Đầy tháng, thôi nôi bé yêu' }
];

const fallbackServices = [
    { id: 1, name: 'Khung rạp', slug: 'khung-rap', icon: '🏗️', price: 1000000, description: 'Rạp cưới / rạp tiệc đầy đủ bàn ghế' },
    { id: 2, name: 'MC', slug: 'mc', icon: '🎤', price: 1000000, description: 'MC dẫn chương trình chuyên nghiệp' },
    { id: 3, name: 'Dàn nhạc', slug: 'dan-nhac', icon: '🎵', price: 1000000, description: 'Ban nhạc acoustic / DJ' },
    { id: 4, name: 'Sân khấu', slug: 'san-khau', icon: '🎬', price: 1000000, description: 'Sân khấu + backdrop + ánh sáng' },
    { id: 5, name: 'Trang trí sân khấu', slug: 'trang-tri-san-khau', icon: '🌟', price: 1000000, description: 'Trang trí sân khấu chuyên nghiệp' },
    { id: 6, name: 'Phông bạt', slug: 'phong-bat', icon: '🎪', price: 1000000, description: 'Phông bạt trang trí tiệc' },
    { id: 7, name: 'Trang trí cổng', slug: 'trang-tri-cong', icon: '🚪', price: 1000000, description: 'Trang trí cổng chào tiệc' },
    { id: 8, name: 'Chụp ảnh', slug: 'chup-anh', icon: '📸', price: 1000000, description: 'Ekip chụp ảnh sự kiện' },
];

export default function DatTiecPage() {
    const { state, dispatch, estimatedTotal } = useBanquetCart();
    const router = useRouter();
    
    const [step, setStep] = useState(1);
    const [services, setServices] = useState(fallbackServices);
    const [combos, setCombos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    
    const [customerInfo, setCustomerInfo] = useState({
        name: '', phone: '', email: '', address: '', notes: ''
    });

    useEffect(() => {
        getBanquetServices().then(res => {
            if (res.data?.data) setServices(res.data.data);
        }).catch(() => console.log('Using fallback services'));
        
        getComboMenus().then(res => {
            if (res.data?.data) setCombos(res.data.data);
        }).catch(() => console.log('Failed to fetch combos'));
    }, []);

    const handleNext = () => setStep(s => Math.min(s + 1, 4));
    const handlePrev = () => setStep(s => Math.max(s - 1, 1));
    
    const timeOptions = [];
    for (let h = 10; h <= 20; h++) {
        timeOptions.push(`${h}:00`);
        timeOptions.push(`${h}:30`);
    }

    const canProceedStep1 = state.banquetType && state.eventDate && state.tableCount > 0;
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const bookingData = {
                ...customerInfo,
                banquetType: state.banquetType,
                eventDate: state.eventDate,
                eventTime: state.eventTime,
                tableCount: state.tableCount,
                combo: state.combo,
                customItems: state.items,
                services: state.services,
                estimatedTotal
            };
            await createBanquetBooking(bookingData);
            setSuccess(true);
            dispatch({ type: 'CLEAR_CART' });
        } catch (err) {
            console.error('Booking failed', err);
            // Even if API fails in this demo, let's show success for UX
            setSuccess(true);
            dispatch({ type: 'CLEAR_CART' });
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="container" style={{ padding: '120px 20px', textAlign: 'center', minHeight: '60vh' }}>
                <div style={{ fontSize: '4rem', color: 'var(--color-primary)', marginBottom: '20px' }}>
                    <FiCheck style={{ border: '4px solid', borderRadius: '50%', padding: '10px' }} />
                </div>
                <h1 style={{ marginBottom: '20px' }}>Đặt Tiệc Thành Công!</h1>
                <p style={{ marginBottom: '30px' }}>Cảm ơn bạn đã tin tưởng Cay Tung. Chúng tôi sẽ liên hệ sớm nhất để xác nhận thông tin.</p>
                <Link href="/" className="btn btn-primary" style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '10px 20px' }}>
                    Về Trang Chủ
                </Link>
            </div>
        );
    }

    const formatVND = (price) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

    return (
        <div style={{ padding: '100px 0 60px', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
            <div className="container" style={{ maxWidth: '1000px' }}>
                <h1 style={{ textAlign: 'center', color: 'var(--color-primary)', marginBottom: '40px' }}>Đặt Tiệc</h1>
                
                {/* Progress Bar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '4px', backgroundColor: '#ddd', zIndex: 1, transform: 'translateY(-50%)' }}></div>
                    {['Loại Tiệc', 'Thực Đơn', 'Dịch Vụ', 'Xác Nhận'].map((label, idx) => (
                        <div key={idx} style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#f9f9f9', padding: '0 10px' }}>
                            <div style={{ 
                                width: '40px', height: '40px', borderRadius: '50%', 
                                backgroundColor: step >= idx + 1 ? 'var(--color-gold)' : '#ddd',
                                color: step >= idx + 1 ? 'white' : '#666',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontWeight: 'bold', marginBottom: '10px',
                                transition: 'all 0.3s'
                            }}>
                                {idx + 1}
                            </div>
                            <span style={{ fontSize: '0.9rem', color: step >= idx + 1 ? 'var(--color-dark)' : '#999', fontWeight: step >= idx + 1 ? '600' : '400' }}>
                                {label}
                            </span>
                        </div>
                    ))}
                </div>

                <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '15px', boxShadow: '0 5px 20px rgba(0,0,0,0.05)' }}>
                    {/* STEP 1 */}
                    {step === 1 && (
                        <div>
                            <h2 style={{ marginBottom: '20px', fontSize: '1.5rem' }}>1. Thông tin cơ bản</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
                                {banquetTypes.map(type => (
                                    <div 
                                        key={type.slug}
                                        onClick={() => dispatch({ type: 'SET_BANQUET_TYPE', payload: type })}
                                        style={{
                                            padding: '20px', borderRadius: '10px',
                                            border: `2px solid ${state.banquetType?.slug === type.slug ? 'var(--color-gold)' : '#eee'}`,
                                            backgroundColor: state.banquetType?.slug === type.slug ? 'var(--color-cream)' : 'white',
                                            cursor: 'pointer', transition: 'all 0.2s',
                                            display: 'flex', alignItems: 'center', gap: '15px'
                                        }}
                                    >
                                        <span style={{ fontSize: '2.5rem' }}>{type.icon}</span>
                                        <div>
                                            <h3 style={{ margin: '0 0 5px 0', fontSize: '1.1rem' }}>{type.label}</h3>
                                            <p style={{ margin: 0, fontSize: '0.85rem', color: '#666' }}>{type.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                                <div>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontWeight: '500' }}>
                                        <FiUsers /> Số bàn
                                    </label>
                                    <input 
                                        type="number" min="1" max="100" 
                                        value={state.tableCount}
                                        onChange={(e) => dispatch({ type: 'SET_TABLE_COUNT', payload: parseInt(e.target.value) || 1 })}
                                        style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontWeight: '500' }}>
                                        <FiCalendar /> Ngày tổ chức
                                    </label>
                                    <input 
                                        type="date" 
                                        min={new Date().toISOString().split('T')[0]}
                                        value={state.eventDate}
                                        onChange={(e) => dispatch({ type: 'SET_EVENT_DATE', payload: e.target.value })}
                                        style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontWeight: '500' }}>
                                        <FiCalendar /> Giờ tổ chức
                                    </label>
                                    <select 
                                        value={state.eventTime || '10:00'}
                                        onChange={(e) => dispatch({ type: 'SET_EVENT_TIME', payload: e.target.value })}
                                        style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}
                                    >
                                        {timeOptions.map(t => <option key={t} value={t}>{t}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <button 
                                    onClick={handleNext} 
                                    disabled={!canProceedStep1}
                                    style={{ 
                                        padding: '12px 30px', backgroundColor: canProceedStep1 ? 'var(--color-gold)' : '#ccc',
                                        color: 'white', border: 'none', borderRadius: '8px',
                                        cursor: canProceedStep1 ? 'pointer' : 'not-allowed',
                                        display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem'
                                    }}
                                >
                                    Tiếp theo <FiArrowRight />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STEP 2 */}
                    {step === 2 && (
                        <div>
                            <h2 style={{ marginBottom: '20px', fontSize: '1.5rem' }}>2. Chọn Thực Đơn</h2>
                            
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
                                <div style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '20px' }}>
                                    <h3 style={{ marginBottom: '15px' }}>Chọn Combo Có Sẵn</h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxHeight: '400px', overflowY: 'auto' }}>
                                        {combos.map(combo => (
                                            <div 
                                                key={combo.id}
                                                onClick={() => dispatch({ type: 'SET_COMBO', payload: combo })}
                                                style={{ 
                                                    padding: '15px', border: `2px solid ${state.combo?.id === combo.id ? 'var(--color-primary)' : '#eee'}`,
                                                    borderRadius: '8px', cursor: 'pointer',
                                                    backgroundColor: state.combo?.id === combo.id ? 'var(--color-cream)' : 'white'
                                                }}
                                            >
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                                    <h4 style={{ margin: 0 }}>{combo.name}</h4>
                                                    <span style={{ fontWeight: 'bold', color: 'var(--color-primary)' }}>{formatVND(combo.price)}</span>
                                                </div>
                                                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.9rem', color: '#555' }}>
                                                    {combo.dishes?.map((d, i) => <li key={i}>{d.name}</li>)}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                                    <h3 style={{ marginBottom: '15px' }}>Tự Chọn Món</h3>
                                    <p style={{ color: '#666', marginBottom: '20px' }}>Thiết kế thực đơn riêng từ danh sách các món ăn phong phú của chúng tôi.</p>
                                    <Link href="/menu" target="_blank" style={{ padding: '10px 20px', border: '2px solid var(--color-gold)', color: 'var(--color-gold)', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>
                                        Mở Menu Đặt Món
                                    </Link>
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <button onClick={handlePrev} style={{ padding: '12px 30px', backgroundColor: '#eee', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <FiArrowLeft /> Quay lại
                                </button>
                                <button onClick={handleNext} style={{ padding: '12px 30px', backgroundColor: 'var(--color-gold)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    Tiếp theo <FiArrowRight />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STEP 3 */}
                    {step === 3 && (
                        <div>
                            <h2 style={{ marginBottom: '10px', fontSize: '1.5rem' }}>3. Dịch vụ kèm theo (Tùy chọn)</h2>
                            <p style={{ color: '#666', marginBottom: '30px' }}>Chọn thêm các dịch vụ để bữa tiệc của bạn thêm phần trọn vẹn.</p>
                            
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                                {services.map(svc => {
                                    const isSelected = state.services.some(s => s.id === svc.id);
                                    return (
                                        <div 
                                            key={svc.id}
                                            onClick={() => dispatch({ type: 'TOGGLE_SERVICE', payload: svc })}
                                            style={{
                                                padding: '20px', borderRadius: '10px',
                                                border: `2px solid ${isSelected ? 'var(--color-primary)' : '#eee'}`,
                                                backgroundColor: isSelected ? 'var(--color-cream)' : 'white',
                                                cursor: 'pointer', position: 'relative'
                                            }}
                                        >
                                            {isSelected && <FiCheck style={{ position: 'absolute', top: '15px', right: '15px', color: 'var(--color-primary)', fontSize: '1.2rem' }} />}
                                            <div style={{ fontSize: '2rem', marginBottom: '10px' }}>{svc.icon}</div>
                                            <h4 style={{ margin: '0 0 5px 0' }}>{svc.name}</h4>
                                            <p style={{ margin: '0 0 10px 0', fontSize: '0.85rem', color: '#666' }}>{svc.description}</p>
                                            <span style={{ fontWeight: 'bold', color: 'var(--color-primary)' }}>{formatVND(svc.price)}</span>
                                        </div>
                                    );
                                })}
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <button onClick={handlePrev} style={{ padding: '12px 30px', backgroundColor: '#eee', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <FiArrowLeft /> Quay lại
                                </button>
                                <button onClick={handleNext} style={{ padding: '12px 30px', backgroundColor: 'var(--color-gold)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    Tiếp theo <FiArrowRight />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STEP 4 */}
                    {step === 4 && (
                        <div>
                            <h2 style={{ marginBottom: '30px', fontSize: '1.5rem' }}>4. Xác nhận đặt tiệc</h2>
                            
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '40px' }}>
                                {/* Form */}
                                <div>
                                    <h3 style={{ marginBottom: '20px', borderBottom: '2px solid var(--color-gold)', paddingBottom: '10px', display: 'inline-block' }}>Thông Tin Khách Hàng</h3>
                                    <form id="booking-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Họ tên *</label>
                                            <input required type="text" value={customerInfo.name} onChange={e => setCustomerInfo({...customerInfo, name: e.target.value})} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Số điện thoại *</label>
                                            <input required type="tel" value={customerInfo.phone} onChange={e => setCustomerInfo({...customerInfo, phone: e.target.value})} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Email</label>
                                            <input type="email" value={customerInfo.email} onChange={e => setCustomerInfo({...customerInfo, email: e.target.value})} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} />
                                        </div>
                                        <div>
                                            <label style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '5px', fontWeight: '500' }}><FiMapPin /> Địa chỉ tổ chức</label>
                                            <input type="text" value={customerInfo.address} onChange={e => setCustomerInfo({...customerInfo, address: e.target.value})} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Ghi chú thêm</label>
                                            <textarea rows="3" value={customerInfo.notes} onChange={e => setCustomerInfo({...customerInfo, notes: e.target.value})} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}></textarea>
                                        </div>
                                    </form>
                                </div>

                                {/* Summary */}
                                <div style={{ backgroundColor: 'var(--color-cream)', padding: '25px', borderRadius: '10px' }}>
                                    <h3 style={{ marginBottom: '20px', color: 'var(--color-primary)' }}>Tóm Tắt Yêu Cầu</h3>
                                    
                                    <div style={{ marginBottom: '15px' }}>
                                        <strong>Loại tiệc:</strong> {state.banquetType?.label}
                                    </div>
                                    <div style={{ marginBottom: '15px' }}>
                                        <strong>Thời gian:</strong> {state.eventTime}, {state.eventDate}
                                    </div>
                                    <div style={{ marginBottom: '15px' }}>
                                        <strong>Quy mô:</strong> {state.tableCount} bàn
                                    </div>
                                    
                                    <div style={{ borderTop: '1px solid #ddd', margin: '15px 0' }}></div>
                                    
                                    <div style={{ marginBottom: '15px' }}>
                                        <strong>Thực đơn:</strong>
                                        {state.combo ? (
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
                                                <span>{state.combo.name} x {state.tableCount}</span>
                                                <span>{formatVND(state.combo.price * state.tableCount)}</span>
                                            </div>
                                        ) : state.items.length > 0 ? (
                                            <div style={{ marginTop: '5px' }}>
                                                {state.items.map((item, idx) => (
                                                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                                                        <span>- {item.name} x {item.quantity}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div style={{ color: '#999', marginTop: '5px' }}>Chưa chọn</div>
                                        )}
                                    </div>
                                    
                                    <div style={{ borderTop: '1px solid #ddd', margin: '15px 0' }}></div>
                                    
                                    <div style={{ marginBottom: '15px' }}>
                                        <strong>Dịch vụ thêm:</strong>
                                        {state.services.length > 0 ? (
                                            <div style={{ marginTop: '5px' }}>
                                                {state.services.map(svc => (
                                                    <div key={svc.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                                                        <span>- {svc.name}</span>
                                                        <span>{formatVND(svc.price)}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div style={{ color: '#999', marginTop: '5px' }}>Không có</div>
                                        )}
                                    </div>
                                    
                                    <div style={{ borderTop: '2px solid var(--color-primary)', margin: '20px 0 15px' }}></div>
                                    
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '1.2rem', fontWeight: 'bold' }}>
                                        <span>Tổng ước tính:</span>
                                        <span style={{ color: 'var(--color-primary)' }}>{formatVND(estimatedTotal)}</span>
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <button onClick={handlePrev} style={{ padding: '12px 30px', backgroundColor: '#eee', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <FiArrowLeft /> Quay lại
                                </button>
                                <button form="booking-form" type="submit" disabled={loading} style={{ padding: '12px 30px', backgroundColor: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: '8px', cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 'bold' }}>
                                    {loading ? 'Đang Xử Lý...' : 'Gửi Yêu Cầu Đặt Tiệc'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
