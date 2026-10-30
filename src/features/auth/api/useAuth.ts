import { useQuery } from '@tanstack/react-query';

import { api } from '@/api/config';

import type { CurrentUser } from '../model/types';

export const useAuth = () => {
  return useQuery({
    queryKey: ['auth'],
    queryFn: async () => {
      try {
        const response = await api.get<CurrentUser>('/auth/me');

        return response.data;
      } catch {
        return { isAuth: false, user: null };
      }
    },
  });
};
