import { ConfirmDialog } from '@/shared/view/components/ConfirmDialog/ConfirmDialog';

import type { TaskDTO } from '../../api/types';
import { useDeleteTask } from '../../api/useDeleteTask';

type Props = {
   deletedTask: TaskDTO | null;
   onClose: () => void;
};

export const DeleteTaskDialog = ({ deletedTask, onClose }: Props) => {
   const { mutate, isPending, error } = useDeleteTask();

   if (!deletedTask) {
      return;
   }

   const handleSubmit = () => {
      mutate(deletedTask.id, { onSuccess: onClose });
   };

   return (
      <ConfirmDialog
         error={error?.message}
         open={Boolean(deletedTask)}
         onOpenChange={onClose}
         isPending={isPending}
         onConfirm={handleSubmit}
         title="Delete task?"
         message={
            <>
               <strong>{deletedTask.title}</strong> will be deleted. This cannot
               be undone.
            </>
         }
      />
   );
};
