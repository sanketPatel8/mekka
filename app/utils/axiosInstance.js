// utils/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  config => {
    // Add token to headers if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    // Handle errors
    if (error.response) {
      // Server responded with a status other than 200 range
      console.error('Response error', error.response);
    } else if (error.request) {
      // Request was made but no response received
      console.error('Request error', error.request);
    } else {
      // Something else caused an error
      console.error('Error', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
