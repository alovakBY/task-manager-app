import { delay, http, HttpResponse } from 'msw';

import { ENDPOINTS, getEndpointWithBaseUrl } from '@/api/constants';
import type { ListDTO } from '@/features/lists/api/types';

import { listsTable, tasksTable } from '../db';
import { getListStats } from '../utils';

const LIST_NOT_FOUND = 'List not found';

export const listsHandlers = [
   // get lists
   http.get<never, never, ListDTO[]>(
      getEndpointWithBaseUrl(ENDPOINTS.LISTS),
      async ({ request }) => {
         const search = new URL(request.url).searchParams.get('search') ?? '';

         const lists = listsTable.getLists(search).map((list) => {
            const tasks = tasksTable.getTasksByListId(list.id);

            return { ...list, ...getListStats(tasks) };
         });
         await delay(100);
         return HttpResponse.json(lists, { status: 200 });
      },
   ),
   // add list
   http.post<never, Pick<ListDTO, 'name'>, ListDTO | { message: string }>(
      getEndpointWithBaseUrl(ENDPOINTS.LISTS),
      async ({ request }) => {
         const { name } = await request.json();

         const list = listsTable.addList(name);

         await delay(100);

         return list
            ? HttpResponse.json({ ...list, ...getListStats([]) })
            : HttpResponse.json({ message: LIST_NOT_FOUND }, { status: 404 });
      },
   ),
   // delete list
   http.delete<never, Pick<ListDTO, 'id'>, ListDTO | { message: string }>(
      getEndpointWithBaseUrl(`${ENDPOINTS.LISTS}/:id`),
      async ({ params }) => {
         const { id } = params;

         const list = listsTable.deleteList(id);

         await delay(100);

         return list
            ? new HttpResponse(null, { status: 204 })
            : HttpResponse.json({ message: LIST_NOT_FOUND }, { status: 404 });
      },
   ),
   //rename list
   http.patch<
      never,
      Pick<ListDTO, 'id' | 'name'>,
      ListDTO | { message: string }
   >(getEndpointWithBaseUrl(`${ENDPOINTS.LISTS}/:id`), async ({ request }) => {
      const { id, name } = await request.json();

      const list = listsTable.renameList(id, name);

      await delay(100);

      if (list) {
         const tasks = tasksTable.getTasksByListId(list.id);

         return new HttpResponse(
            { ...list, ...getListStats(tasks) },
            { status: 204 },
         );
      }

      return HttpResponse.json({ message: LIST_NOT_FOUND }, { status: 404 });
   }),
];
