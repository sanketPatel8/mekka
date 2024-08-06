// utils/session.js
export const saveSession = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  
  export const getSession = (key) => {
    const sessionData = localStorage.getItem(key);
    return sessionData ? JSON.parse(sessionData) : null;
  };
  
  export const clearSession = (key) => {
    localStorage.removeItem(key);
  };
  