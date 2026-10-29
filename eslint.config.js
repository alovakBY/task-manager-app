import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import prettier from 'eslint-config-prettier';
import { defineConfig } from 'eslint/config';
import eslintReact from '@eslint-react/eslint-plugin';

export default defineConfig(
  { ignores: ['dist', 'node_modules'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      eslintReact.configs.recommended, // Включаем правила нового плагина React
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

      // Ваши правила сортировки импортов и экспортов
      'simple-import-sort/exports': 'error',
      'react-hooks/exhaustive-deps': 'error',

      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^react', '^@?\\w'],
            ['^(shared|PlaceOrder)'],
            ['^\\./', '^\\..?'],
            ['^.*\\.module\\.scss$'],
          ],
        },
      ],
    },
  },
  prettier,
);
