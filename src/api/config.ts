import axios from 'axios';

import { authService } from '@/mocks/db';
import { ROUTES } from '@/routes/constants';

export const BASE_URL = '/api';

export const api = axios.create({
   baseURL: BASE_URL,
});

api.interceptors.response.use(
   (response) => response,
   (error) => {
      if (error.response && error.response.status === 401) {
         authService.clear();
         window.location.href = ROUTES.login;
      }

      return Promise.reject(error);
   },
);
