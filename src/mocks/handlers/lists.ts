import { delay, http, HttpResponse } from 'msw';

import { ENDPOINTS, getEndpointWithBaseUrl } from '@/api/constants';
import type { ListDTO } from '@/features/lists/api/types';

import { listsTable, tasksTable } from '../db';
import { getListStats } from '../utils';

export const listsHandlers = [
   // list
   http.get<never, never, ListDTO[]>(
      getEndpointWithBaseUrl(ENDPOINTS.LISTS),
      async ({ request }) => {
         const search = new URL(request.url).searchParams.get('search') ?? '';

         await delay(100);

         const lists = listsTable.getLists(search).map((list) => {
            const tasks = tasksTable.getTasksByListId(list.id);

            return { ...list, ...getListStats(tasks) };
         });
         return HttpResponse.json(lists, { status: 200 });
      },
   ),
];
