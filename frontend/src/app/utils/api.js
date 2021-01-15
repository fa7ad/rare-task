import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API
});

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('app_token');
    if (token) config.headers.Authorization = token;
    return config;
  },
  error => Promise.reject(error)
);

export default api;
