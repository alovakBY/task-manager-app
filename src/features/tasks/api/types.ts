export type TaskStatusDTO = 'new' | 'in_progress' | 'done' | 'overdue';
export type TaskPriorityDTO = 'low' | 'medium' | 'high';

export type TaskDTO = {
   id: string;
   listId: string;
   title: string;
   description: string;
   status: TaskStatusDTO;
   priority: TaskPriorityDTO;
   deadline: string;
};
