import { useQuery } from '@tanstack/react-query';
import { delay } from 'msw';

import { api } from '@/api/config';
import { ENDPOINTS, PATH_BUILDERS } from '@/api/constants';

import type { TaskDTO } from './types';

export const useTasks = (listId: string) => {
   return useQuery({
      queryKey: [ENDPOINTS.TASKS_BY_LIST_ID, 'list', listId],
      queryFn: async () => {
         await delay(200);
         const response = await api.get<TaskDTO[]>(
            PATH_BUILDERS.TASKS_BY_LIST_ID(listId),
         );

         return response.data;
      },
   });
};
