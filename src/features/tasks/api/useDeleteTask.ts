import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/api/config';
import { ENDPOINTS, PATH_BUILDERS } from '@/api/constants';

export const useDeleteTask = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationKey: ['tasks', 'delete'],
      mutationFn: async (id: string) => {
         await api.delete(PATH_BUILDERS.TASK(id));
      },
      onSuccess: () => {
         queryClient.invalidateQueries({
            queryKey: [ENDPOINTS.TASKS_BY_LIST_ID],
         });
      },
   });
};
