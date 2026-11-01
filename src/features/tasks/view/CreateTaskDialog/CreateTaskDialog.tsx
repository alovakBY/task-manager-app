import { Dialog } from '@/shared/view/components/Dialog/Dialog';

import type { TaskDataInput } from '../../api/types';
import { useAddTask } from '../../api/useAddTask';
import { TaskForm } from '../TaskForm/TaskForm';

type Props = {
   listId: string;
   open: boolean;
   onClose: () => void;
};

export const CreateTaskDialog = ({ open, listId, onClose }: Props) => {
   const { mutate, isPending, error } = useAddTask(listId);

   const handleSubmit = (values: TaskDataInput) => {
      mutate(values, { onSuccess: onClose });
   };

   return (
      <Dialog open={open} onOpenChange={onClose} title={'Create task'}>
         <TaskForm
            error={error?.message}
            submitLabel={'Create'}
            isPending={isPending}
            onSubmit={handleSubmit}
         />
      </Dialog>
   );
};
