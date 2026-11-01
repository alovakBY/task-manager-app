import type { TaskStatusDTO } from '../api/types';

export type OpenDialogType = 'rename' | 'create' | 'delete' | null;

export const isTaskStatus = (value: unknown): value is TaskStatusDTO => {
   const TASK_STATUSES: TaskStatusDTO[] = [
      'new',
      'in_progress',
      'done',
   ] as const;

   return TASK_STATUSES.includes(value as TaskStatusDTO);
};
