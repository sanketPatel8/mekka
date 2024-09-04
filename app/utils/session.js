// utils/session.js
export const saveSession = (key, value) => {
  typeof window != 'undefined' ? localStorage.setItem(key, JSON.stringify(value)) : '';
};

export const getSession = (key) => {
  const sessionData = typeof window != 'undefined' ? localStorage.getItem(key) : '';
  return sessionData ? JSON.parse(sessionData) : null;
};

export const clearSession = (key) => {
  typeof window != 'undefined' ? localStorage.removeItem(key) : '';
};
