import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Header } from '@shared/view/components/Header/Header';
import { ThemeProvider } from '@shared/view/providers/ThemeProvider/ThemeProvider';
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

import '@/shared/view/styles/index.scss';

async function enableMocking() {
  if (!import.meta.env.DEV) {
    return;
  }

  const { worker } = await import('./mocks/browser');

  return worker.start();
}

const container = document.getElementById('root');
const rootElement = createRoot(container!);

enableMocking().then(() => {
  rootElement.render(
    <StrictMode>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <Header />
          <AppRouter />
        </QueryClientProvider>
      </ThemeProvider>
    </StrictMode>,
  );
});
