import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/api/config';
import { ENDPOINTS, PATH_BUILDERS } from '@/api/constants';

import type { UpdateTaskInput } from './types';

export const useUpdateTask = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationKey: ['tasks', 'update'],
      mutationFn: async ({ id, data }: UpdateTaskInput) => {
         console.log(id, data);

         const response = await api.patch(PATH_BUILDERS.TASK(id), data);

         return response.data;
      },
      onSuccess: (_, variables) => {
         queryClient.invalidateQueries({
            queryKey: [ENDPOINTS.TASKS_BY_LIST_ID],
         });
         queryClient.invalidateQueries({
            queryKey: [ENDPOINTS.TASK, 'detail', variables.id],
         });
      },
   });
};
