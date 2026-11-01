import type { TaskDTO } from '@/features/tasks/api/types';

import { isTaskOverdue } from './getTaskDeadlineStatus';

export const sortTasks = (tasks: readonly TaskDTO[], now: Date): TaskDTO[] => {
   return [...tasks].sort((a, b) => {
      const aDone = a.status === 'done';
      const bDone = b.status === 'done';

      if (aDone !== bDone) {
         return aDone ? 1 : -1;
      }
      if (aDone && bDone) return 0;

      const aOverdue = isTaskOverdue(a, now);
      const bOverdue = isTaskOverdue(b, now);

      if (aOverdue !== bOverdue) {
         return aOverdue ? -1 : 1;
      }

      if (!a.deadline && b.deadline) return 1;
      if (a.deadline && !b.deadline) return -1;

      if (a.deadline && b.deadline) {
         const aTime = new Date(a.deadline).getTime();
         const bTime = new Date(b.deadline).getTime();

         return aTime - bTime;
      }

      return 0;
   });
};
