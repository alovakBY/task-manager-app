import { http, HttpResponse } from 'msw';

import { ENDPOINTS, getEndpointWithBaseUrl } from '@/api/constants';
import type { ListDTO } from '@/features/lists/api/types';

import { listsTable, tasksTable } from '../db';
import { getListStats } from '../utils';

export const listsHandlers = [
   // list
   http.get<never, never, ListDTO[]>(
      getEndpointWithBaseUrl(ENDPOINTS.LISTS),
      () => {
         const lists = listsTable.getLists().map((list) => {
            const tasks = tasksTable.getTasksByListId(list.id);

            return { ...list, ...getListStats(tasks) };
         });
         return HttpResponse.json(lists, { status: 200 });
      },
   ),
];
