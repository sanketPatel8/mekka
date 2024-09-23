import axios from "axios";
import { headers } from "./headers";
import { toast } from 'react-toastify';

let serverURL = process.env.NEXT_PUBLIC_API_URL;

export const DELETE = {
  request: async ({ url, token = "" }) => {
    let requestHeader = { ...headers }

    if (token) {
      requestHeader = {
        ...requestHeader,
        Authorization: `Bearer ${token}`,
      };
    }
    try {
      const data = await axios.delete(serverURL + url, { headers: requestHeader });
      if (data.status === 401) {
        return { data: '', accessError: true };
      } else {
        return data.data;
      }
    } catch (error) {
      if (error.response && error.response.status === 401 && window.location.pathname !== "/login" && window.location.pathname !== "/partner-login") {
        // window.location.href = "/vendor/login";
        
        return { data: '', accessError: true };
    } else {
        return { data: '', error: error.response ? error.response.data : 'Network or server error' };
    }
    }
  },
};
