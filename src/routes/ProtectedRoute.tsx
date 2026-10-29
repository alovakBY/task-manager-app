import { Navigate, Outlet } from 'react-router';

import { PATHS } from './constants';

export const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem('is_auth') === 'true';
  const isLoading = false;

  if (isLoading) {
    return <div>Проверка авторизации...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to={PATHS.LOGIN} replace />;
  }

  return <Outlet />;
};
