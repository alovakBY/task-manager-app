export type TaskStatusDTO = 'new' | 'in_progress' | 'done';
export type TaskPriorityDTO = 'low' | 'medium' | 'high';
export type TaskDeadlineStatusDTO = 'overdue' | 'urgent' | null;

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
