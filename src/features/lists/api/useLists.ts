import { useQuery } from '@tanstack/react-query';

import { api } from '@/api/config';
import { ENDPOINTS } from '@/api/constants';

import type { ListDTO } from './types';

export const useLists = () => {
   return useQuery({
      queryKey: [ENDPOINTS.LISTS],
      queryFn: async () => {
         const response = await api.get<ListDTO[]>(ENDPOINTS.LISTS);

         return response.data;
      },
   });
};
