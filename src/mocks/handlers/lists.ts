import { http, HttpResponse } from 'msw';

import { ENDPOINTS, getEndpointWithBaseUrl } from '@/api/constants';
import type { ListDTO } from '@/features/lists/api/types';

import { listsTable } from '../db';

export const listsHandlers = [
   // list
   http.get<never, never, ListDTO[]>(
      getEndpointWithBaseUrl(ENDPOINTS.LISTS),
      () => {
         const lists = listsTable.getLists();
         return HttpResponse.json(lists, { status: 200 });
      },
   ),
];
