import axios from "axios";
import Cookies from 'js-cookie'

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
})

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Use the CLEAN instance here
                await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/Auth/refresh_token`, {}, {
                    withCredentials: true
                });

                // Retry original request
                return api(originalRequest);
            } catch (refreshError) {
                // ... cleanup
                window.location.href = '/auth/login';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);


export default api;