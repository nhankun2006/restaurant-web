import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Response interceptor to log matching error logs in browser console
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            console.error(
                `[API Error ${error.response.status}] ${error.config?.method?.toUpperCase()} ${error.config?.url}:`,
                error.response.data
            );
        } else if (error.request) {
            console.error(`[API Network Error] No response received from ${error.config?.url}`, error.message);
        } else {
            console.error('[API Request Error]', error.message);
        }
        return Promise.reject(error);
    }
);

// Menu API
export const getCategories = () => apiClient.get('/menu/categories');
export const getMenuItems = (category) => {
    const params = category ? { category } : {};
    return apiClient.get('/menu/items', { params });
};
export const getFeaturedItems = () => apiClient.get('/menu/featured');
export const getMenuItemDetail = (id) => apiClient.get(`/menu/items/${id}`);

// Combo API
export const getComboMenus = () => apiClient.get('/combos');
export const getComboMenu = (slug) => apiClient.get(`/combos/${slug}`);

// Banquet API
export const getBanquetServices = () => apiClient.get('/banquets/services');
export const createBanquetBooking = (data) => apiClient.post('/banquets/bookings', data);

// Events API
export const getEvents = () => apiClient.get('/events');
export const getEventBySlug = (slug) => apiClient.get(`/events/${slug}`);

// Bookings API
export const createBooking = (data) => apiClient.post('/bookings', data);

export default apiClient;
