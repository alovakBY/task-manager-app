import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { api } from '@/api/config';
import { ENDPOINTS } from '@/api/constants';

import type { ListDTO } from './types';

export const useRenameList = () => {
   const queryClient = useQueryClient();

   return useMutation<
      ListDTO,
      AxiosError<{ message: string }>,
      Pick<ListDTO, 'id' | 'name'>
   >({
      mutationKey: [ENDPOINTS.LISTS, 'rename'],
      mutationFn: async (data) => {
         const response = await api.patch(ENDPOINTS.LIST(data.id), data);
         return response.data;
      },
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: [ENDPOINTS.LISTS] });
      },
   });
};
