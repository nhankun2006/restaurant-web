'use client';

import { useState, useEffect, useCallback } from 'react';
import { FiX, FiChevronLeft, FiChevronRight, FiCamera, FiLayers } from 'react-icons/fi';
import { getGallery } from '@/api/client';

const categories = [
    { id: 'all', label: 'Tất Cả' },
    { id: 'wedding', label: 'Tiệc Cưới' },
    { id: 'housewarming', label: 'Tiệc Tân Gia' },
    { id: 'birthday', label: 'Tiệc Sinh Nhật' },
    { id: 'baby', label: 'Tiệc Thôi Nôi' },
    { id: 'memorial', label: 'Tiệc Đám Giỗ' },
    { id: 'opening', label: 'Tiệc Khai Trương' },
    { id: 'corporate', label: 'Tiệc Công Ty' },
    { id: 'engagement', label: 'Tiệc Đám Hỏi' }
];

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000').replace(/\/api$/, '');

// Helper to format image URL
function resolveImageUrl(url, fallbackTitle) {
    if (!url) {
        return `https://placehold.co/800x600/1A1A2E/D4A843?text=${encodeURIComponent(fallbackTitle || 'Cay Tung')}`;
    }
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    }
    return `${API_BASE}${url.startsWith('/') ? '' : '/'}${url}`;
}

