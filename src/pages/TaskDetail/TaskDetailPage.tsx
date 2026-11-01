import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import cn from 'clsx';

import { PriorityBadge } from '@/features/lists/view/PriorityBadge/PriorityBadge';
import { useTask } from '@/features/tasks/api/useTask';
import { STATUS_LABELS } from '@/features/tasks/model/constants';
import { DeadlineLabel } from '@/features/tasks/view/DeadlineLabel/DeadlineLabel';
import { DeleteTaskDialog } from '@/features/tasks/view/DeleteTaskDialog/DeleteTaskDialog';
import { UpdateTaskDialog } from '@/features/tasks/view/UpdateTaskDialog/UpdateTaskDialog';
import { ROUTES } from '@/routes/constants';
import { Button } from '@/shared/view/components/Button/Button';
import { Loader } from '@/shared/view/components/Loader/Loader';
import { NotFound } from '@/shared/view/components/NotFound/NotFound';

import styles from './TaskDetailPage.module.scss';

export const TaskDetailPage = () => {
   const [deletedTask, setDeletedTask] = useState(null);
   const [updatedTask, setUpdatedTask] = useState(null);
   const navigate = useNavigate();
   const { taskId = '' } = useParams();

   const { data: task, isPending } = useTask(taskId);

   if (isPending) {
      return <Loader isFullScreen />;
   }

   if (!task) {
      return <NotFound title="Task" />;
   }

   return (
      <div className={styles.root}>
         <Link to={ROUTES.list(task.listId)} className={styles.backLink}>
            <ArrowLeftIcon /> All tasks
         </Link>
         <header className={styles.header}>
            <div>
               <div className={styles.headerTitle}>
                  <h1 className={styles.title}>{task.title}</h1>
                  <PriorityBadge priority={task.priority} />
               </div>
            </div>
            <div className={styles.buttons}>
               <Button
                  className={styles.button}
                  onClick={() => setUpdatedTask(task)}
               >
                  Edit task
               </Button>
               <Button
                  variant="danger"
                  className={styles.button}
                  onClick={() => setDeletedTask(task)}
               >
                  Delete task
               </Button>
            </div>
         </header>

         <div className={styles.wrapper}>
            <div className={styles.wrapperItem}>
               Status:
               <span
                  className={cn(
                     styles.status,
                     task.status === 'in_progress'
                        ? styles.inProgress
                        : styles[task.status],
                  )}
               >
                  {STATUS_LABELS[task.status]}
               </span>
            </div>
            <div className={styles.wrapperItem}>
               Deadline:
               <DeadlineLabel task={task} />
            </div>
         </div>
         <div className={styles.row}>
            <div className={styles.rowTitle}>Description:</div>
            {task.description}
         </div>
         <DeleteTaskDialog
            onClose={() => {
               setDeletedTask(null);
               navigate(ROUTES.list(task.listId));
            }}
            deletedTask={deletedTask}
         />
         <UpdateTaskDialog
            updatedTask={updatedTask}
            onClose={() => setUpdatedTask(null)}
         />
      </div>
   );
};
