import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { api } from '@/api/config';
import { ENDPOINTS, PATH_BUILDERS } from '@/api/constants';

import type { ListDTO } from './types';

export const useDeleteList = () => {
   const queryClient = useQueryClient();

   return useMutation<ListDTO, AxiosError<{ message: string }>, string>({
      mutationKey: [ENDPOINTS.LISTS, 'delete'],
      mutationFn: async (id) => {
         const response = await api.delete(PATH_BUILDERS.LIST(id));

         return response.data;
      },
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: [ENDPOINTS.LISTS] });
      },
   });
};
