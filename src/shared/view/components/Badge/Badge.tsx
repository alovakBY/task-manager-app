import type { ReactNode } from 'react';
import cn from 'clsx';

import styles from './Badge.module.scss';

export type BadgeTone = 'warning' | 'danger' | 'neutral';

type Props = {
   children: ReactNode;
   tone?: BadgeTone;
};

export const Badge = ({ tone = 'neutral', children }: Props) => {
   return <span className={cn(styles.root, styles[tone])}>{children}</span>;
};
