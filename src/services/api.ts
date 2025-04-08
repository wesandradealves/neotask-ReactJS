import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
  withXSRFToken: true,
  headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
  }
});

export const setupInterceptors = (setLoading: (loading: boolean) => void) => {
  // Request interceptor
  api.interceptors.request.use(
    (config) => {
      setLoading(true); 

      const token = sessionStorage.getItem('accessToken');

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      setLoading(false);
      return Promise.reject(error);
    }
  );

  // Response interceptor
  api.interceptors.response.use(
    (response) => {
      setLoading(false);
      return response;
    },
    (error) => {
      setLoading(false); 
      return Promise.reject(error);
    }
  );
};

export default api;