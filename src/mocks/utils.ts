import { HttpResponse } from 'msw';

import type { ListDTO, ListIndicatorDTO } from '@/features/lists/api/types';
import type { TaskDTO } from '@/features/tasks/api/types';

import { type TaskDeadlineStatusDTO } from './../features/tasks/api/types';

export const getNotFoundResponse = () =>
   HttpResponse.json({ message: 'Not found' }, { status: 404 });

export const isTaskOverdue = (
   task: Omit<TaskDTO, 'deadlineStatus'>,
   now: Date,
) => {
   const isTaskDone = task.status === 'done';

   return (
      !isTaskDone &&
      task.deadline !== undefined &&
      new Date(task.deadline).getTime() < now.getTime()
   );
};

export const isTaskUrgent = (
   task: Omit<TaskDTO, 'deadlineStatus'>,
   now: Date,
) => {
   const URGENT_WINDOW_MS = 48 * 60 * 60 * 1000;

   if (task.status === 'done' || task.deadline === undefined) {
      return false;
   }

   const msLeft = Date.parse(task.deadline) - now.getTime();

   return msLeft >= 0 && msLeft <= URGENT_WINDOW_MS;
};

export const getTaskDeadlineStatus = (
   task: Omit<TaskDTO, 'deadlineStatus'>,
): TaskDeadlineStatusDTO => {
   const now: Date = new Date();

   if (isTaskOverdue(task, now)) {
      return 'overdue';
   }

   if (isTaskUrgent(task, now)) {
      return 'urgent';
   }

   return null;
};

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
