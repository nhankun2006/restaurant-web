import axios from 'axios';

// Admin endpoints live at /admin/api (same host as the main API, different prefix)
const ADMIN_BASE_URL =
    (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000').replace(/\/api$/, '') +
    '/admin/api';

const adminClient = axios.create({
    baseURL: ADMIN_BASE_URL,
    timeout: 30000, // longer timeout — image uploads can be slow
});

// Error interceptor (mirrors the main client)
adminClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            console.error(
                `[Admin API Error ${error.response.status}] ${error.config?.method?.toUpperCase()} ${error.config?.url}:`,
                error.response.data
            );
        } else if (error.request) {
            console.error(`[Admin API Network Error] No response from ${error.config?.url}`, error.message);
        } else {
            console.error('[Admin API Request Error]', error.message);
        }
        return Promise.reject(error);
    }
);

// ─── Categories ───────────────────────────────────────────────────────────────

export const adminGetCategories = () =>
    adminClient.get('/categories');

export const adminCreateCategory = (formData) =>
    adminClient.post('/categories', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

export const adminUpdateCategory = (id, formData) =>
    adminClient.put(`/categories/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

export const adminDeleteCategory = (id) =>
    adminClient.delete(`/categories/${id}`);

// ─── Menu Items ───────────────────────────────────────────────────────────────

export const adminGetMenuItems = () =>
    adminClient.get('/menu-items');

export const adminCreateMenuItem = (formData) =>
    adminClient.post('/menu-items', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

export const adminUpdateMenuItem = (id, formData) =>
    adminClient.put(`/menu-items/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

export const adminDeleteMenuItem = (id) =>
    adminClient.delete(`/menu-items/${id}`);

// ─── Bookings ─────────────────────────────────────────────────────────────────

export const adminGetBookings = () =>
    adminClient.get('/bookings');

export const adminDeleteBooking = (id) =>
    adminClient.delete(`/bookings/${id}`);

// ─── Banquet Bookings ─────────────────────────────────────────────────────────
// NOTE: Banquet endpoints use the public API base, not /admin/api
const PUBLIC_API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
const publicClient = axios.create({ baseURL: PUBLIC_API_BASE, timeout: 30000 });

export const adminGetBanquetBookings = () => publicClient.get('/banquets/bookings');
export const adminUpdateBanquetStatus = (id, data) => publicClient.put(`/banquets/bookings/${id}/status`, data);
export const adminDeleteBanquetBooking = (id) => publicClient.delete(`/banquets/bookings/${id}`);
export const adminGetComboMenus = () => publicClient.get('/combos');
export const adminGetBanquetServices = () => publicClient.get('/banquets/services');

export default adminClient;
