// utils/api.js
import axiosInstance from './axiosInstance';

const apiRequest = async (method, url, data = null) => {
  try {
    const response = await axiosInstance({
      method,
      url,
      data,
    });


    return response.data;
  } catch (error) {

    console.error('API request error:', error);
    throw error;
  }
};

export const get = (url) => apiRequest('GET', url);
export const post = (url, data) => apiRequest('POST', url, data);
export const put = (url, data) => apiRequest('PUT', url, data);
