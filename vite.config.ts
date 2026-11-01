import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

const isDevCommand = process.env.npm_lifecycle_event === 'dev';

export default defineConfig({
   resolve: {
      tsconfigPaths: true,
   },
   plugins: [react()],
   base: isDevCommand ? '/' : '/task-manager-app/',
   css: {
      modules: {
         localsConvention: 'camelCaseOnly',
      },
      preprocessorOptions: {
         scss: {
            loadPaths: [
               path.resolve(import.meta.dirname, 'src/shared/view/styles'),
            ],
         },
      },
   },
});
