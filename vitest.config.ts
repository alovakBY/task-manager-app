import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
   resolve: {
      // Это сообщает тестам, как правильно читать пути со знаком @/
      tsconfigPaths: true,
   },
   test: {
      projects: [
         {
            extends: true,
            test: {
               name: 'unit',
               include: ['src/**/*.test.{ts,tsx}'],
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
});
