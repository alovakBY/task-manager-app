import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { delay } from 'msw';

import { api } from '@/api/config';
import { ENDPOINTS } from '@/api/constants';

import type { ListDTO } from './types';

export const useLists = (search?: string) => {
   return useQuery({
      queryKey: [ENDPOINTS.LISTS, search],
      queryFn: async () => {
         await delay(200);
         const response = await api.get<ListDTO[]>(ENDPOINTS.LISTS, {
            params: search ? { search } : undefined,
         });

         return response.data;
      },
      placeholderData: keepPreviousData,
   });
};
