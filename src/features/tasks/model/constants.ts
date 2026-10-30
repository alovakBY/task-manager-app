import type { TaskPriorityDTO, TaskStatusDTO } from '../api/types';

export type TaskStatus = 'New' | 'In progress' | 'Done' | 'Overdue';

export type TaskPriority = 'Low' | 'Medium' | 'High';

export const STATUS_LABELS: Record<TaskStatusDTO, TaskStatus> = {
   new: 'New',
   in_progress: 'In progress',
   done: 'Done',
   overdue: 'Overdue',
};

export const TASK_LABELS: Record<TaskPriorityDTO, TaskPriority> = {
   low: 'Low',
   medium: 'Medium',
   high: 'High',
};
