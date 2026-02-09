import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Function to set up response interceptors, called from a React context
export const setupAxiosInterceptors = (onLogout: () => void) => {
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        // 401 Unauthorized - token is invalid or expired
        Cookies.remove('token'); // Clear the invalid token
        onLogout(); // Trigger logout, which includes redirection
      }
      return Promise.reject(error);
    }
  );
};

export default api;
