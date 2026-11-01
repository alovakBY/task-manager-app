import cn from 'clsx';

import styles from './Loader.module.scss';

type Props = {
   size?: 'small' | 'medium';
   isFullScreen?: boolean;
};

export const Loader = ({ size = 'medium', isFullScreen = false }: Props) => {
   const loaderClass = `${styles.spinner} ${styles[size]}`;

   return (
      <div
         className={cn(styles.root, {
            [styles.fullScren]: isFullScreen,
         })}
      >
         <div className={loaderClass} role="status" aria-label="Loading">
            <div className={styles.circle} />
         </div>
      </div>
   );
};
