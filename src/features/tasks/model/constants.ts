import type { TaskPriorityDTO, TaskStatusDTO } from '../api/types';

type TaskStatus = 'New' | 'In progress' | 'Done' | 'Overdue';

export type TaskPriority = 'Low' | 'Medium' | 'High';

export const STATUS_LABELS: Record<TaskStatusDTO, TaskStatus> = {
   new: 'New',
   in_progress: 'In progress',
   done: 'Done',
} as const;

export const PRIORITY_LABELS: Record<TaskPriorityDTO, TaskPriority> = {
   low: 'Low',
   medium: 'Medium',
   high: 'High',
};

export const STATUS_OPTIONS = (
   Object.keys(STATUS_LABELS) as TaskStatusDTO[]
).map((status) => ({
   value: status,
   label: STATUS_LABELS[status],
}));
