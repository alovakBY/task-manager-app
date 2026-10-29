import { Navigate, Outlet } from 'react-router';

import { useAuth } from '@/features/auth/api/useAuth';

import { PATHS } from './constants';

export const AppLayout = () => {
  const { data: auth, isLoading } = useAuth();

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (!auth?.isAuth) {
    return <Navigate to={`/${PATHS.LOGIN}`} replace />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};
