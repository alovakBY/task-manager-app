export const PATHS = {
   BASE: '/',
   LOGIN: 'login',
   LISTS: 'lists',
   LIST_DETAIL: 'lists/:listId',
   TASK_DETAIL: 'tasks/:taskId',
} as const;

export const ROUTES = {
   login: '/login',
   lists: '/lists',
   list: (id: string) => `/lists/${id}`,
   task: (id: string) => `/tasks/${id}`,
} as const;
