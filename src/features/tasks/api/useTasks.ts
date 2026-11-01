import { useQuery } from '@tanstack/react-query';
import { delay } from 'msw';

import { api } from '@/api/config';
import { ENDPOINTS, PATH_BUILDERS } from '@/api/constants';

import type { TaskDTO, TaskStatusDTO } from './types';

export const useTasks = (listId: string, status: TaskStatusDTO | null) => {
   return useQuery({
      queryKey: [ENDPOINTS.TASKS_BY_LIST_ID, 'list', listId, status ?? null],
      queryFn: async () => {
         await delay(200);
         const response = await api.get<TaskDTO[]>(
            PATH_BUILDERS.TASKS_BY_LIST_ID(listId),
            {
               params: status ? { status } : undefined,
            },
         );

         return response.data;
      },
   });
};
