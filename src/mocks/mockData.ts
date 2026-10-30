import type { ListDTO } from '@/features/lists/api/types';
import type { TaskDTO } from '@/features/tasks/api/types';

export type MockStore = {
   lists: ListDTO[];
   tasks: TaskDTO[];
};

const HOUR_MS = 60 * 60 * 1000;
const hoursFromNow = (h: number) =>
   new Date(new Date().getTime() + h * HOUR_MS).toISOString();

const createTask = (
   listId: string,
   fields: Pick<TaskDTO, 'title' | 'description' | 'status' | 'priority'> & {
      deadlineInHours: number;
   },
): TaskDTO => ({
   id: crypto.randomUUID(),
   listId,
   title: fields.title,
   description: fields.description,
   status: fields.status,
   priority: fields.priority,
   deadline: hoursFromNow(fields.deadlineInHours),
});

export const createMockData = (): MockStore => {
   const lists: ListDTO[] = [
      {
         id: crypto.randomUUID(),
         name: 'Работа',
      },
      { id: crypto.randomUUID(), name: 'Дом' },
   ];

   const [work, home] = lists;

   const tasks: TaskDTO[] = [
      createTask(work.id, {
         title: 'Исправить баг с куками',
         description: 'Перевести авторизацию на HttpOnly сессии',
         status: 'in_progress',
         priority: 'high',
         deadlineInHours: -2,
      }),
      createTask(work.id, {
         title: 'Провести код-ревью',
         description: 'Посмотреть PR с новой формой входа',
         status: 'new',
         priority: 'high',
         deadlineInHours: 24,
      }),
      createTask(work.id, {
         title: 'Написать юнит-тесты',
         description: 'Покрыть логику сортировки (не менее 8 штук)',
         status: 'done',
         priority: 'high',
         deadlineInHours: 72,
      }),
      createTask(home.id, {
         title: 'Оплатить коммуналку',
         description: 'До конца месяца, иначе пени',
         status: 'new',
         priority: 'high',
         deadlineInHours: 30,
      }),
      createTask(home.id, {
         title: 'Починить кран на кухне',
         description: '',
         status: 'in_progress',
         priority: 'medium',
         deadlineInHours: 120,
      }),
      createTask(home.id, {
         title: 'Купить продукты',
         description: 'Молоко, хлеб, овощи',
         status: 'done',
         priority: 'low',
         deadlineInHours: -20,
      }),
   ];

   return {
      lists,
      tasks,
   };
};
