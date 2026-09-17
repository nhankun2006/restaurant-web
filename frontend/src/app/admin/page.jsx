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
                                            Sửa
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

const TABS = ['Danh mục', 'Món ăn', 'Đặt bàn'];

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
                {tab === 2 && <BookingsSection />}
            </div>
        </div>
    );
}
