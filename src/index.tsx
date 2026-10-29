import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Root } from './Root';

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
      <Root />
    </StrictMode>,
  );
});
