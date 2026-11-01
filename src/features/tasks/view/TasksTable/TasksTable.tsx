import { Link } from 'react-router-dom';
import { PlusIcon } from '@radix-ui/react-icons';
import cn from 'clsx';

import { PriorityBadge } from '@/features/lists/view/PriorityBadge/PriorityBadge';
import { ROUTES } from '@/routes/constants';
import { Button } from '@/shared/view/components/Button/Button';
import { StateMessage } from '@/shared/view/components/StateMessage/StateMessage';

import { useTasks } from '../../api/useTasks';
import { DeadlineLabel } from '../DeadlineLabel/DeadlineLabel';
import { StatusSelect } from '../StatusSelect/StatusSelect';

import styles from './TasksTable.module.scss';

type Props = {
   listId: string;
};

export const TasksTable = ({ listId }: Props) => {
   const { data: tasks = [] } = useTasks(listId);

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

   return <div className={styles.root}>{renderContent()}</div>;
};
