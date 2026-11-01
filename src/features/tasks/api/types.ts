export type TaskStatusDTO = 'new' | 'in_progress' | 'done';
export type TaskPriorityDTO = 'low' | 'medium' | 'high';
export type TaskDeadlineStatusDTO = 'overdue' | 'urgent' | null;

export const TASK_STATUSES_DTO: TaskStatusDTO[] = [
   'new',
   'in_progress',
   'done',
] as const;

export const TASK_PRIORITY_DTO: TaskPriorityDTO[] = [
   'low',
   'medium',
   'high',
] as const;

export type TaskDTO = {
   id: string;
   listId: string;
   title: string;
   description: string;
   status: TaskStatusDTO;
   priority: TaskPriorityDTO;
   deadlineStatus: TaskDeadlineStatusDTO;
   deadline?: string;
};

export type TaskDataInput = Omit<TaskDTO, 'id' | 'deadlineStatus' | 'listId'>;

export type UpdateTaskInput = {
   id: string;
   data: Partial<TaskDataInput>;
};
