'use client';

import { useState, useEffect, useRef } from 'react';
import './admin.css';
import {
    adminGetCategories,
    adminCreateCategory,
    adminUpdateCategory,
    adminDeleteCategory,
    adminGetMenuItems,
    adminCreateMenuItem,
    adminUpdateMenuItem,
    adminDeleteMenuItem,
    adminGetBookings,
    adminDeleteBooking,
    adminGetBanquetBookings,
    adminUpdateBanquetStatus,
    adminDeleteBanquetBooking,
    adminGetComboMenus,
    adminGetGalleries,
    adminCreateGallery,
    adminUpdateGallery,
    adminDeleteGallery,
    adminUploadGalleryImages,
    adminDeleteGalleryImage,
} from '@/api/adminClient';

// Base URL used only for rendering image previews
const IMAGE_BASE =
    (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000').replace(/\/api$/, '');

// ─── Tiny helpers ────────────────────────────────────────────────────────────

function fmt(val) {
    if (val === null || val === undefined) return '—';
    if (typeof val === 'boolean') return val ? '✅' : '❌';
    return String(val);
}

function formatPrice(p) {
    return Number(p).toLocaleString('vi-VN') + '₫';
}

// ─── Image preview ────────────────────────────────────────────────────────────

function ImagePreview({ src }) {
    if (!src) return <span style={{ color: '#888' }}>Chưa có ảnh</span>;
    const url = src.startsWith('/') ? `${IMAGE_BASE}${src}` : src;
    return (
        <img
            src={url}
            alt="preview"
            style={{ maxWidth: 80, maxHeight: 60, borderRadius: 4, objectFit: 'cover' }}
        />
    );
}

// ─── Reusable table ───────────────────────────────────────────────────────────

function AdminTable({ columns, rows, onEdit, onDelete }) {
    if (!rows.length)
        return <p style={{ color: '#888', padding: '8px 0' }}>Chưa có dữ liệu.</p>;

    return (
        <div style={{ overflowX: 'auto' }}>
            <table className="admin-table">
                <thead>
                    <tr>
                        {columns.map((c) => (
                            <th key={c.key}>{c.label}</th>
                        ))}
                        {(onEdit || onDelete) && <th>Hành động</th>}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, i) => (
                        <tr key={row.id ?? i}>
                            {columns.map((c) => (
                                <td key={c.key}>
                                    {c.render ? c.render(row[c.key], row) : fmt(row[c.key])}
                                </td>
                            ))}
                            {(onEdit || onDelete) && (
                                <td className="action-cell">
                                    {onEdit && (
                                        <button className="btn-edit" onClick={() => onEdit(row)}>
                                            Xem
                                        </button>
                                    )}
                                    {onDelete && (
                                        <button className="btn-del" onClick={() => onDelete(row.id)}>
                                            Xóa
                                        </button>
                                    )}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// ─── Modal ────────────────────────────────────────────────────────────────────

function Modal({ title, onClose, children }) {
    return (
        <div className="modal-backdrop">
            <div className="modal-box">
                <div className="modal-header">
                    <h3>{title}</h3>
                    <button className="modal-close" onClick={onClose}>
                        ✕
                    </button>
                </div>
                <div className="modal-body">{children}</div>
            </div>
        </div>
    );
}

// ─── Flash message ────────────────────────────────────────────────────────────

function Flash({ msg, onDismiss }) {
    if (!msg) return null;
    return (
        <div className="flash">
            {msg}
            <button onClick={onDismiss}>✕</button>
        </div>
    );
}

// ─── Tabs ─────────────────────────────────────────────────────────────────────

const TABS = ['Danh mục', 'Món ăn', 'Gallery', 'Đặt bàn', 'Đặt tiệc'];

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION: Categories
// ═══════════════════════════════════════════════════════════════════════════════

function CategoriesSection() {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [msg, setMsg] = useState('');
    const [modal, setModal] = useState(null); // null | 'create' | <row object>
    const formRef = useRef();

    async function load() {
        setLoading(true);
        try {
            const res = await adminGetCategories();
            setRows(res.data.data || []);
        } catch {
            setMsg('❌ Không thể tải danh mục.');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { load(); }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        const fd = new FormData(formRef.current);
        const isEdit = modal && modal !== 'create';
        try {
            const res = isEdit
                ? await adminUpdateCategory(modal.id, fd)
                : await adminCreateCategory(fd);
            setMsg(res.data.message);
            setModal(null);
            load();
        } catch (err) {
            const detail = err.response?.data?.detail || err.message;
            setMsg('❌ ' + detail);
        }
    }

    async function handleDelete(id) {
        if (!confirm('Xóa danh mục này? Tất cả món trong danh mục sẽ bị xóa!')) return;
        try {
            const res = await adminDeleteCategory(id);
            setMsg(res.data.message);
            load();
        } catch (err) {
            setMsg('❌ ' + (err.response?.data?.detail || err.message));
        }
    }

    const editRow = modal && modal !== 'create' ? modal : null;

    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Tên' },
        { key: 'slug', label: 'Slug' },
        { key: 'description', label: 'Mô tả' },
        { key: 'image_url', label: 'Ảnh', render: (v) => <ImagePreview src={v} /> },
    ];

    return (
        <div>
            <div className="section-header">
                <h2>Danh mục</h2>
                <button className="btn-primary" onClick={() => setModal('create')}>
                    + Thêm danh mục
                </button>
            </div>
            <Flash msg={msg} onDismiss={() => setMsg('')} />
            {loading ? <p>Đang tải…</p> : (
                <AdminTable columns={columns} rows={rows} onEdit={setModal} onDelete={handleDelete} />
            )}

            {modal && (
                <Modal
                    title={editRow ? `Sửa danh mục #${editRow.id}` : 'Thêm danh mục'}
                    onClose={() => setModal(null)}
                >
                    <form ref={formRef} onSubmit={handleSubmit} className="admin-form">
                        <label>
                            Tên *
                            <input name="name" required defaultValue={editRow?.name} />
                        </label>
                        <label>
                            Slug *
                            <input
                                name="slug"
                                required
                                defaultValue={editRow?.slug}
                                placeholder="vd: com-chien"
                            />
                        </label>
                        <label>
                            Mô tả
                            <textarea name="description" defaultValue={editRow?.description} rows={3} />
                        </label>
                        <label>
                            Ảnh {editRow ? '(để trống nếu không thay đổi)' : ''}
                            <input type="file" name="image" accept="image/*" />
                        </label>
                        {editRow?.image_url && (
                            <div>
                                Ảnh hiện tại: <ImagePreview src={editRow.image_url} />
                            </div>
                        )}
                        <div className="form-actions">
                            <button type="button" onClick={() => setModal(null)}>
                                Hủy
                            </button>
                            <button type="submit" className="btn-primary">
                                Lưu
                            </button>
                        </div>
                    </form>
                </Modal>
            )}
        </div>
    );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION: Menu Items
// ═══════════════════════════════════════════════════════════════════════════════

function MenuItemsSection() {
    const [rows, setRows] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [msg, setMsg] = useState('');
    const [modal, setModal] = useState(null);
    const formRef = useRef();

    async function load() {
        setLoading(true);
        try {
            const [itemsRes, catsRes] = await Promise.all([
                adminGetMenuItems(),
                adminGetCategories(),
            ]);
            setRows(itemsRes.data.data || []);
            setCategories(catsRes.data.data || []);
        } catch {
            setMsg('❌ Không thể tải dữ liệu.');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { load(); }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        const fd = new FormData(formRef.current);
        const isEdit = modal && modal !== 'create';
        try {
            const res = isEdit
                ? await adminUpdateMenuItem(modal.id, fd)
                : await adminCreateMenuItem(fd);
            setMsg(res.data.message);
            setModal(null);
            load();
        } catch (err) {
            setMsg('❌ ' + (err.response?.data?.detail || err.message));
        }
    }

    async function handleDelete(id) {
        if (!confirm('Xóa món này?')) return;
        try {
            const res = await adminDeleteMenuItem(id);
            setMsg(res.data.message);
            load();
        } catch (err) {
            setMsg('❌ ' + (err.response?.data?.detail || err.message));
        }
    }

    const editRow = modal && modal !== 'create' ? modal : null;

    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'category_name', label: 'Danh mục' },
        { key: 'name', label: 'Tên món' },
        { key: 'price', label: 'Giá', render: (v) => formatPrice(v) },
        { key: 'is_featured', label: 'Nổi bật' },
        { key: 'is_available', label: 'Hiển thị' },
        { key: 'image_url', label: 'Ảnh', render: (v) => <ImagePreview src={v} /> },
        {
            key: 'description',
            label: 'Mô tả',
            render: (v) => (v ? v.substring(0, 60) + (v.length > 60 ? '…' : '') : '—'),
        },
    ];

    return (
        <div>
            <div className="section-header">
                <h2>Món ăn</h2>
                <button className="btn-primary" onClick={() => setModal('create')}>
                    + Thêm món
                </button>
            </div>
            <Flash msg={msg} onDismiss={() => setMsg('')} />
            {loading ? <p>Đang tải…</p> : (
                <AdminTable columns={columns} rows={rows} onEdit={setModal} onDelete={handleDelete} />
            )}

            {modal && (
                <Modal
                    title={editRow ? `Sửa món #${editRow.id} — ${editRow.name}` : 'Thêm món mới'}
                    onClose={() => setModal(null)}
                >
                    <form ref={formRef} onSubmit={handleSubmit} className="admin-form">
                        <label>
                            Danh mục *
                            <select name="category_id" required defaultValue={editRow?.category_id ?? ''}>
                                <option value="">— Chọn danh mục —</option>
                                {categories.map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Tên món *
                            <input name="name" required defaultValue={editRow?.name} />
                        </label>
                        <label>
                            Mô tả
                            <textarea name="description" rows={3} defaultValue={editRow?.description} />
                        </label>
                        <label>
                            Giá (VNĐ) *
                            <input
                                name="price"
                                type="number"
                                required
                                min={0}
                                step={1000}
                                defaultValue={editRow?.price}
                            />
                        </label>
                        <div className="admin-row-2">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="is_featured"
                                    value="true"
                                    defaultChecked={editRow?.is_featured}
                                />
                                Món nổi bật
                            </label>
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="is_available"
                                    value="true"
                                    defaultChecked={editRow?.is_available ?? true}
                                />
                                Đang bán
                            </label>
                        </div>
                        <label>
                            Ảnh {editRow ? '(để trống nếu không thay đổi)' : ''}
                            <input type="file" name="image" accept="image/*" />
                        </label>
                        {editRow?.image_url && (
                            <div>
                                Ảnh hiện tại: <ImagePreview src={editRow.image_url} />
                            </div>
                        )}
                        <div className="form-actions">
                            <button type="button" onClick={() => setModal(null)}>
                                Hủy
                            </button>
                            <button type="submit" className="btn-primary">
                                Lưu
                            </button>
                        </div>
                    </form>
                </Modal>
            )}
        </div>
    );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION: Galleries
// ═══════════════════════════════════════════════════════════════════════════════

const GALLERY_CATEGORIES = [
    { id: 'wedding', label: 'Tiệc Cưới' },
    { id: 'birthday', label: 'Tiệc Sinh Nhật' },
    { id: 'housewarming', label: 'Tiệc Tân Gia' },
    { id: 'corporate', label: 'Tiệc Công Ty' },
    { id: 'memorial', label: 'Tiệc Đám Giỗ' },
    { id: 'opening', label: 'Tiệc Khai Trương' },
    { id: 'baby', label: 'Tiệc Thôi Nôi' },
    { id: 'engagement', label: 'Tiệc Đám Hỏi' }
];

function GalleriesSection() {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [msg, setMsg] = useState('');
    const [modal, setModal] = useState(null); // null | 'create' | editRow
    const [uploading, setUploading] = useState(false);
    const formRef = useRef(null);
    const uploadFormRef = useRef(null);

    const editRow = modal && modal !== 'create' ? modal : null;

    const load = () => {
        setLoading(true);
        adminGetGalleries()
            .then((r) => setRows(r.data.data))
            .catch((e) => setMsg(`Lỗi tải gallery: ${e.response?.data?.detail || e.message}`))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        load();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm(`Xóa album #${id} cùng toàn bộ ảnh trong album này?`)) return;
        try {
            await adminDeleteGallery(id);
            setMsg('Đã xóa album');
            if (modal) setModal(null);
            load();
        } catch (e) {
            setMsg(`Lỗi xóa: ${e.response?.data?.detail || e.message}`);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const fd = new FormData(formRef.current);
        const img = fd.get('cover_image');
        if (img && img.size === 0) fd.delete('cover_image');

        try {
            if (editRow) {
                const res = await adminUpdateGallery(editRow.id, fd);
                setMsg('Đã cập nhật album');
                setModal(res.data.data);
            } else {
                await adminCreateGallery(fd);
                setMsg('Đã tạo album mới');
                setModal(null);
            }
            load();
        } catch (err) {
            setMsg(`Lỗi lưu: ${err.response?.data?.detail || err.message}`);
        }
    };

    const handleUploadImages = async (e) => {
        e.preventDefault();
        if (!editRow) return;
        const fd = new FormData(uploadFormRef.current);
        const files = fd.getAll('images');
        if (!files || files.length === 0 || files[0].size === 0) {
            alert('Vui lòng chọn ít nhất 1 ảnh để tải lên');
            return;
        }

        setUploading(true);
        try {
            const res = await adminUploadGalleryImages(editRow.id, fd);
            setMsg(res.data.message || 'Đã tải ảnh lên album');
            if (uploadFormRef.current) uploadFormRef.current.reset();

            const updatedImages = [...(editRow.images || []), ...(res.data.data || [])];
            setModal({
                ...editRow,
                images: updatedImages,
                image_count: updatedImages.length,
                cover_image: editRow.cover_image || res.data.data?.[0]?.image_url
            });
            load();
        } catch (err) {
            setMsg(`Lỗi tải ảnh: ${err.response?.data?.detail || err.message}`);
        } finally {
            setUploading(false);
        }
    };

    const handleDeleteImage = async (imageId) => {
        if (!confirm('Bạn có chắc muốn xóa ảnh này khỏi album?')) return;
        try {
            await adminDeleteGalleryImage(imageId);
            setMsg('Đã xóa ảnh');
            if (editRow) {
                const updatedImages = (editRow.images || []).filter(img => img.id !== imageId);
                setModal({
                    ...editRow,
                    images: updatedImages,
                    image_count: updatedImages.length
                });
            }
            load();
        } catch (err) {
            setMsg(`Lỗi xóa ảnh: ${err.response?.data?.detail || err.message}`);
        }
    };

    const columns = [
        {
            key: 'cover_image',
            label: 'Ảnh bìa',
            render: (v) => <ImagePreview src={v} />
        },
        { key: 'title', label: 'Tên album' },
        {
            key: 'category',
            label: 'Loại tiệc',
            render: (v) => {
                const cat = GALLERY_CATEGORIES.find(c => c.id === v);
                return (
                    <span style={{
                        padding: '3px 8px',
                        background: '#2a2a35',
                        borderRadius: '12px',
                        fontSize: '12px',
                        color: '#c9a96e'
                    }}>
                        {cat ? cat.label : v}
                    </span>
                );
            }
        },
        {
            key: 'image_count',
            label: 'Số ảnh',
            render: (v, row) => (
                <span style={{ fontWeight: 600, color: '#e2e2e2' }}>
                    📷 {row.images?.length ?? v ?? 0}
                </span>
            )
        },
        {
            key: 'description',
            label: 'Mô tả',
            render: (v) => (
                <span style={{ maxWidth: 220, display: 'inline-block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={v}>
                    {v || '—'}
                </span>
            )
        }
    ];

    return (
        <div>
            <div className="section-header">
                <h2>Bộ sưu tập Gallery ({rows.length} album)</h2>
                <button className="btn-primary" onClick={() => setModal('create')}>
                    + Thêm album
                </button>
            </div>
            <Flash msg={msg} onDismiss={() => setMsg('')} />
            {loading ? <p>Đang tải…</p> : (
                <AdminTable columns={columns} rows={rows} onEdit={setModal} onDelete={handleDelete} />
            )}

            {modal && (
                <Modal
                    title={editRow ? `Sửa album #${editRow.id}: ${editRow.title}` : 'Thêm album mới'}
                    onClose={() => setModal(null)}
                >
                    <form ref={formRef} onSubmit={handleSubmit} className="admin-form">
                        <label>
                            Tên album *
                            <input name="title" required defaultValue={editRow?.title} placeholder="vd: Tiệc Cưới Gia Đình Nguyễn" />
                        </label>
                        <label>
                            Loại tiệc *
                            <select name="category" required defaultValue={editRow?.category || 'wedding'}>
                                {GALLERY_CATEGORIES.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Mô tả
                            <textarea name="description" defaultValue={editRow?.description} rows={3} placeholder="Mô tả ngắn gọn về sự kiện / bữa tiệc..." />
                        </label>
                        <label>
                            Ảnh bìa đại diện {editRow ? '(để trống nếu giữ nguyên)' : ''}
                            <input type="file" name="cover_image" accept="image/*" />
                        </label>
                        {editRow?.cover_image && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <span>Ảnh bìa hiện tại:</span>
                                <ImagePreview src={editRow.cover_image} />
                            </div>
                        )}
                        <div className="form-actions">
                            <button type="button" onClick={() => setModal(null)}>
                                Đóng
                            </button>
                            <button type="submit" className="btn-primary">
                                {editRow ? 'Lưu thông tin album' : 'Tạo album'}
                            </button>
                        </div>
                    </form>

                    {/* Sub-section: Manage child images for this album */}
                    {editRow && (
                        <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid #2a2a35' }}>
                            <h4 style={{ margin: '0 0 12px', color: '#c9a96e', fontSize: '14px' }}>
                                📸 Danh sách ảnh trong album ({editRow.images?.length || 0} ảnh)
                            </h4>

                            {/* Current Images Grid */}
                            {(!editRow.images || editRow.images.length === 0) ? (
                                <p style={{ color: '#888', fontSize: '13px', margin: '8px 0' }}>Album này chưa có ảnh con nào.</p>
                            ) : (
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(105px, 1fr))',
                                    gap: '10px',
                                    maxHeight: '220px',
                                    overflowY: 'auto',
                                    padding: '8px',
                                    background: '#141418',
                                    borderRadius: '6px',
                                    marginBottom: '16px'
                                }}>
                                    {editRow.images.map((img) => (
                                        <div
                                            key={img.id}
                                            style={{
                                                position: 'relative',
                                                border: '1px solid #2a2a35',
                                                borderRadius: '6px',
                                                overflow: 'hidden',
                                                background: '#1a1a1f'
                                            }}
                                        >
                                            <div style={{ width: '100%', height: '70px', overflow: 'hidden' }}>
                                                <img
                                                    src={img.image_url?.startsWith('/') ? `${IMAGE_BASE}${img.image_url}` : img.image_url}
                                                    alt={img.caption || 'photo'}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                />
                                            </div>
                                            <div style={{ padding: '4px', fontSize: '11px', color: '#bbb', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={img.caption}>
                                                {img.caption || '(Không chú thích)'}
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteImage(img.id)}
                                                title="Xóa ảnh này"
                                                style={{
                                                    position: 'absolute',
                                                    top: '3px',
                                                    right: '3px',
                                                    background: 'rgba(220, 53, 69, 0.85)',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '50%',
                                                    width: '20px',
                                                    height: '20px',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontSize: '11px',
                                                    lineHeight: 1
                                                }}
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Upload New Images Form */}
                            <form ref={uploadFormRef} onSubmit={handleUploadImages} style={{ background: '#141418', padding: '12px', borderRadius: '6px' }}>
                                <div style={{ fontSize: '13px', fontWeight: 600, color: '#e2e2e2', marginBottom: '8px' }}>
                                    + Thêm ảnh vào album:
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <input
                                        type="file"
                                        name="images"
                                        accept="image/*"
                                        multiple
                                        required
                                        style={{ fontSize: '12px' }}
                                    />
                                    <input
                                        type="text"
                                        name="caption"
                                        placeholder="Chú thích ảnh (tùy chọn)..."
                                        style={{
                                            padding: '6px 10px',
                                            background: '#1a1a1f',
                                            border: '1px solid #2a2a35',
                                            borderRadius: '4px',
                                            color: '#e2e2e2',
                                            fontSize: '12px'
                                        }}
                                    />
                                    <button
                                        type="submit"
                                        disabled={uploading}
                                        className="btn-primary"
                                        style={{ alignSelf: 'flex-start', padding: '6px 14px', fontSize: '12px' }}
                                    >
                                        {uploading ? 'Đang tải lên…' : 'Tải ảnh lên'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </Modal>
            )}
        </div>
    );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION: Bookings
// ═══════════════════════════════════════════════════════════════════════════════

function BookingsSection() {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [msg, setMsg] = useState('');

    async function load() {
        setLoading(true);
        try {
            const res = await adminGetBookings();
            setRows(res.data.data || []);
        } catch {
            setMsg('❌ Không thể tải đặt bàn.');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { load(); }, []);

    async function handleDelete(id) {
        if (!confirm('Xóa đặt bàn này?')) return;
        try {
            const res = await adminDeleteBooking(id);
            setMsg(res.data.message);
            load();
        } catch (err) {
            setMsg('❌ ' + (err.response?.data?.detail || err.message));
        }
    }

    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Khách' },
        { key: 'phone', label: 'SĐT' },
        { key: 'email', label: 'Email' },
        { key: 'event_type', label: 'Loại tiệc' },
        { key: 'date', label: 'Ngày', render: (v) => (v ? String(v).substring(0, 10) : '—') },
        { key: 'time', label: 'Giờ' },
        { key: 'guests', label: 'Khách/bàn' },
        {
            key: 'message',
            label: 'Ghi chú',
            render: (v) => (v ? v.substring(0, 50) + (v.length > 50 ? '…' : '') : '—'),
        },
        {
            key: 'created_at',
            label: 'Tạo lúc',
            render: (v) => (v ? new Date(v).toLocaleString('vi-VN') : '—'),
        },
    ];

    return (
        <div>
            <div className="section-header">
                <h2>Đặt bàn</h2>
            </div>
            <Flash msg={msg} onDismiss={() => setMsg('')} />
            {loading ? <p>Đang tải…</p> : (
                <AdminTable columns={columns} rows={rows} onDelete={handleDelete} />
            )}
        </div>
    );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION: Banquet Bookings
// ═══════════════════════════════════════════════════════════════════════════════

const EVENT_TYPE_LABELS = {
    wedding: 'Tiệc Cưới',
    birthday: 'Sinh Nhật',
    housewarming: 'Tân Gia',
    party: 'Liên Hoan',
    corporate: 'Công Ty',
    engagement: 'Đám Hỏi',
    memorial: 'Đám Giỗ',
    opening: 'Khai Trương',
    baby: 'Thôi Nôi',
};

const STATUS_BADGES = {
    pending: '🟡 Chờ xử lý',
    confirmed: '🟢 Đã xác nhận',
    completed: '✅ Hoàn thành',
    cancelled: '🔴 Đã hủy',
};

function BanquetBookingsSection() {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [msg, setMsg] = useState('');
    const [modalRow, setModalRow] = useState(null);
    const formRef = useRef();

    async function load() {
        setLoading(true);
        try {
            const res = await adminGetBanquetBookings();
            setRows(res.data.data || []);
        } catch {
            setMsg('❌ Không thể tải danh sách đặt tiệc.');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { load(); }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        const fd = new FormData(formRef.current);
        const status = fd.get('status');
        const admin_notes = fd.get('admin_notes');
        try {
            await adminUpdateBanquetStatus(modalRow.id, { status, admin_notes });
            setMsg('Cập nhật thành công.');
            setModalRow(null);
            load();
        } catch (err) {
            setMsg('❌ ' + (err.response?.data?.detail || err.message));
        }
    }

    async function handleDelete(id) {
        if (!confirm('Xóa đặt tiệc này?')) return;
        try {
            await adminDeleteBanquetBooking(id);
            setMsg('Đã xóa đặt tiệc.');
            if (modalRow && modalRow.id === id) setModalRow(null);
            load();
        } catch (err) {
            setMsg('❌ ' + (err.response?.data?.detail || err.message));
        }
    }

    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'customer_name', label: 'Khách hàng' },
        { key: 'customer_phone', label: 'SĐT' },
        {
            key: 'banquet_type',
            label: 'Loại tiệc',
            render: (v) => EVENT_TYPE_LABELS[v] || v,
        },
        { key: 'event_date', label: 'Ngày', render: (v) => (v ? String(v).substring(0, 10) : '—') },
        { key: 'event_time', label: 'Giờ' },
        { key: 'table_count', label: 'Số bàn' },
        {
            key: 'status',
            label: 'Trạng thái',
            render: (v) => STATUS_BADGES[v] || v,
        },
        { key: 'estimated_total', label: 'Tổng ước tính', render: (v) => formatPrice(v || 0) },
        {
            key: 'created_at',
            label: 'Tạo lúc',
            render: (v) => (v ? new Date(v).toLocaleString('vi-VN') : '—'),
        },
    ];

    return (
        <div>
            <div className="section-header">
                <h2>Đặt tiệc</h2>
            </div>
            <Flash msg={msg} onDismiss={() => setMsg('')} />
            {loading ? <p>Đang tải…</p> : (
                <AdminTable columns={columns} rows={rows} onEdit={setModalRow} onDelete={handleDelete} />
            )}

            {modalRow && (
                <Modal
                    title={`Chi tiết tiệc #${modalRow.id} - ${modalRow.customer_name}`}
                    onClose={() => setModalRow(null)}
                >
                    <form ref={formRef} onSubmit={handleSubmit} className="admin-form">
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                            <div>
                                <strong>Thông tin khách hàng:</strong>
                                <p>Tên: {modalRow.customer_name}</p>
                                <p>SĐT: {modalRow.customer_phone}</p>
                                <p>Email: {modalRow.customer_email || '—'}</p>
                                <p>Địa chỉ: {modalRow.customer_address || '—'}</p>
                            </div>
                            <div>
                                <strong>Thông tin sự kiện:</strong>
                                <p>Loại: {EVENT_TYPE_LABELS[modalRow.banquet_type] || modalRow.banquet_type}</p>
                                <p>Ngày: {modalRow.event_date}</p>
                                <p>Giờ: {modalRow.event_time}</p>
                                <p>Số bàn: {modalRow.table_count}</p>
                            </div>
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <strong>Thực đơn:</strong>
                            {modalRow.combo_menu_id ? (
                                <p>Combo #{modalRow.combo_menu_id}</p>
                            ) : (
                                <p>Tự chọn ({(modalRow.custom_items || []).length} món)</p>
                            )}
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <strong>Dịch vụ đi kèm:</strong>
                            {modalRow.services && Object.keys(modalRow.services).length > 0 ? (
                                <ul>
                                    {Object.entries(modalRow.services).map(([svc, qty]) => (
                                        <li key={svc}>{svc}: {qty}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p>—</p>
                            )}
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <strong>Ghi chú của khách:</strong>
                            <p>{modalRow.notes || '—'}</p>
                        </div>

                        <label>
                            Ghi chú của admin
                            <textarea name="admin_notes" rows={3} defaultValue={modalRow.admin_notes || ''} />
                        </label>

                        <label>
                            Trạng thái
                            <select name="status" defaultValue={modalRow.status}>
                                <option value="pending">🟡 Chờ xử lý</option>
                                <option value="confirmed">🟢 Đã xác nhận</option>
                                <option value="completed">✅ Hoàn thành</option>
                                <option value="cancelled">🔴 Đã hủy</option>
                            </select>
                        </label>

                        <div className="form-actions" style={{ marginTop: '1.5rem' }}>
                            <button type="button" className="btn-del" onClick={() => handleDelete(modalRow.id)}>
                                Xóa đơn
                            </button>
                            <div style={{ flex: 1 }}></div>
                            <button type="button" onClick={() => setModalRow(null)}>
                                Hủy
                            </button>
                            <button type="submit" className="btn-primary">
                                Lưu thay đổi
                            </button>
                        </div>
                    </form>
                </Modal>
            )}
        </div>
    );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE ROOT
// ═══════════════════════════════════════════════════════════════════════════════

export default function AdminPage() {
    const [tab, setTab] = useState(0);

    return (
        <div className="admin-shell">
            <header className="admin-topbar">
                <span className="brand">🌿 Cây Tùng — Quản trị</span>
                <nav className="tab-bar">
                    {TABS.map((t, i) => (
                        <button
                            key={t}
                            className={`tab-btn${tab === i ? ' active' : ''}`}
                            onClick={() => setTab(i)}
                        >
                            {t}
                        </button>
                    ))}
                </nav>
            </header>

            <div className="admin-content">
                {tab === 0 && <CategoriesSection />}
                {tab === 1 && <MenuItemsSection />}
                {tab === 2 && <GalleriesSection />}
                {tab === 3 && <BookingsSection />}
                {tab === 4 && <BanquetBookingsSection />}
            </div>
        </div>
    );
}
