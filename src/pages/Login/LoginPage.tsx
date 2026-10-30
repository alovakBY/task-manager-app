import { LoginForm } from '@/features/auth/view/LoginForm/LoginForm';

import styles from './LoginPage.module.scss';

export const LoginPage = () => {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <h1 className={styles.title}>Login</h1>
        <LoginForm />
      </div>
    </div>
  );
};
