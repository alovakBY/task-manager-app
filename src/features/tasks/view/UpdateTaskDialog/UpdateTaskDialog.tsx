import { Dialog } from '@/shared/view/components/Dialog/Dialog';

import type { TaskDTO } from '../../api/types';
import { useUpdateTask } from '../../api/useUpdateTask';
import type { TaskFormData } from '../../model/taskFormSchema';
import { TaskForm } from '../TaskForm/TaskForm';

type Props = {
   updatedTask: TaskDTO | null;
   onClose: () => void;
};

export const UpdateTaskDialog = ({ updatedTask, onClose }: Props) => {
   const { mutate, isPending, error } = useUpdateTask();

   if (!updatedTask) {
      return null;
   }

   const handleSubmit = (values: TaskFormData) => {
      mutate({ id: updatedTask.id, data: values }, { onSuccess: onClose });
   };

   const toTaskFormValues = (task: TaskDTO): TaskFormData => ({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      deadline: task.deadline,
   });

   return (
      <Dialog
         open={Boolean(updatedTask)}
         onOpenChange={onClose}
         title={'Update task'}
      >
         <TaskForm
            defaultValues={toTaskFormValues(updatedTask)}
            error={error?.message}
            submitLabel={'Update'}
            isPending={isPending}
            onSubmit={handleSubmit}
         />
      </Dialog>
   );
};
