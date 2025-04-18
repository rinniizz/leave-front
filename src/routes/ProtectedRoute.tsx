import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
  roles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, roles = [] }) => {
  const location = useLocation();
  const isAuth = localStorage.getItem('empId');
  const userRole = localStorage.getItem('empRole') || '';

  if (!isAuth) {
    return <Navigate to="/auth/login" state={{ from: location }} />;
  }

  if (roles.length && !roles.includes(userRole)) {
    return <Navigate to="/auth/login" state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
