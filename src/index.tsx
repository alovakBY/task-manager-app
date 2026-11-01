import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
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
   const { worker } = await import('./mocks/browser');

   return worker.start({
      serviceWorker: {
         url: `${import.meta.env.BASE_URL}mockServiceWorker.js`,
      },
   });
}

const container = document.getElementById('root');
const rootElement = createRoot(container!);

enableMocking().then(() => {
   rootElement.render(
      <StrictMode>
         <ThemeProvider>
            <QueryClientProvider client={queryClient}>
               <AppRouter />
            </QueryClientProvider>
         </ThemeProvider>
      </StrictMode>,
   );
});
