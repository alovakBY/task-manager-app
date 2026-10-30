import type { FC } from 'react';
import cn from 'clsx';

import styles from './Loader.module.scss';

type Props = {
  size?: 'small' | 'medium';
  isFullScreen?: boolean;
};

export const Loader: FC<Props> = ({
  size = 'medium',
  isFullScreen = false,
}) => {
  const loaderClass = `${styles.spinner} ${styles[size]}`;

  return (
    <div
      className={cn(styles.root, {
        [styles.fullScren]: isFullScreen,
      })}
    >
      <div className={loaderClass} role="status" aria-label="Загрузка">
        <div className={styles.circle} />
      </div>
    </div>
  );
};
