import { useQuery } from '@tanstack/react-query';

import { api } from '@/api/config';

import type { CurrentUser } from './types';

export const useAuth = () => {
  return useQuery({
    queryKey: ['auth'],
    queryFn: async () => {
      try {
        const response = await api.get<CurrentUser>('/auth/me');
        console.log(response);

        return response.data;
      } catch {
        return { isAuth: false, user: null };
      }
    },
  });
};
