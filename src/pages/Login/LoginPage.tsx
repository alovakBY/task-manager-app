import { Navigate } from 'react-router-dom';

import { useAuth } from '@/features/auth/api/useAuth';
import { useLogin } from '@/features/auth/api/useLogin';
import { LoginForm } from '@/features/auth/view/LoginForm/LoginForm';
import { PATHS } from '@/routes/constants';
import { Loader } from '@/shared/view/components/Loader/Loader';

import styles from './LoginPage.module.scss';

export const LoginPage = () => {
   const { mutate, isPending, error, reset } = useLogin();
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
            <LoginForm
               onSubmit={(data) => mutate(data)}
               reset={reset}
               isPending={isPending}
               apiError={error?.response?.data?.message}
            />
            <p className={styles.hint}>
               Demo account: admin@example.com / Admin123!
            </p>
         </div>
      </div>
   );
};
