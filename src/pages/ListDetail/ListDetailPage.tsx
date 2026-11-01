import { useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeftIcon, PlusIcon } from '@radix-ui/react-icons';

import { useList } from '@/features/lists/api/useList';
import type { TaskDTO, TaskStatusDTO } from '@/features/tasks/api/types';
import { isTaskStatus } from '@/features/tasks/model/types';
import { CreateTaskDialog } from '@/features/tasks/view/CreateTaskDialog/CreateTaskDialog';
import { DeleteTaskDialog } from '@/features/tasks/view/DeleteTaskDialog/DeleteTaskDialog';
import { StatusFilter } from '@/features/tasks/view/StatusFilter/StatusFilter';
import { TasksTable } from '@/features/tasks/view/TasksTable/TasksTable';
import { UpdateTaskDialog } from '@/features/tasks/view/UpdateTaskDialog/UpdateTaskDialog';
import { ROUTES } from '@/routes/constants';
import { Button } from '@/shared/view/components/Button/Button';
import { Loader } from '@/shared/view/components/Loader/Loader';
import { NotFound } from '@/shared/view/components/NotFound/NotFound';

import styles from './ListDetail.module.scss';

const STATUS_PARAM_NAME = 'status';

export const ListDetailPage = () => {
   const [createDialogOpen, setCreateDialogOpen] = useState(false);
   const [deletedTask, setDeletedTask] = useState<TaskDTO | null>(null);
   const [updatedTask, setUpdatedTask] = useState<TaskDTO | null>(null);

   const { listId = '' } = useParams();
   const [searchParams, setSearchParams] = useSearchParams();

   const { isPending, data: list } = useList(listId);

   const statusParam = searchParams.get(STATUS_PARAM_NAME);
   const statusFilter = isTaskStatus(statusParam) ? statusParam : null;

   if (isPending) {
      return <Loader isFullScreen />;
   }

   if (!list) {
      return <NotFound title="Lists" />;
   }

   const setStatusFilter = (status: TaskStatusDTO | null) => {
      setSearchParams(
         (params) => {
            if (status) {
               params.set(STATUS_PARAM_NAME, status);
            } else {
               params.delete(STATUS_PARAM_NAME);
            }

            return params;
         },
         { replace: true },
      );
   };

   return (
      <div className={styles.root}>
         <Link to={ROUTES.lists} className={styles.backLink}>
            <ArrowLeftIcon /> All lists
         </Link>
         <header className={styles.header}>
            <h1 className={styles.title}>{list?.name}</h1>
            <StatusFilter value={statusFilter} onChange={setStatusFilter} />
            <Button
               className={styles.addButton}
               onClick={() => setCreateDialogOpen(true)}
            >
               <PlusIcon /> Add task
            </Button>
         </header>
         <TasksTable
            listId={listId}
            statusFilter={statusFilter}
            onEdit={setUpdatedTask}
            onDelete={setDeletedTask}
            onCreate={() => setCreateDialogOpen(true)}
         />
         <CreateTaskDialog
            listId={listId}
            open={createDialogOpen}
            onClose={() => setCreateDialogOpen(false)}
         />
         <DeleteTaskDialog
            onClose={() => setDeletedTask(null)}
            deletedTask={deletedTask}
         />
         <UpdateTaskDialog
            updatedTask={updatedTask}
            onClose={() => setUpdatedTask(null)}
         />
      </div>
   );
};
