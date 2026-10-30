import { Outlet } from 'react-router';

import { Header } from './components/Header/Header';

import styles from './AppLayout.module.scss';

export const AppLayout = () => {
   return (
      <>
         <Header />
         <main className={styles.mainContainer}>
            <Outlet />
         </main>
      </>
   );
};
