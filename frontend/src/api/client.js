import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Menu API
export const getCategories = () => apiClient.get('/menu/categories');
export const getMenuItems = (category) => {
    const params = category ? { category } : {};
    return apiClient.get('/menu/items', { params });
};
export const getFeaturedItems = () => apiClient.get('/menu/featured');

// Events API
export const getEvents = () => apiClient.get('/events');
export const getEventBySlug = (slug) => apiClient.get(`/events/${slug}`);

// Bookings API
export const createBooking = (data) => apiClient.post('/bookings', data);

export default apiClient;
