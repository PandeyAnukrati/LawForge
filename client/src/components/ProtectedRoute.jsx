// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isLoggedIn } from '@/lib/auth';

const ProtectedRoute = () => {
  const location = useLocation();

  if (isLoggedIn()) {
    return <Outlet />;               // ✅ render the nested route (Dashboard)
  }

  // ❌ not logged in – bounce to /login and store current URL for after-login redirect
  return <Navigate to="/login" replace state={{ from: location }} />;
};

export default ProtectedRoute;
