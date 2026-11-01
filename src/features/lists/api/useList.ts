import { useQuery } from '@tanstack/react-query';
import { delay } from 'msw';

import { api } from '@/api/config';
import { ENDPOINTS, PATH_BUILDERS } from '@/api/constants';

import type { ListDTO } from './types';

export const useList = (listId: string) => {
   return useQuery({
      queryKey: [ENDPOINTS.LISTS, 'detail', listId],
      queryFn: async () => {
         await delay(200);
         const response = await api.get<ListDTO>(PATH_BUILDERS.LIST(listId));

         return response.data;
      },
   });
};
