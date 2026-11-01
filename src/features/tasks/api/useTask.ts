import { useQuery } from '@tanstack/react-query';

import { api } from '@/api/config';
import { ENDPOINTS, PATH_BUILDERS } from '@/api/constants';

import type { TaskDTO } from './types';

export const useTask = (taskId: string) => {
   return useQuery({
      queryKey: [ENDPOINTS.TASK, 'detail', taskId],
      queryFn: async () => {
         const response = await api.get<TaskDTO>(PATH_BUILDERS.TASK(taskId));

         return response.data;
      },
   });
};
