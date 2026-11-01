import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { api } from '@/api/config';
import { ENDPOINTS, PATH_BUILDERS } from '@/api/constants';

import type { TaskDataInput, TaskDTO } from './types';

export const useAddTask = (listId: string) => {
   const queryClient = useQueryClient();

   return useMutation<TaskDTO, AxiosError<{ message: string }>, TaskDataInput>({
      mutationKey: [ENDPOINTS.TASKS, 'add'],
      mutationFn: async (data) => {
         const response = await api.post(
            PATH_BUILDERS.TASKS_BY_LIST_ID(listId),
            data,
         );

         return response.data;
      },
      onSuccess: () => {
         queryClient.invalidateQueries({
            queryKey: [ENDPOINTS.TASKS_BY_LIST_ID],
         });
      },
   });
};
