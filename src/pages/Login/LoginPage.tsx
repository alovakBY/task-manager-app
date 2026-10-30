import { Navigate } from 'react-router-dom';

import { useAuth } from '@/features/auth/api/useAuth';
import { LoginForm } from '@/features/auth/view/LoginForm/LoginForm';
import { PATHS } from '@/routes/constants';
import { Loader } from '@/shared/view/components/Loader/Loader';

import styles from './LoginPage.module.scss';

export const LoginPage = () => {
   const { isLoading, data } = useAuth();

   if (isLoading) {
      return <Loader isFullScreen />;
   }

   if (data?.isAuth) {
      return <Navigate to={`/${PATHS.LISTS}`} replace />;
   }

   return (
      <div className={styles.root}>
         <div className={styles.container}>
            <h1 className={styles.title}>Login</h1>
            <LoginForm />
         </div>
      </div>
   );
};
