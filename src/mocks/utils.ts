import type { ListDTO, ListIndicatorDTO } from '@/features/lists/api/types';
import type { TaskDTO } from '@/features/tasks/api/types';

export const getListStats = (
   tasks: readonly TaskDTO[],
): Omit<ListDTO, 'id' | 'name'> => {
   const now = new Date();
   const total = tasks.length;
   const counters = tasks.reduce<Record<TaskDTO['status'], number>>(
      (result, task) => {
         const isTaskDone = task.status === 'done';
         const isOverdue =
            !isTaskDone && new Date(task.deadline).getTime() < now.getTime();

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
      const URGENT_WINDOW_MS = 48 * 60 * 60 * 1000;

      const hasUrgent = tasks.some((task) => {
         const msLeft = Date.parse(task.deadline) - now.getTime();

         return task.status !== 'done' && msLeft <= URGENT_WINDOW_MS;
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
