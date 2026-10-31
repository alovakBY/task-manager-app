import type { ReactNode } from 'react';

import styles from './StateMessage.module.scss';

type Props = {
   title: string;
   description?: ReactNode;
   action?: ReactNode;
};

export const StateMessage = ({ title, description, action }: Props) => {
   return (
      <div className={styles.root}>
         <p className={styles.title}>{title}</p>
         {description && <p className={styles.description}>{description}</p>}
         {action && <div className={styles.action}>{action}</div>}
      </div>
   );
};
