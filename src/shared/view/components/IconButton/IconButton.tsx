import type { ButtonHTMLAttributes } from 'react';
import cn from 'clsx';

import styles from './IconButton.module.scss';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
   tone?: 'danger' | 'default';
};

export const IconButton = ({ children, tone = 'default', ...props }: Props) => {
   return (
      <button className={cn(styles.root, styles[tone])} {...props}>
         {children}
      </button>
   );
};