// Fallback albums data if backend is offline or loading
const fallbackGalleries = [
    {
        id: 1,
        title: 'Tiệc Cưới Gia Đình Nguyễn',
        category: 'wedding',
        description: 'Tiệc cưới 30 bàn tại nhà với khung rạp sang trọng và không gian hoa tươi lãng mạn.',
        cover_image: '/images/gallery/wedding-nguyen-cover.jpg',
        images: [
            { id: 101, image_url: '/images/gallery/wedding-nguyen-1.jpg', caption: 'Không gian sảnh cưới lãng mạn rực rỡ hoa tươi' },
            { id: 102, image_url: '/images/gallery/wedding-nguyen-2.jpg', caption: 'Bàn tiệc VIP được bài trí tinh tế' },
            { id: 103, image_url: '/images/gallery/wedding-nguyen-3.jpg', caption: 'Khu vực backdrop chụp ảnh lưu niệm cùng quan khách' },
            { id: 104, image_url: '/images/gallery/wedding-nguyen-4.jpg', caption: 'Đội ngũ phục vụ Cay Tung chu đáo suốt buổi tiệc' },
        ]
    },
    {
        id: 2,
        title: 'Sinh Nhật Bé Minh',
        category: 'birthday',
        description: 'Tiệc sinh nhật tròn 1 tuổi ấm cúng tràn ngập sắc màu và niềm vui cho các bé.',
        cover_image: '/images/gallery/birthday-minh-cover.jpg',
        images: [
            { id: 201, image_url: '/images/gallery/birthday-minh-1.jpg', caption: 'Backdrop sinh nhật bé Minh tông màu pastel xinh xắn' },
            { id: 202, image_url: '/images/gallery/birthday-minh-2.jpg', caption: 'Bàn tiệc ngọt, bánh kem tạo hình và kẹo trang trí' },
            { id: 203, image_url: '/images/gallery/birthday-minh-3.jpg', caption: 'Gia đình và các bạn nhỏ vui chơi hoạt náo' },
        ]
    },
    {
        id: 3,
        title: 'Tân Gia Anh Hùng',
        category: 'housewarming',
        description: 'Tiệc tân gia 20 bàn, thực đơn đặc biệt thịnh soạn mừng ngôi nhà mới khang trang.',
        cover_image: '/images/gallery/housewarming-hung-cover.jpg',
        images: [
            { id: 301, image_url: '/images/gallery/housewarming-hung-1.jpg', caption: 'Không gian tiệc tân gia ấm cúng tại tư gia' },
            { id: 302, image_url: '/images/gallery/housewarming-hung-2.jpg', caption: 'Thực đơn món ăn thịnh soạn đậm đà hương vị truyền thống' },
            { id: 303, image_url: '/images/gallery/housewarming-hung-3.jpg', caption: 'Khoảnh khắc nâng ly chúc mừng gia chủ an khang thịnh vượng' },
        ]
    },
    {
        id: 4,
        title: 'Liên Hoan Công Ty ABC',
        category: 'corporate',
        description: 'Tiệc tất niên cuối năm 50 bàn với hệ thống âm thanh ánh sáng hiện đại.',
        cover_image: '/images/gallery/corporate-abc-cover.jpg',
        images: [
            { id: 401, image_url: '/images/gallery/corporate-abc-1.jpg', caption: 'Sân khấu gala dinner cuối năm công ty ABC hoành tráng' },
            { id: 402, image_url: '/images/gallery/corporate-abc-2.jpg', caption: 'Toàn cảnh khán phòng với hơn 50 bàn tiệc sang trọng' },
            { id: 403, image_url: '/images/gallery/corporate-abc-3.jpg', caption: 'Tiết mục văn nghệ và trao giải sôi nổi' },
            { id: 404, image_url: '/images/gallery/corporate-abc-4.jpg', caption: 'Món ăn nóng hổi được tiếp tế liên tục bởi đầu bếp Cay Tung' },
        ]
    },
    {
        id: 5,
        title: 'Đám Giỗ Gia Đình Trần',
        category: 'memorial',
        description: 'Đám giỗ trang trọng 15 bàn, mâm cỗ truyền thống ấm cúng sum vầy họ hàng.',
        cover_image: '/images/gallery/memorial-tran-cover.jpg',
        images: [
            { id: 501, image_url: '/images/gallery/memorial-tran-1.jpg', caption: 'Mâm cỗ truyền thống trang nghiêm ấm áp hương vị quê nhà' },
            { id: 502, image_url: '/images/gallery/memorial-tran-2.jpg', caption: 'Con cháu các thế hệ quây quần sum họp ngày giỗ' },
        ]
    },
    {
        id: 6,
        title: 'Khai Trương Shop Hoa',
        category: 'opening',
        description: 'Tiệc khai trương vui nhộn, sôi động với tiệc finger food và rượu vang chúc mừng.',
        cover_image: '/images/gallery/opening-shop-cover.jpg',
        images: [
            { id: 601, image_url: '/images/gallery/opening-shop-1.jpg', caption: 'Lễ cắt băng khai trương tươi vui rực rỡ hoa chúc mừng' },
            { id: 602, image_url: '/images/gallery/opening-shop-2.jpg', caption: 'Khu vực tiệc đứng cocktail khai vị đón khách mời' },
            { id: 603, image_url: '/images/gallery/opening-shop-3.jpg', caption: 'Bàn tiệc teabreak bắt mắt và tinh tế' },
        ]
    },
    {
        id: 7,
        title: 'Tiệc Cưới Cô Linh & Anh Tuấn',
        category: 'wedding',
        description: 'Tiệc cưới ngoài trời 40 bàn phong cách lãng mạn tinh tế và ấn tượng.',
        cover_image: '/images/gallery/wedding-linhtuan-cover.jpg',
        images: [
            { id: 701, image_url: '/images/gallery/wedding-linhtuan-1.jpg', caption: 'Lối đi sân khấu ngoài trời rực rỡ ánh đèn và hoa tươi' },
            { id: 702, image_url: '/images/gallery/wedding-linhtuan-2.jpg', caption: 'Bàn tiệc tròn phong cách hiện đại lãng mạn' },
            { id: 703, image_url: '/images/gallery/wedding-linhtuan-3.jpg', caption: 'Nghi thức cắt bánh cưới và rót rượu champagne chúc phúc' },
        ]
    },
    {
        id: 8,
        title: 'Đầy Tháng Bé An',
        category: 'baby',
        description: 'Tiệc thôi nôi 10 bàn ấm cúng với góc chụp ảnh lưu niệm ngộ nghĩnh cho bé.',
        cover_image: '/images/gallery/baby-an-cover.jpg',
        images: [
            { id: 801, image_url: '/images/gallery/baby-an-1.jpg', caption: 'Bàn tiệc thôi nôi đầy tháng ấm cúng gia đình' },
            { id: 802, image_url: '/images/gallery/baby-an-2.jpg', caption: 'Mâm lễ đầy tháng truyền thống chuẩn phong tục' },
        ]
    },
    {
        id: 9,
        title: 'Đám Hỏi Nhà Hảo',
        category: 'engagement',
        description: 'Lễ đám hỏi truyền thống trang nghiêm và ấm áp tình thân hai họ.',
        cover_image: '/images/gallery/engagement-hao-cover.jpg',
        images: [
            { id: 901, image_url: '/images/gallery/engagement-hao-1.jpg', caption: 'Không gian lễ đính hôn trang trọng thanh lịch' },
            { id: 902, image_url: '/images/gallery/engagement-hao-2.jpg', caption: 'Đội hình bưng mâm quả và gia đình hai họ gặp mặt' },
        ]
    }
];

