import { ConfirmDialog } from '@/shared/view/components/ConfirmDialog/ConfirmDialog';

import type { ListDTO } from '../../api/types';
import { useDeleteList } from '../../api/useDeleteList';

type Props = {
   deletedList: ListDTO | null;
   onClose: () => void;
};

export const DeleteListDialog = ({ deletedList, onClose }: Props) => {
   const { mutate, isPending, error } = useDeleteList();

   if (!deletedList) {
      return;
   }

   const handleSubmit = () => {
      mutate({ id: deletedList.id }, { onSuccess: onClose });
   };

   return (
      <ConfirmDialog
         error={error?.message}
         open={Boolean(deletedList)}
         onOpenChange={onClose}
         isPending={isPending}
         onConfirm={handleSubmit}
         title="Delete list?"
         message={
            <>
               List <strong>"{deletedList.name}"</strong> and all its tasks (
               {deletedList.total}) will be deleted. This cannot be undone.
            </>
         }
      />
   );
};
