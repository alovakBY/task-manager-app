import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import path from 'node:path';
import { defineConfig, mergeConfig } from 'vitest/config';

import viteConfig from './vite.config.ts';

export default mergeConfig(
   viteConfig,
   defineConfig({
      test: {
         projects: [
            {
               extends: true,
               test: {
                  name: 'unit',
                  include: ['src/**/*.test.{ts,tsx}'],
                  // jsdom эмулирует браузер в Node.js, чтобы юнит-тесты компонентов рендерились мгновенно
                  environment: 'jsdom',
               },
            },
            {
               extends: true,
               plugins: [
                  storybookTest({
                     configDir: path.join(import.meta.dirname, '.storybook'),
                  }),
               ],
               test: {
                  name: 'storybook',
                  include: ['src/**/*.stories.{ts,tsx}'],
                  browser: {
                     enabled: true,
                     headless: true,
                     provider: playwright(),
                     instances: [{ browser: 'chromium' }],
                  },
               },
            },
         ],
      },
   }),
);
