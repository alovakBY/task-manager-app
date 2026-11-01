// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import prettier from 'eslint-config-prettier';
import { defineConfig } from 'eslint/config';
import eslintReact from '@eslint-react/eslint-plugin';
import pluginQuery from '@tanstack/eslint-plugin-query';

export default defineConfig(
   { ignores: ['dist', 'node_modules'] },
   {
      extends: [
         js.configs.recommended,
         ...tseslint.configs.recommended,
         eslintReact.configs.recommended,
      ],
      files: ['**/*.{ts,tsx}'],
      languageOptions: {
         ecmaVersion: 'latest',
         sourceType: 'module',
         globals: globals.browser,
         parserOptions: {
            ecmaFeatures: { jsx: true },
         },
      },
      plugins: {
         'react-hooks': reactHooks,
         'react-refresh': reactRefresh,
         'simple-import-sort': simpleImportSort,
      },
      rules: {
         ...reactHooks.configs.recommended.rules,
         'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
         ],
         'simple-import-sort/exports': 'error',
         'react-hooks/exhaustive-deps': 'error',

         'simple-import-sort/imports': [
            'error',
            {
               groups: [
                  ['^react', '^(?!@/)(^@?\\w)'],
                  ['^@/'],
                  ['^(shared|PlaceOrder)'],
                  ['^\\./', '^\\..?'],
                  ['^.*\\.module\\.scss$'],
               ],
            },
         ],
      },
   },
   ...pluginQuery.configs['flat/recommended'],
   prettier,
);
