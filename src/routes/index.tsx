import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';

import { AppLayout } from './AppLayout';
import { PATHS } from './constants';

const LoginPage = lazy(() =>
  import('@/pages/Login').then((module) => ({ default: module.Login })),
);
const ListsPage = lazy(() =>
  import('@/pages/Lists').then((module) => ({ default: module.Lists })),
);
const ListDetailPage = lazy(() =>
  import('@/pages/ListDetail').then((module) => ({
    default: module.ListDetail,
  })),
);

const TaskDetailPage = lazy(() =>
  import('@/pages/TaskDetail').then((module) => ({
    default: module.TaskDetail,
  })),
);

const withSuspense = (Component: React.ComponentType) => (
  <Suspense fallback={<div>Загрузка страницы...</div>}>
    <Component />
  </Suspense>
);

const routerConfig = createBrowserRouter([
  {
    path: PATHS.LOGIN,
    element: withSuspense(LoginPage),
  },
  {
    path: PATHS.BASE,
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate replace to={PATHS.LISTS} />,
      },
      {
        path: PATHS.LISTS,
        element: withSuspense(ListsPage),
      },
      {
        path: PATHS.LIST_DETAIL,
        element: withSuspense(ListDetailPage),
      },
      {
        path: PATHS.TASK_DETAIL,
        element: withSuspense(TaskDetailPage),
      },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={routerConfig} />;
};
