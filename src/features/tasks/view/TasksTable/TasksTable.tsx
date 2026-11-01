import { Link } from 'react-router-dom';
import { Pencil1Icon, PlusIcon, TrashIcon } from '@radix-ui/react-icons';
import cn from 'clsx';

import { PriorityBadge } from '@/features/lists/view/PriorityBadge/PriorityBadge';
import { ROUTES } from '@/routes/constants';
import { Button } from '@/shared/view/components/Button/Button';
import { IconButton } from '@/shared/view/components/IconButton/IconButton';
import { Loader } from '@/shared/view/components/Loader/Loader';
import { StateMessage } from '@/shared/view/components/StateMessage/StateMessage';

import type { TaskDTO, TaskStatusDTO } from '../../api/types';
import { useTasks } from '../../api/useTasks';
import { useUpdateTask } from '../../api/useUpdateTask';
import { STATUS_LABELS } from '../../model/constants';
import { DeadlineLabel } from '../DeadlineLabel/DeadlineLabel';
import { StatusSelect } from '../StatusSelect/StatusSelect';

import styles from './TasksTable.module.scss';

type Props = {
   listId: string;
   statusFilter: TaskStatusDTO | null;
   onEdit: (task: TaskDTO) => void;
   onDelete: (task: TaskDTO) => void;
   onCreate: () => void;
};

export const TasksTable = ({
   listId,
   statusFilter,
   onEdit,
   onDelete,
   onCreate,
}: Props) => {
   const { data: tasks = [], isPending } = useTasks(listId, statusFilter);
   const { mutate } = useUpdateTask();

   const renderContent = () => {
      return (
         <table className={styles.table}>
            <thead>
               <tr>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Deadline</th>
                  <th>Actions</th>
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
                           <div className={styles.statusWrapper}>
                              <StatusSelect
                                 value={task.status}
                                 onChange={(status) =>
                                    mutate({
                                       id: task.id,
                                       data: { status },
                                    })
                                 }
                              />
                           </div>
                        </td>
                        <td>
                           <PriorityBadge priority={task.priority} />
                        </td>
                        <td>
                           <DeadlineLabel task={task} />
                        </td>
                        <td>
                           <div className={styles.actions}>
                              <IconButton onClick={() => onEdit(task)}>
                                 <Pencil1Icon />
                              </IconButton>
                              <IconButton
                                 tone="danger"
                                 onClick={() => onDelete(task)}
                              >
                                 <TrashIcon />
                              </IconButton>
                           </div>
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
               <Button onClick={onCreate}>
                  <PlusIcon /> Add task
               </Button>
            }
         />
      );
   }

   return <div className={styles.root}>{renderContent()}</div>;
};
