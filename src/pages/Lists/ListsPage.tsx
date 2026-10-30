import { useLists } from '@/features/lists/api/useLists';
import { ListCard } from '@/features/lists/view/ListCard/ListCard';

import styles from './ListPage.module.scss';

export const ListsPage = () => {
   const { data: lists } = useLists();

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
            return <ListCard key={list.id} list={list} />;
         })}
      </div>
   );
};
