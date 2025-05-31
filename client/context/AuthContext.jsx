// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);      // Stores user data
  const [token, setToken] = useState(null);    // Stores JWT token

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    const savedToken = localStorage.getItem('token');

    if (savedUser && savedToken) {
      setUser(savedUser);
      setToken(savedToken);
    }
  }, []);

  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', jwtToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using AuthContext
export const useAuth = () => useContext(AuthContext);
