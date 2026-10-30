import { http, HttpResponse } from 'msw';

import { BASE_URL } from '@/api/config';
import type { SignInDTO, User } from '@/features/auth/api/types';

let currentUser: User | null = null;

export const handlers = [
  // auth
  http.post<never, SignInDTO, User | { message: string }>(
    `${BASE_URL}/auth`,
    async ({ request }) => {
      const { email, password } = await request.json();

      if (email === 'admin@example.com' && password === 'Admin123!') {
        const user = { email, name: 'Admin' };
        currentUser = user;
        return HttpResponse.json(user, { status: 200 });
      }

      return HttpResponse.json(
        { message: 'Incorrect email or password' },
        { status: 401 },
      );
    },
  ),

  // me
  http.get(`${BASE_URL}/auth/me`, () => {
    if (!currentUser) {
      return new HttpResponse(null, { status: 401 });
    }
    return HttpResponse.json({ isAuth: true, user: currentUser });
  }),
];
