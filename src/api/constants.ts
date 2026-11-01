import { BASE_URL } from '@/api/config';

export const ENDPOINTS = {
   // AUTH
   AUTH_LOGIN: '/auth/login',
   AUTH_ME: '/auth/me',
   AUTH_LOGOUT: '/auth/logout',
   //LISTS
   LISTS: '/lists',
   LIST: '/lists/:id',
   TASKS_BY_LIST_ID: '/lists/:id/tasks',
   // TASKS
   TASK: '/tasks/:id',
   // TASKS: '/tasks/:id',
} as const;

export const PATH_BUILDERS = {
   LIST: (id: string) => `/lists/${id}`,
   TASKS_BY_LIST_ID: (id: string) => `/lists/${id}/tasks`,
   TASK: (id: string) => `/tasks/${id}`,
} as const;

export const getEndpointWithBaseUrl = (endpoint: string) => {
   return `${BASE_URL}${endpoint}`;
};
