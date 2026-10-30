import type { ReactNode } from 'react';
import cn from 'clsx';

import styles from './Badge.module.scss';

export type BadgeTone = 'warning' | 'danger';

type Props = {
   children: ReactNode;
   tone?: BadgeTone;
};

export const Badge = ({ tone = 'warning', children }: Props) => {
   return <span className={cn(styles.root, styles[tone])}>{children}</span>;
};
