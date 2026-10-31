import { BASE_URL } from '@/api/config';

export const ENDPOINTS = {
   // AUTH
   AUTH_LOGIN: '/auth/login',
   AUTH_ME: '/auth/me',
   AUTH_LOGOUT: '/auth/logout',
   //LISTS
   LISTS: '/lists',
   LIST: (id: string) => `/lists/${id}`,
} as const;

export const getEndpointWithBaseUrl = (endpoint: string) => {
   return `${BASE_URL}${endpoint}`;
};
