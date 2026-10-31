import { useState } from 'react';
import { PlusIcon } from '@radix-ui/react-icons';
import cn from 'clsx';

import type { ListDTO } from '@/features/lists/api/types';
import { useLists } from '@/features/lists/api/useLists';
import { CreateListDialog } from '@/features/lists/view/CreateListDialog/CreateListDialog';
import { DeleteListDialog } from '@/features/lists/view/DeleteListDialog/DeleteListDialog';
import { ListCard } from '@/features/lists/view/ListCard/ListCard';
import { RenameListDialog } from '@/features/lists/view/RenameListDialog/RenameListDialog';
import { useDebouncedValue } from '@/shared/utils/useDebouncedValue';
import { Button } from '@/shared/view/components/Button/Button';
import { Input } from '@/shared/view/components/Input/Input';
import { Loader } from '@/shared/view/components/Loader/Loader';
import { StateMessage } from '@/shared/view/components/StateMessage/StateMessage';

import styles from './ListPage.module.scss';

export const ListsPage = () => {
   const [search, setSearch] = useState('');
   const [deletedList, setDeletedList] = useState<ListDTO | null>(null);
   const [renamedList, setRenamedList] = useState<ListDTO | null>(null);
   const [createDialogOpen, setCreateDialogOpen] = useState(false);

   const debouncedSearch = useDebouncedValue(search);

   const {
      data: lists = [],
      isPending,
      isFetching,
   } = useLists(debouncedSearch);

   const renderContent = () => {
      if (isPending) {
         return <Loader />;
      }
      if (lists.length === 0) {
         return debouncedSearch ? (
            <StateMessage
               title="Nothing found"
               description={`No lists match “${debouncedSearch}”`}
            />
         ) : (
            <StateMessage
               title="No lists yet"
               description="Create your first list to start adding tasks"
               action={
                  <Button
                     className={styles.addButton}
                     onClick={() => setCreateDialogOpen(true)}
                  >
                     <PlusIcon /> New list
                  </Button>
               }
            />
         );
      }

      return (
         <div className={cn(styles.lists, { [styles.stale]: isFetching })}>
            {lists.map((list) => {
               return (
                  <ListCard
                     key={list.id}
                     list={list}
                     onRename={() => setRenamedList(list)}
                     onDelete={() => setDeletedList(list)}
                  />
               );
            })}
         </div>
      );
   };

   return (
      <div className={styles.root}>
         <header className={styles.header}>
            <h1 className={styles.title}>My lists</h1>
            <div className={styles.toolbar}>
               <div className={styles.search}>
                  <Input
                     type="search"
                     placeholder="Search lists"
                     value={search}
                     onChange={(event) => setSearch(event.target.value)}
                  />
               </div>
               <Button
                  className={styles.addButton}
                  onClick={() => setCreateDialogOpen(true)}
               >
                  <PlusIcon /> New list
               </Button>
            </div>
         </header>
         {renderContent()}

         <DeleteListDialog
            onClose={() => setDeletedList(null)}
            deletedList={deletedList}
         />
         <CreateListDialog
            onClose={() => setCreateDialogOpen(false)}
            open={createDialogOpen}
         />
         <RenameListDialog
            onClose={() => setRenamedList(null)}
            renamedList={renamedList}
         />
      </div>
   );
};
