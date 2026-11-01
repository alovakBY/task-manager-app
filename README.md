# Taskers — менеджер задач

Тестовое задание: списки задач, задачи со статусами, приоритетами и дедлайнами, авторизация, светлая/тёмная/системная тема.

- **Live demo:** _добавить ссылку после деплоя_
- **Демо-аккаунт:** `admin@example.com` / `Admin123!`

## Стек

React · TypeScript · Vite · React Router · TanStack Query · axios · MSW · zod · Radix UI · SCSS Modules · Vitest · Storybook

## Запуск

npm install
npm run dev # http://localhost:5173

| `npm run dev` - dev-сервер
| `npm run build` / `npm run preview` - проверка типов + продакшен-сборка / локальный просмотр сборки | |
| `npm run test:storybook` - play-функции всех историй |
| `npm run storybook` - Storybook на http://localhost:6006 |
| `npm run lint` / `npm run lint:css` / `npm run typecheck` - ESLint / Stylelint / `tsc -b` |

Перед первым запуском Storybook-тестов скачайте браузер для Playwright:

```bash
npx playwright install chromium --only-shell
```

## Слой данных

Источник истины — «сервер», а не UI-стейт и не импорт JSON в компонент. Компоненты ничего не знают о хранилище: они получают данные и колбэки через хуки.

```
Страница ─► хук React Query ─► axios (baseURL /api) ─► MSW handler ─► mock db ─► localStorage
(pages/)    (features/*/api)    (src/api/config.ts)    (src/mocks/handlers)  (src/mocks/db.ts)
```

- **Хуки** (`src/features/{auth,lists,tasks}/api`) — один хук на запрос (`useLists`, `useCreateTask`, `useUpdateTask`, …). После мутаций инвалидируются и таблицы задач, и списки, потому что от задач зависят счётчики на карточках и статусы по дедлайнам задачи.
- **MSW** (`src/mocks`) — это бэкенд: REST-эндпоинты, проверкой сессии (401), ответами 404 и случайной задержкой, чтобы были видны состояния загрузки. Состояние хранится в `localStorage`, поэтому данные и сессия переживают перезагрузку. MSW запускается и в продакшен-сборке — на нём работает live demo.
- **Сброс демо-данных:** удалите ключи `task-manager:mock-db` и `task-manager:mock-session` из `localStorage` (или откройте сайт в приватном окне).

| Метод                       | Путь                           | Описание                                       |
| --------------------------- | ------------------------------ | ---------------------------------------------- |
| POST                        | `/api/auth/login`              | вход                                           |
| POST                        | `/api/auth/logout`             | выход                                          |
| GET                         | `/api/auth/me`                 | текущая сессия                                 |
| GET                         | `/api/lists?search=`           | списки                                         |
| POST / GET / PATCH / DELETE | `/api/lists[/:id]`             | CRUD списков (при удалении удаляются и задачи) |
| GET / POST                  | `/api/lists/:id/tasks?status=` | задачи списка, фильтр по статусу               |
| GET / PATCH / DELETE        | `/api/tasks/:id`               | задача                                         |

## Доменная логика

Чистые функции без React, покрыты юнит-тестами:

- `features/tasks/model/sortTasks.ts` — сортировка:
   1. незавершённые просроченные — выше всех;
   2. чем ближе дедлайн, тем выше (задачи без дедлайна — после задач с дедлайном);
   3. приоритет (high → low) разрешает ничью при одинаковом дедлайне;
   4. `done` — внизу.
- `features/tasks/model/deadline.ts` — «просрочена» (незавершённая с прошедшим дедлайном) и «скоро дедлайн» (в ближайшие 48 часов).
- `features/lists/model/listStats.ts` — счётчики карточки, прогресс и цветовой индикатор. Каждая задача попадает ровно в одну корзину, поэтому сумма счётчиков равна числу задач: незавершённая просроченная задача считается как `overdue`, а не как `new` / `in progress`. Прогресс — доля `done`. Индикатор: красный — есть просроченные, жёлтый — есть дедлайн в ближайшие 48 часов.

## Тесты

- `Auth/LoginForm` — отправка формы, валидация, ошибка сервера, состояние загрузки;
- `Tasks/TasksTable` — смена статуса;

## Структура

```
src/
  api/          axios-клиент, разбор ошибок API
  features/     auth · lists · tasks
    */api       хуки React Query и DTO
    */model     типы, схемы zod, доменная логика (+ *.test.ts)
    */view      презентационные компоненты (+ *.stories.tsx)
  pages/        страницы — связывают хуки и компоненты
  routes/       роутер, защищённые маршруты, пути
  mocks/        MSW: хендлеры, «БД», сид
  shared/       UI-кит (Button, Input, Select, Modal, …), тема, утилиты
```
