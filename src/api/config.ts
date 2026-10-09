import axios from 'axios';
import toast from 'react-hot-toast';
import paths from 'router/path';

const API_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000/api';

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Token ${token}`;
    }

    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = paths.login;
      toast.error('Your session has expired. Please sign in again.');
    }
    return Promise.reject(error);
  },
);

export const handleAxiosError = (error: unknown): never => {
  if (axios.isAxiosError(error) && error.response) {
    const data: unknown = error.response.data;
    if (typeof data === 'string' && data.trim()) {
      throw new Error(data);
    }

    if (typeof data === 'object' && data !== null) {
      const responseData = data as Record<string, unknown>;
      for (const key of ['error', 'detail']) {
        if (typeof responseData[key] === 'string') {
          throw new Error(responseData[key]);
        }
      }

      const messages = Object.values(responseData).flatMap((value) => {
        if (typeof value === 'string') {
          return [value];
        }
        if (Array.isArray(value)) {
          return value.filter(
            (message): message is string => typeof message === 'string',
          );
        }
        return [];
      });
      if (messages.length > 0) {
        throw new Error(messages.join(' '));
      }
    }

    throw new Error(`Request failed with status ${error.response.status}.`);
  }

  throw new Error('Unable to reach the service. Check your connection and try again.');
};
