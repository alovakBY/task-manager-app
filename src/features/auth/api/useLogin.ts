import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { api } from '@/api/config';
import { ENDPOINTS } from '@/api/constants';

import type { SignInDTO } from './types';
import type { User } from '../model/types';

export const useLogin = () => {
   const queryClient = useQueryClient();

   return useMutation<User, AxiosError<{ message: string }>, SignInDTO>({
      mutationKey: [ENDPOINTS.AUTH_LOGIN],
      mutationFn: async (data) => {
         const response = await api.post(ENDPOINTS.AUTH_LOGIN, data);
         return response.data;
      },
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: [ENDPOINTS.AUTH_ME] });
      },
   });
};
