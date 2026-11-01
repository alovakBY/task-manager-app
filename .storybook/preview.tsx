import { MemoryRouter } from 'react-router';
import type { Preview } from '@storybook/react-vite';

import '../src/shared/view/styles/index.scss';

const preview: Preview = {
   globalTypes: {
      theme: {
         description: 'Color theme',
         toolbar: {
            title: 'Theme',
            icon: 'mirror',
            items: [
               { value: 'light', title: 'Light' },
               { value: 'dark', title: 'Dark' },
               { value: 'system', title: 'System' },
            ],
            dynamicTitle: true,
         },
      },
   },
   initialGlobals: {
      theme: 'system',
   },
   decorators: [
      (Story, context) => {
         document.documentElement.setAttribute(
            'data-theme',
            context.globals.theme,
         );

         return (
            <MemoryRouter>
               <Story />
            </MemoryRouter>
         );
      },
   ],
   parameters: {
      layout: 'padded',
      controls: {
         matchers: {
            color: /(background|color)$/i,
            date: /Date$/i,
         },
      },
   },
};

export default preview;
