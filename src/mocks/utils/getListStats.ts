import type { ListDTO, ListIndicatorDTO } from '@/features/lists/api/types';
import type { TaskDTO } from '@/features/tasks/api/types';

export const getListStats = (
   tasks: TaskDTO[],
): Omit<ListDTO, 'id' | 'name'> => {
   const total = tasks.length;
   const counters = tasks.reduce<Record<TaskDTO['status'] | 'overdue', number>>(
      (result, task) => {
         const isOverdue = task.deadlineStatus === 'overdue';

         if (isOverdue) {
            result['overdue'] += 1;
         } else {
            result[task.status] += 1;
         }

         return result;
      },
      { overdue: 0, done: 0, new: 0, in_progress: 0 },
   );

   const progress = total === 0 ? 0 : Math.round((counters.done / total) * 100);

   let indicator: ListIndicatorDTO = null;

   if (counters.overdue > 0) {
      indicator = 'overdue';
   } else {
      const hasUrgent = tasks.some((task) => {
         return task.deadlineStatus === 'urgent';
      });

      if (hasUrgent) {
         indicator = 'urgent';
      }
   }

   return {
      total,
      counters,
      progress,
      indicator,
   };
};
