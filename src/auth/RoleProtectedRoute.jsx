import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

/**
 * Protects routes by required permission.
 * Redirects to /unauthorized if permission is missing.
 */
const RoleProtectedRoute = ({ permission }) => {
  const { isAuthenticated, user } = useContext(AuthContext);

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!user?.permissions?.includes(permission)) return <Navigate to="/unauthorized" replace />;
  return <Outlet />;
};

export default RoleProtectedRoute;
