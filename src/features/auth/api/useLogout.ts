import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/api/config';
import { ENDPOINTS } from '@/api/constants';

export const useLogout = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationKey: ['logout'],
      mutationFn: async () => {
         await api.post(ENDPOINTS.AUTH_LOGOUT);
      },
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: [ENDPOINTS.AUTH_ME] });
      },
   });
};
