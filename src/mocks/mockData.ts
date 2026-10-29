const now = new Date();
const hoursAgo = (h: number) =>
  new Date(now.getTime() - h * 60 * 60 * 1000).toISOString();
const hoursAhead = (h: number) =>
  new Date(now.getTime() + h * 60 * 60 * 1000).toISOString();

export const mockLists = [
  {
    id: crypto.randomUUID(),
    title: 'Работа',
    tasks: [
      {
        id: crypto.randomUUID(),
        title: 'Исправить баг с куками',
        description: 'Перевести авторизацию на HttpOnly сессии',
        status: 'in progress',
        priority: 'high',
        deadline: hoursAgo(2),
      },
      {
        id: crypto.randomUUID(),
        title: 'Подготовить демо для ТЗ',
        description: 'Записать screencast работы приложения',
        status: 'new',
        priority: 'medium',
        deadline: hoursAhead(24),
      },
      {
        id: crypto.randomUUID(),
        title: 'Написать юнит-тесты',
        description: 'Покрыть логику сортировки (не менее 8 штук)',
        status: 'done',
        priority: 'high',
        deadline: hoursAhead(72),
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    title: 'Личное',
    tasks: [],
  },
];
