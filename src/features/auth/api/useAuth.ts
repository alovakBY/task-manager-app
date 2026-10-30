import { useQuery } from '@tanstack/react-query';

import { api } from '@/api/config';
import { ENDPOINTS } from '@/api/constants';

import type { CurrentUser } from '../model/types';

export const useAuth = () => {
   return useQuery({
      queryKey: [ENDPOINTS.AUTH_ME],
      queryFn: async () => {
         try {
            const response = await api.get<CurrentUser>(ENDPOINTS.AUTH_ME);

            return response.data;
         } catch {
            return { isAuth: false, user: null };
         }
      },
   });
};
