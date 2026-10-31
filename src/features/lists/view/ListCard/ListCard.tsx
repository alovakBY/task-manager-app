import { Link } from 'react-router-dom';
import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';
import cn from 'clsx';

import { ROUTES } from '@/routes/constants';
import { Badge } from '@/shared/view/components/Badge/Badge';
import { IconButton } from '@/shared/view/components/IconButton/IconButton';
import { Progress } from '@/shared/view/components/Progress/Progress';

import type { ListDTO } from '../../api/types';

import styles from './ListCard.module.scss';

type Props = {
   list: ListDTO;
   onRename: (list: ListDTO) => void;
   onDelete: (list: ListDTO) => void;
};

export const ListCard = ({ list, onRename, onDelete }: Props) => {
   const { id: listId, name, total, counters, progress, indicator } = list;

   const counterItems = [
      { label: 'New', value: counters.new },
      { label: 'In progress', value: counters.in_progress },
      { label: 'Done', value: counters.done },
      {
         label: 'Overdue',
         value: counters.overdue,
         isAlert: counters.overdue > 0,
      },
   ];

   return (
      <div
         className={cn(styles.root, {
            [styles.overdue]: indicator === 'overdue',
            [styles.dueSoon]: indicator === 'urgent',
         })}
      >
         <div className={styles.header}>
            <h2 className={styles.name}>
               <Link to={ROUTES.list(listId)} className={styles.link}>
                  {name}
               </Link>
            </h2>
            <div className={styles.actions}>
               <IconButton onClick={() => onRename(list)}>
                  <Pencil1Icon />
               </IconButton>
               <IconButton tone="danger" onClick={() => onDelete(list)}>
                  <TrashIcon />
               </IconButton>
            </div>
         </div>

         <div className={styles.indicator}>
            {indicator === 'overdue' && (
               <Badge tone="danger">Has overdue tasks</Badge>
            )}
            {indicator === 'urgent' && (
               <Badge tone="warning">Deadline within 48h</Badge>
            )}
         </div>
         <div className={styles.counters}>
            {counterItems.map((item) => (
               <div
                  key={item.label}
                  className={cn(styles.counter, {
                     [styles.alert]: item.isAlert,
                  })}
               >
                  <div className={styles.counterLabel}>{item.label}</div>
                  <div className={styles.counterValue}>{item.value}</div>
               </div>
            ))}
         </div>
         <div className={styles.progress}>
            <Progress value={progress} label={`Progress of "${list.name}"`} />
            <span className={styles.total}>
               {total === 0
                  ? 'No tasks yet'
                  : `${counters.done} of ${total} done`}
            </span>
         </div>
      </div>
   );
};
