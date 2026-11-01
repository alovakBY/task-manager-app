import { Link } from 'react-router-dom';
import { PlusIcon } from '@radix-ui/react-icons';
import cn from 'clsx';

import { PriorityBadge } from '@/features/lists/view/PriorityBadge/PriorityBadge';
import { ROUTES } from '@/routes/constants';
import { Button } from '@/shared/view/components/Button/Button';
import { Loader } from '@/shared/view/components/Loader/Loader';
import { StateMessage } from '@/shared/view/components/StateMessage/StateMessage';

import type { TaskStatusDTO } from '../../api/types';
import { useTasks } from '../../api/useTasks';
import { STATUS_LABELS } from '../../model/constants';
import { DeadlineLabel } from '../DeadlineLabel/DeadlineLabel';
import { StatusSelect } from '../StatusSelect/StatusSelect';

import styles from './TasksTable.module.scss';

type Props = {
   listId: string;
   statusFilter: TaskStatusDTO | null;
};

export const TasksTable = ({ listId, statusFilter }: Props) => {
   const { data: tasks = [], isPending } = useTasks(listId);
   const renderContent = () => {
      if (tasks.length === 0) {
         return (
            <StateMessage
               title="No tasks yet"
               description="Create your first task"
               action={
                  <Button className={styles.addButton} onClick={() => {}}>
                     <PlusIcon /> New task
                  </Button>
               }
            />
         );
      }

      return (
         <table className={styles.table}>
            <thead>
               <tr>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Deadline</th>
               </tr>
            </thead>
            <tbody>
               {tasks.map((task) => {
                  return (
                     <tr key={task.id}>
                        <td>
                           <Link
                              to={ROUTES.task(task.id)}
                              className={cn(styles.title, {
                                 [styles.done]: task.status === 'done',
                              })}
                           >
                              {task.title}
                           </Link>
                        </td>
                        <td>
                           <StatusSelect
                              value={task.status}
                              onChange={() => {}}
                           />
                        </td>
                        <td>
                           <PriorityBadge priority={task.priority} />
                        </td>
                        <td>
                           <DeadlineLabel task={task} />
                        </td>
                     </tr>
                  );
               })}
            </tbody>
         </table>
      );
   };

   if (isPending) {
      return <Loader />;
   }

   if (tasks.length === 0) {
      return statusFilter ? (
         <StateMessage
            title={`No “${STATUS_LABELS[statusFilter]}” tasks`}
            description="Try another status filter"
         />
      ) : (
         <StateMessage
            title="No tasks yet"
            description="Add the first task to this list"
            action={
               <Button onClick={() => {}}>
                  <PlusIcon /> Add task
               </Button>
            }
         />
      );
   }

   return <div className={styles.root}>{renderContent()}</div>;
};
