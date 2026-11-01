import type {
   TaskDeadlineStatusDTO,
   TaskDTO,
} from '@/features/tasks/api/types';

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
   now: Date = new Date(),
): TaskDeadlineStatusDTO => {
   if (isTaskOverdue(task, now)) {
      return 'overdue';
   }

   if (isTaskUrgent(task, now)) {
      return 'urgent';
   }

   return null;
};
