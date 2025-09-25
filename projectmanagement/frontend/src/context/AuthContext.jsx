import React, { createContext, useState, useEffect, useContext } from 'react';
import API, { setToken } from '../api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load token/user from localStorage
  useEffect(() => {
    const token = localStorage.getItem('pm_token');
    const storedUser = localStorage.getItem('pm_user');
    if (token && storedUser) {
      setToken(token);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  function login({ token, user }) {
    setToken(token);
    setUser(user);
    localStorage.setItem('pm_token', token);
    localStorage.setItem('pm_user', JSON.stringify(user));
  }

  function logout() {
    setToken(null);
    setUser(null);
    localStorage.removeItem('pm_token');
    localStorage.removeItem('pm_user');
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
