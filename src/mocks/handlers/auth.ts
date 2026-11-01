import { delay, http, HttpResponse } from 'msw';

import { ENDPOINTS, getEndpointWithBaseUrl } from '@/api/constants';
import type { SignInDTO, User } from '@/features/auth/api/types';

import { authService } from '../db';

export const authHandlers = [
   // login
   http.post<never, SignInDTO>(
      getEndpointWithBaseUrl(ENDPOINTS.AUTH_LOGIN),
      async ({ request }) => {
         await delay(100);
         const { email, password } = await request.json();

         if (email === 'admin@example.com' && password === 'Admin123!') {
            const user = { email, name: 'Admin' };

            authService.set(user);

            return HttpResponse.json(user, { status: 200 });
         }

         return HttpResponse.json(
            { message: 'Incorrect email or password' },
            { status: 401 },
         );
      },
   ),

   // logout
   http.post(getEndpointWithBaseUrl(ENDPOINTS.AUTH_LOGOUT), async () => {
      await delay(100);
      authService.clear();

      return HttpResponse.json(null, { status: 204 });
   }),

   // me
   http.get<never, never, { user: User | null; isAuth: boolean }>(
      getEndpointWithBaseUrl(ENDPOINTS.AUTH_ME),
      () => {
         const user = authService.get();

         if (!user) {
            return new HttpResponse(
               { isAuth: false, user: null },
               { status: 200 },
            );
         }

         return HttpResponse.json({ isAuth: true, user });
      },
   ),
];
