// src/lib/auth.js
export const getToken = () => localStorage.getItem('token');  // or read cookie
export const isLoggedIn = () => !!getToken();
