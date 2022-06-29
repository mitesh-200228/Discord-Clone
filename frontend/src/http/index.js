import axios from 'axios';
require('dotenv').config();
const api = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    }
    // /api/send-otp
});

export const sendOtp = (data) => api.post('/api/send-otp',data);
export const verifyOtp = (data) => api.post('/api/verify-otp',data);
export const activate = (data) => api.post('/api/activate',data);
export const logout = () => api.post('/api/logout');
export const createRoom = (data) => api.post('/api/rooms',data);
export const getAllRooms = () => api.get('/api/rooms');

//interseptors
api.interceptors.response.use((config)=>{
    return config;
},async (error)=>{
    const originalOne = error.config;
    if(error.response.status === 401 && error.config && !error.config._isRetry){
        originalOne.isRetry = true;
        try{
            const response = await axios.get(`http://localhost:8000/api/refresh`,{
                withCredentials:true
            });
            console.log(response);
            return api.request(originalOne);
        }catch(err){
            console.log(err.message);
        }
    }
    throw error;
});

export default api;