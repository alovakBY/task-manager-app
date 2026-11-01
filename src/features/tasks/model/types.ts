import { TASK_STATUSES_DTO, type TaskStatusDTO } from '../api/types';

export type OpenDialogType = 'rename' | 'create' | 'delete' | null;

export const isTaskStatus = (value: unknown): value is TaskStatusDTO => {
   return TASK_STATUSES_DTO.includes(value as TaskStatusDTO);
};
