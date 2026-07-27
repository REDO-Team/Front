import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken')?.trim();

  if (accessToken) {
    config.headers.Authorization = /^Bearer\s+/i.test(accessToken)
      ? accessToken
      : `Bearer ${accessToken}`;
  }

  return config;
});

export default api;
