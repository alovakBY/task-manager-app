import cn from 'clsx';

import { formatDateTime } from '@/shared/utils/date';
import { Badge } from '@/shared/view/components/Badge/Badge';

import type { TaskDTO } from '../../api/types';

import styles from './DeadlineLabel.module.scss';

type Props = {
   task: TaskDTO;
};

export const DeadlineLabel = ({ task }: Props) => {
   const { deadlineStatus, deadline } = task;
   if (!deadline) {
      return <span className={styles.empty}>No deadline</span>;
   }

   return (
      <span className={styles.root}>
         <span
            className={cn(styles.date, {
               [styles.overdue]: deadlineStatus === 'overdue',
            })}
         >
            {formatDateTime(deadline)}
         </span>
         {deadlineStatus === 'overdue' && <Badge tone="danger">Overdue</Badge>}
         {deadlineStatus === 'urgent' && <Badge tone="warning">Urgent</Badge>}
      </span>
   );
};
