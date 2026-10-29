import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Root } from './Root';

import '@/shared/view/styles/index.scss';

const container = document.getElementById('root');
const rootElement = createRoot(container!);

rootElement.render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
