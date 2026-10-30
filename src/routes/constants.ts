export const PATHS = {
   BASE: '/',
   LOGIN: 'login',
   LISTS: 'lists',
   LIST_DETAIL: 'lists/:id',
   TASK_DETAIL: 'tasks/:id',
} as const;

export const ROUTES = {
   login: '/login',
   lists: '/lists',
   list: (id: string) => `/lists/${id}`,
   task: (id: string) => `/tasks/${id}`,
} as const;
