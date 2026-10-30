import { BASE_URL } from '@/api/config';

export const ENDPOINTS = {
   // AUTH
   AUTH_LOGIN: '/auth/login',
   AUTH_ME: '/auth/me',
   AUTH_LOGOUT: '/auth/logout',
   //LISTS
   LISTS: '/lists',
} as const;

type Endpoints = (typeof ENDPOINTS)[keyof typeof ENDPOINTS];

export const getEndpointWithBaseUrl = (endpoint: Endpoints) => {
   return `${BASE_URL}${endpoint}`;
};
