import {
   TASK_PRIORITY_DTO,
   TASK_STATUSES_DTO,
   type TaskPriorityDTO,
   type TaskStatusDTO,
} from '../api/types';

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

export const STATUS_OPTIONS = TASK_STATUSES_DTO.map((status) => ({
   value: status,
   label: STATUS_LABELS[status],
}));

export const PRIORITY_OPTIONS = TASK_PRIORITY_DTO.map((priority) => ({
   value: priority,
   label: PRIORITY_LABELS[priority],
}));
