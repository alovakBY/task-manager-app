import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { api } from '@/api/config';
import { ENDPOINTS } from '@/api/constants';

import type { ListDTO } from './types';

export const useAddList = () => {
   const queryClient = useQueryClient();

   return useMutation<
      ListDTO,
      AxiosError<{ message: string }>,
      Pick<ListDTO, 'name'>
   >({
      mutationKey: [ENDPOINTS.LISTS, 'add'],
      mutationFn: async (data) => {
         const response = await api.post(ENDPOINTS.LISTS, data);

         return response.data;
      },
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: [ENDPOINTS.LISTS] });
      },
   });
};