export default function GalleryPage() {
    const [activeCategory, setActiveCategory] = useState('all');
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);

    // Lightbox modal state
    const [selectedAlbum, setSelectedAlbum] = useState(null);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    // Fetch albums from backend
    useEffect(() => {
        let isMounted = true;
        setLoading(true);

        getGallery(activeCategory)
            .then((res) => {
                if (isMounted) {
                    const data = res.data?.data || [];
                    if (data.length > 0) {
                        setAlbums(data);
                    } else {
                        // Fallback to static sample albums
                        const filtered = activeCategory === 'all'
                            ? fallbackGalleries
                            : fallbackGalleries.filter(item => item.category === activeCategory);
                        setAlbums(filtered);
                    }
                }
            })
            .catch((err) => {
                console.warn('[Gallery] Using fallback data:', err?.message);
                if (isMounted) {
                    const filtered = activeCategory === 'all'
                        ? fallbackGalleries
                        : fallbackGalleries.filter(item => item.category === activeCategory);
                    setAlbums(filtered);
                }
            })
            .finally(() => {
                if (isMounted) setLoading(false);
            });

        return () => { isMounted = false; };
    }, [activeCategory]);

    // Open lightbox
    const openLightbox = (album, startIndex = 0) => {
        const images = album.images && album.images.length > 0
            ? album.images
            : [{ id: 0, image_url: album.cover_image, caption: album.title }];
        setSelectedAlbum({ ...album, images });
        setActiveImageIndex(startIndex);
    };

    const closeLightbox = () => {
        setSelectedAlbum(null);
        setActiveImageIndex(0);
    };

    const nextImage = useCallback(() => {
        if (!selectedAlbum?.images?.length) return;
        setActiveImageIndex((prev) => (prev + 1) % selectedAlbum.images.length);
    }, [selectedAlbum]);

    const prevImage = useCallback(() => {
        if (!selectedAlbum?.images?.length) return;
        setActiveImageIndex((prev) => (prev - 1 + selectedAlbum.images.length) % selectedAlbum.images.length);
    }, [selectedAlbum]);

    // Keyboard navigation for Lightbox
    useEffect(() => {
        if (!selectedAlbum) return;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedAlbum, nextImage, prevImage]);

    const currentImage = selectedAlbum?.images?.[activeImageIndex];

    return (
        <>
            {/* Page Header */}
            <div className="page-header" style={{ padding: '120px 0 60px', backgroundColor: 'var(--color-dark)', color: 'white', textAlign: 'center' }}>
                <div className="container">
                    <h1 style={{ color: 'var(--color-gold)', marginBottom: '20px' }}>Thư Viện Ảnh</h1>
                    <div style={{ width: '60px', height: '3px', backgroundColor: 'var(--color-primary)', margin: '0 auto 20px' }}></div>
                    <p style={{ fontSize: '1.2rem', color: '#ccc' }}>Những Khoảnh Khắc Đáng Nhớ Cùng Ẩm Thực Cây Tùng</p>
                </div>
            </div>

            {/* Gallery Section */}
            <section className="section" style={{ padding: '60px 0', minHeight: '60vh' }}>
                <div className="container">
                    {/* Category Filter Tabs */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', marginBottom: '40px' }}>
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                style={{
                                    padding: '8px 20px',
                                    borderRadius: '30px',
                                    border: `1px solid ${activeCategory === cat.id ? 'var(--color-primary)' : '#ddd'}`,
                                    backgroundColor: activeCategory === cat.id ? 'var(--color-primary)' : 'transparent',
                                    color: activeCategory === cat.id ? 'white' : 'inherit',
                                    cursor: 'pointer',
                                    fontWeight: activeCategory === cat.id ? '600' : 'normal',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    {/* Album Grid */}
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '60px 0', color: '#888' }}>
                            <p style={{ fontSize: '1.1rem' }}>Đang tải thư viện ảnh...</p>
                        </div>
                    ) : albums.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '60px 0', color: '#888' }}>
                            <p>Không có album ảnh nào trong danh mục này.</p>
                        </div>
                    ) : (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                            gap: '30px'
                        }}>
                            {albums.map((album) => {
                                const photoCount = album.images?.length || album.image_count || 1;
                                const coverSrc = resolveImageUrl(album.cover_image, album.title);
                                const fallbackPlaceholder = `https://placehold.co/600x400/1A1A2E/D4A843?text=${encodeURIComponent(album.title)}`;

                                return (
                                    <div
                                        key={album.id}
                                        onClick={() => openLightbox(album)}
                                        style={{
                                            borderRadius: '12px',
                                            overflow: 'hidden',
                                            boxShadow: '0 4px 18px rgba(0,0,0,0.08)',
                                            backgroundColor: 'white',
                                            cursor: 'pointer',
                                            transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                                            display: 'flex',
                                            flexDirection: 'column'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'translateY(-6px)';
                                            e.currentTarget.style.boxShadow = '0 12px 28px rgba(0,0,0,0.15)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = '0 4px 18px rgba(0,0,0,0.08)';
                                        }}
                                    >
                                        {/* Image Container with Badge */}
                                        <div style={{ position: 'relative', width: '100%', height: '240px', backgroundColor: '#1A1A2E', overflow: 'hidden' }}>
                                            <img
                                                src={coverSrc}
                                                alt={album.title}
                                                onError={(e) => { e.target.src = fallbackPlaceholder; }}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }}
                                            />
                                            {/* Photo Count Badge */}
                                            <span style={{
                                                position: 'absolute',
                                                bottom: '12px',
                                                right: '12px',
                                                backgroundColor: 'rgba(0, 0, 0, 0.75)',
                                                color: '#fff',
                                                padding: '4px 10px',
                                                borderRadius: '20px',
                                                fontSize: '0.8rem',
                                                fontWeight: '600',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '5px',
                                                backdropFilter: 'blur(4px)'
                                            }}>
                                                <FiCamera /> {photoCount} ảnh
                                            </span>
                                        </div>

                                        {/* Content info */}
                                        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                                <span style={{
                                                    display: 'inline-block',
                                                    padding: '3px 12px',
                                                    backgroundColor: 'var(--color-cream)',
                                                    color: 'var(--color-primary)',
                                                    borderRadius: '20px',
                                                    fontSize: '0.8rem',
                                                    fontWeight: '600'
                                                }}>
                                                    {categories.find(c => c.id === album.category)?.label || album.category}
                                                </span>
                                            </div>
                                            <h3 style={{ margin: '0 0 10px 0', fontSize: '1.25rem', color: '#1A1A2E' }}>
                                                {album.title}
                                            </h3>
                                            <p style={{ margin: '0 0 16px 0', color: '#666', fontSize: '0.92rem', lineHeight: '1.5', flexGrow: 1 }}>
                                                {album.description}
                                            </p>
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '6px',
                                                color: 'var(--color-primary)',
                                                fontSize: '0.9rem',
                                                fontWeight: '600'
                                            }}>
                                                <FiLayers /> Xem bộ sưu tập ({photoCount} ảnh) &rarr;
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

            {/* Lightbox / Album Modal Viewer */}
            {selectedAlbum && (
                <div
                    style={{
                        position: 'fixed',
                        inset: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.92)',
                        zIndex: 99999,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        padding: '16px'
                    }}
                    onClick={closeLightbox}
                >
                    {/* Header */}
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            color: 'white',
                            padding: '10px 20px',
                            zIndex: 2
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div>
                            <h2 style={{ margin: 0, fontSize: '1.3rem', color: 'var(--color-gold)' }}>
                                {selectedAlbum.title}
                            </h2>
                            <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#aaa' }}>
                                {categories.find(c => c.id === selectedAlbum.category)?.label} • Ảnh {activeImageIndex + 1} / {selectedAlbum.images.length}
                            </p>
                        </div>
                        <button
                            onClick={closeLightbox}
                            aria-label="Đóng"
                            style={{
                                background: 'rgba(255, 255, 255, 0.15)',
                                border: 'none',
                                color: 'white',
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                fontSize: '1.3rem',
                                transition: 'background 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'}
                        >
                            <FiX />
                        </button>
                    </div>

                    {/* Main Image Stage */}
                    <div
                        style={{
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexGrow: 1,
                            minHeight: 0,
                            margin: '10px 0'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Prev Button */}
                        {selectedAlbum.images.length > 1 && (
                            <button
                                onClick={prevImage}
                                aria-label="Ảnh trước"
                                style={{
                                    position: 'absolute',
                                    left: '16px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'rgba(0, 0, 0, 0.6)',
                                    color: 'white',
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    fontSize: '1.6rem',
                                    zIndex: 10,
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-primary)'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0, 0, 0, 0.6)'}
                            >
                                <FiChevronLeft />
                            </button>
                        )}

                        {/* Large Photo Display */}
                        <div style={{ maxWidth: '85vw', maxHeight: '68vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <img
                                src={resolveImageUrl(currentImage?.image_url, selectedAlbum.title)}
                                alt={currentImage?.caption || selectedAlbum.title}
                                onError={(e) => {
                                    e.target.src = `https://placehold.co/1000x700/1A1A2E/D4A843?text=${encodeURIComponent(selectedAlbum.title + ' - ' + (activeImageIndex + 1))}`;
                                }}
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '62vh',
                                    objectFit: 'contain',
                                    borderRadius: '8px',
                                    boxShadow: '0 8px 30px rgba(0,0,0,0.5)'
                                }}
                            />
                            {currentImage?.caption && (
                                <p style={{
                                    color: '#eee',
                                    marginTop: '12px',
                                    fontSize: '0.95rem',
                                    textAlign: 'center',
                                    backgroundColor: 'rgba(0,0,0,0.5)',
                                    padding: '6px 16px',
                                    borderRadius: '20px'
                                }}>
                                    {currentImage.caption}
                                </p>
                            )}
                        </div>

                        {/* Next Button */}
                        {selectedAlbum.images.length > 1 && (
                            <button
                                onClick={nextImage}
                                aria-label="Ảnh kế tiếp"
                                style={{
                                    position: 'absolute',
                                    right: '16px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'rgba(0, 0, 0, 0.6)',
                                    color: 'white',
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    fontSize: '1.6rem',
                                    zIndex: 10,
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-primary)'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0, 0, 0, 0.6)'}
                            >
                                <FiChevronRight />
                            </button>
                        )}
                    </div>

                    {/* Thumbnail Strip */}
                    {selectedAlbum.images.length > 1 && (
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                gap: '10px',
                                padding: '10px 0',
                                overflowX: 'auto',
                                zIndex: 2
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {selectedAlbum.images.map((img, idx) => {
                                const thumbSrc = resolveImageUrl(img.image_url, selectedAlbum.title);
                                const isCurrent = idx === activeImageIndex;
                                return (
                                    <div
                                        key={img.id || idx}
                                        onClick={() => setActiveImageIndex(idx)}
                                        style={{
                                            width: '65px',
                                            height: '45px',
                                            borderRadius: '6px',
                                            overflow: 'hidden',
                                            cursor: 'pointer',
                                            border: isCurrent ? '2px solid var(--color-gold)' : '2px solid transparent',
                                            opacity: isCurrent ? 1 : 0.5,
                                            transform: isCurrent ? 'scale(1.08)' : 'scale(1)',
                                            transition: 'all 0.2s',
                                            flexShrink: 0
                                        }}
                                    >
                                        <img
                                            src={thumbSrc}
                                            alt={`Thumbnail ${idx + 1}`}
                                            onError={(e) => {
                                                e.target.src = `https://placehold.co/100x70/1A1A2E/D4A843?text=${idx + 1}`;
                                            }}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}

            {/* Stats section */}
            <section className="section section--dark" style={{ backgroundColor: 'var(--color-dark)', padding: '60px 0', color: 'white' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px', textAlign: 'center' }}>
                        <div className="stat">
                            <span style={{ display: 'block', fontSize: '3rem', fontWeight: 'bold', color: 'var(--color-gold)' }}>500+</span>
                            <span style={{ fontSize: '1.1rem', color: '#ccc' }}>Sự Kiện Đã Tổ Chức</span>
                        </div>
                        <div className="stat">
                            <span style={{ display: 'block', fontSize: '3rem', fontWeight: 'bold', color: 'var(--color-gold)' }}>150+</span>
                            <span style={{ fontSize: '1.1rem', color: '#ccc' }}>Tiệc Cưới</span>
                        </div>
                        <div className="stat">
                            <span style={{ display: 'block', fontSize: '3rem', fontWeight: 'bold', color: 'var(--color-gold)' }}>200</span>
                            <span style={{ fontSize: '1.1rem', color: '#ccc' }}>Sức Chứa Tối Đa</span>
                        </div>
                        <div className="stat">
                            <span style={{ display: 'block', fontSize: '3rem', fontWeight: 'bold', color: 'var(--color-gold)' }}>98%</span>
                            <span style={{ fontSize: '1.1rem', color: '#ccc' }}>Mức Độ Hài Lòng</span>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
