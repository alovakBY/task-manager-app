import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AppRouter } from './routes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export const Root = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div>Header</div>
      <AppRouter />
    </QueryClientProvider>
  );
};
