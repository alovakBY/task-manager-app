import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { api } from '@/api/config';

import type { SignInDTO } from './types';
import type { User } from '../model/types';

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation<User, AxiosError<{ message: string }>, SignInDTO>({
    mutationKey: ['login'],
    mutationFn: async (data) => {
      const response = await api.post('/auth', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
  });
};
