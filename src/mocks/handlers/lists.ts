import { delay, http, HttpResponse } from 'msw';

import { ENDPOINTS, getEndpointWithBaseUrl } from '@/api/constants';
import type { ListDTO } from '@/features/lists/api/types';

import { listsTable, tasksTable } from '../db';
import { getListStats, getNotFoundResponse } from '../utils';

export const listsHandlers = [
   // get lists
   http.get(getEndpointWithBaseUrl(ENDPOINTS.LISTS), async ({ request }) => {
      await delay(100);

      const search = new URL(request.url).searchParams.get('search') ?? '';

      const lists = listsTable.getLists(search).map((list) => {
         const tasks = tasksTable.getTasksByListId(list.id);

         return { ...list, ...getListStats(tasks) };
      });
      return HttpResponse.json(lists, { status: 200 });
   }),
   // get list
   http.get<Pick<ListDTO, 'id'>>(
      getEndpointWithBaseUrl(`${ENDPOINTS.LISTS}/:id`),
      async ({ params }) => {
         await delay(100);

         const { id } = params;

         const list = listsTable.getList(id);

         return list
            ? HttpResponse.json(list, { status: 200 })
            : getNotFoundResponse();
      },
   ),
   // add list
   http.post<never, Pick<ListDTO, 'name'>>(
      getEndpointWithBaseUrl(ENDPOINTS.LISTS),
      async ({ request }) => {
         await delay(100);

         const { name } = await request.json();

         const list = listsTable.addList(name);

         return list
            ? HttpResponse.json({ ...list, ...getListStats([]) })
            : getNotFoundResponse();
      },
   ),
   // delete list
   http.delete<never, Pick<ListDTO, 'id'>>(
      getEndpointWithBaseUrl(ENDPOINTS.LIST),
      async ({ params }) => {
         await delay(100);

         const { id } = params;

         const list = listsTable.deleteList(id);

         return list
            ? new HttpResponse(null, { status: 204 })
            : getNotFoundResponse();
      },
   ),
   //rename list
   http.patch<Pick<ListDTO, 'id'>, Pick<ListDTO, 'name'>>(
      getEndpointWithBaseUrl(ENDPOINTS.LIST),
      async ({ params, request }) => {
         await delay(100);

         const { name } = await request.json();

         const list = listsTable.renameList(params.id, name);

         if (list) {
            const tasks = tasksTable.getTasksByListId(list.id);

            return new HttpResponse(
               { ...list, ...getListStats(tasks) },
               { status: 204 },
            );
         }

         return getNotFoundResponse();
      },
   ),
   // get tasks by listId
   http.get<Pick<ListDTO, 'id'>>(
      getEndpointWithBaseUrl(`${ENDPOINTS.TASKS_BY_LIST_ID}`),
      async ({ params }) => {
         await delay(100);

         const { id } = params;

         const list = listsTable.getList(id);

         if (!list) {
            return getNotFoundResponse();
         }

         const tasks = tasksTable.getTasksByListId(list.id);

         return HttpResponse.json(tasks, { status: 200 });
      },
   ),
];
