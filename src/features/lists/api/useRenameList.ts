import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { api } from '@/api/config';
import { ENDPOINTS, PATH_BUILDERS } from '@/api/constants';

import type { ListDTO } from './types';

export const useRenameList = () => {
   const queryClient = useQueryClient();

   return useMutation<
      ListDTO,
      AxiosError<{ message: string }>,
      Pick<ListDTO, 'id' | 'name'>
   >({
      mutationKey: [ENDPOINTS.LISTS, 'rename'],
      mutationFn: async ({ id, name }) => {
         const response = await api.patch(PATH_BUILDERS.LIST(id), { name });
         return response.data;
      },
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: [ENDPOINTS.LISTS] });
      },
   });
};
