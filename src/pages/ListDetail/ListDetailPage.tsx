import { useParams } from 'react-router-dom';
import { PlusIcon } from '@radix-ui/react-icons';

import { useList } from '@/features/lists/api/useList';
import { TasksTable } from '@/features/tasks/view/TasksTable/TasksTable';
import { Button } from '@/shared/view/components/Button/Button';
import { Loader } from '@/shared/view/components/Loader/Loader';

import styles from './ListDetail.module.scss';

export const ListDetailPage = () => {
   const { listId = '' } = useParams();
   const listQuery = useList(listId);

   if (listQuery.isPending) {
      return <Loader isFullScreen />;
   }

   return (
      <div className={styles.root}>
         <header className={styles.header}>
            <h1 className={styles.title}>{listQuery.data?.name}</h1>
            <Button className={styles.addButton} onClick={() => {}}>
               <PlusIcon /> Add task
            </Button>
         </header>
         <TasksTable listId={listId} />
      </div>
   );
};
