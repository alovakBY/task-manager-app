import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
   resolve: {
      tsconfigPaths: true,
   },
   plugins: [react()],
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
