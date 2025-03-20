// utils/api.js
import axiosInstance from "./axiosInstance";

const apiRequest = async (method, url, data = null) => {
  let lang;

  if (typeof window !== "undefined") {
    lang = localStorage.getItem("locale"); // Replace "authToken" with your actual key
  }

  try {
    const formData = new FormData();

    // Add default language parameter
    formData.append("language", lang == "DE" ? "de" : lang == "EN" ? "en" : "");

    // If data is provided, append it to formData
    if (data) {
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
    }

    const response = await axiosInstance({
      method,
      url,
      data: formData, // Use FormData
      headers: {
        "Content-Type": "multipart/form-data", // Ensure correct headers
      },
    });

    return response.data;
  } catch (error) {
    console.error("API request error:", error);
    throw error;
  }
};

export const get = (url) => apiRequest("GET", url);
export const post = (url, data) => apiRequest("POST", url, data);
export const put = (url, data) => apiRequest("PUT", url, data);
