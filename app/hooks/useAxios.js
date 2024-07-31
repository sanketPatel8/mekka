"use client"

// app/hooks/useAxios.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useAxios = (url, method = 'GET', body = null, options = {}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          url,
          method,
          data: body,
          ...options,
        });
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, method, body, options]);

  return { data, error, loading };
};

export default useAxios;
