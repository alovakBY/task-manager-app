import { RouterProvider } from 'react-router-dom';

import { router } from './routes';

export const Root = () => {
  return <RouterProvider router={router} />;
};
