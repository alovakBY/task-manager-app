import { Navigate, Outlet } from 'react-router';

import { useAuth } from '@/features/auth/api/useAuth';
import { Loader } from '@/shared/view/components/Loader/Loader';

import { PATHS } from './constants';

export const ProtectedRoute = () => {
  const { isLoading, data } = useAuth();

  if (isLoading) {
    return <Loader isFullScreen />;
  }

  if (!data?.isAuth) {
    return <Navigate to={`/${PATHS.LOGIN}`} replace />;
  }

  return <Outlet />;
};
