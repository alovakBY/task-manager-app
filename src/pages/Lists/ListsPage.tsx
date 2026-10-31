import { useState } from 'react';

import type { ListDTO } from '@/features/lists/api/types';
import { useLists } from '@/features/lists/api/useLists';
import { ListCard } from '@/features/lists/view/ListCard/ListCard';
import { ConfirmDialog } from '@/shared/view/components/ConfirmDialog/ConfirmDialog';

import styles from './ListPage.module.scss';

export const ListsPage = () => {
   const [selectedList, setSelectedList] = useState<ListDTO | null>(null);
   const { data: lists } = useLists();

   const handleOpenChange = (open: boolean) => {
      if (!open) {
         setSelectedList(null);
      }
   };

   if (!lists) {
      return (
         <div>
            <div>No lists yet</div>
            <div>Create your first list to start adding tasks</div>
         </div>
      );
   }

   return (
      <div className={styles.root}>
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
