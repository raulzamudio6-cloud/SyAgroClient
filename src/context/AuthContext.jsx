import React, { createContext, useState,  useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

const getInitialAuth = () => {
  const token = localStorage.getItem('accessToken');
  if (!token) return { accessToken: null, user: null };
  try {
    const user = jwtDecode(token);
    console.log('Decoded JWT:', user); // Log para inspeccionar el contenido del token
    if (!user.permissions) {
      console.warn('El token decodificado no contiene la propiedad permissions.');
    } else {
      console.log('Permisos del usuario:', user.permissions);
    }
    return { accessToken: token, user };
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return { accessToken: null, user: null };
  }
};

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(() => getInitialAuth().accessToken);
  const [user, setUser] = useState(() => getInitialAuth().user);

  const isAuthenticated = !!accessToken && !!user;

  const login = useCallback((token) => {
    localStorage.setItem('accessToken', token);
    setAccessToken(token);
    const decodedUser = jwtDecode(token);
    console.log('Usuario logueado:', decodedUser);
    setUser(decodedUser);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('accessToken');
    setAccessToken(null);
    setUser(null);
  }, []);

  // Placeholder for refresh token logic
  useCallback(async () => {
    // TODO: Implement refresh logic
    logout();
  }, [logout]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
