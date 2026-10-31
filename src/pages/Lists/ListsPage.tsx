import { useState } from 'react';
import { PlusIcon } from '@radix-ui/react-icons';
import cn from 'clsx';

import type { ListDTO } from '@/features/lists/api/types';
import { useLists } from '@/features/lists/api/useLists';
import { ListCard } from '@/features/lists/view/ListCard/ListCard';
import { useDebouncedValue } from '@/shared/utils/useDebouncedValue';
import { Button } from '@/shared/view/components/Button/Button';
import { ConfirmDialog } from '@/shared/view/components/ConfirmDialog/ConfirmDialog';
import { Input } from '@/shared/view/components/Input/Input';
import { Loader } from '@/shared/view/components/Loader/Loader';
import { StateMessage } from '@/shared/view/components/StateMessage/StateMessage';

import styles from './ListPage.module.scss';

export const ListsPage = () => {
   const [search, setSearch] = useState('');
   const [selectedList, setSelectedList] = useState<ListDTO | null>(null);

   const debouncedSearch = useDebouncedValue(search);

   const {
      data: lists = [],
      isPlaceholderData,
      isPending,
   } = useLists(debouncedSearch);

   const handleOpenChange = (open: boolean) => {
      if (!open) {
         setSelectedList(null);
      }
   };

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
                  <Button className={styles.addButton} onClick={() => {}}>
                     <PlusIcon /> New list
                  </Button>
               }
            />
         );
      }

      return (
         <div
            className={cn(styles.lists, { [styles.stale]: isPlaceholderData })}
         >
            {lists.map((list) => {
               return (
                  <ListCard
                     key={list.id}
                     list={list}
                     onRename={setSelectedList}
                     onDelete={setSelectedList}
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
               <Button className={styles.addButton} onClick={() => {}}>
                  <PlusIcon /> New list
               </Button>
            </div>
         </header>
         {renderContent()}
         <ConfirmDialog
            open={Boolean(selectedList)}
            onOpenChange={handleOpenChange}
            onConfirm={() => {}}
            title="Delete list?"
            message={
               <>
                  List <strong>"{selectedList?.name}"</strong> and all its tasks
                  ({selectedList?.total}) will be deleted. This cannot be
                  undone.
               </>
            }
         />
      </div>
   );
};
