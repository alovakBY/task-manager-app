import { delay, http, HttpResponse } from 'msw';

import { ENDPOINTS, getEndpointWithBaseUrl } from '@/api/constants';
import type { ListDTO } from '@/features/lists/api/types';
import type { TaskDataInput, TaskDTO } from '@/features/tasks/api/types';

import { listsTable, tasksTable } from '../db';
import { getNotFoundResponse } from '../utils/getNotFoundResponse';

export const tasksHandlers = [
   // delete task
   http.delete<never, Pick<TaskDTO, 'id'>>(
      getEndpointWithBaseUrl(ENDPOINTS.TASKS),
      async ({ params }) => {
         await delay(100);

         const { id } = params;

         const list = tasksTable.deleteTask(id);

         return list
            ? new HttpResponse(null, { status: 204 })
            : getNotFoundResponse();
      },
   ),
   // add task
   http.post<Pick<ListDTO, 'id'>, TaskDataInput>(
      getEndpointWithBaseUrl(ENDPOINTS.TASKS_BY_LIST_ID),
      async ({ params, request }) => {
         await delay(100);

         if (!listsTable.getList(params.id)) {
            return getNotFoundResponse();
         }

         const data = await request.json();

         const task = tasksTable.addTask(params.id, data);

         return HttpResponse.json(task, { status: 201 });
      },
   ),
   // update task
   http.patch<Pick<TaskDTO, 'id'>, Partial<TaskDataInput>>(
      getEndpointWithBaseUrl(ENDPOINTS.TASKS),
      async ({ params, request }) => {
         await delay();

         const data = await request.json();

         const task = tasksTable.updateTask(params.id, data);

         return task
            ? HttpResponse.json(task, { status: 204 })
            : getNotFoundResponse();
      },
   ),
];
