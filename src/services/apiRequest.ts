import axios from 'axios';

import { baseURL } from '../urls/urls';

const token = process.env.REACT_APP_TMDB_TOKEN;

export const apiRequest = axios.create({
  baseURL,
  timeout: 10000,
});

apiRequest.interceptors.request.use((config) => {
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiRequest.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('TMDB API error:', {
      message: error.message,
      status: error.response?.status,
      url: error.config?.url,
      data: error.response?.data,
    });

    return Promise.reject(error);
  },
);