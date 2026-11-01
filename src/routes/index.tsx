import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';

import { Loader } from '@/shared/view/components/Loader/Loader';

import { PATHS } from './constants';
import { ProtectedRoute } from './ProtectedRoute';
import { AppLayout } from '@/shared/view/layouts/AppLayout/AppLayout';

const LoginPage = lazy(() =>
   import('@/pages/Login/LoginPage').then((module) => ({
      default: module.LoginPage,
   })),
);
const ListsPage = lazy(() =>
   import('@/pages/Lists/ListsPage').then((module) => ({
      default: module.ListsPage,
   })),
);
const ListDetailPage = lazy(() =>
   import('@/pages/ListDetail/ListDetailPage').then((module) => ({
      default: module.ListDetailPage,
   })),
);

const TaskDetailPage = lazy(() =>
   import('@/pages/TaskDetail/TaskDetailPage').then((module) => ({
      default: module.TaskDetailPage,
   })),
);

const withSuspense = (Component: React.ComponentType) => (
   <Suspense fallback={<Loader isFullScreen />}>
      <Component />
   </Suspense>
);

const routerConfig = createBrowserRouter([
   {
      path: PATHS.BASE,
      element: <AppLayout />,
      children: [
         {
            index: true,
            element: <Navigate replace to={PATHS.LISTS} />,
         },
         {
            path: PATHS.LOGIN,
            element: withSuspense(LoginPage),
         },
         {
            element: <ProtectedRoute />,
            children: [
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
         {
            path: '*',
            element: <Navigate replace to={PATHS.LISTS} />,
         },
      ],
   },
]);

export const AppRouter = () => {
   return <RouterProvider router={routerConfig} />;
};
