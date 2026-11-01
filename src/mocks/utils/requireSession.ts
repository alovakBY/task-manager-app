import { HttpResponse } from 'msw';

import { authService } from '../db';

export const requireSession = () =>
   authService.get() ? null : new HttpResponse(null, { status: 401 });
