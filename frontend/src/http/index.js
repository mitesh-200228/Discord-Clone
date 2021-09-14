import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000',
    Credentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
    // /api/send-otp
});

//List of all endpoints
export const sendOtp = (data) => api.post('/api/send-otp',data);
export const verifyOtp = (data) => api.post('/api/verify-otp',data);
export const activate = (data) => api.post('/api/activate',data);

export default api;