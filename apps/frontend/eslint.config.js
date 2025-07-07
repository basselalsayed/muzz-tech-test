import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import { configs as guardrails } from 'eslint-plugin-guardrails';
import importPlugin from 'eslint-plugin-import';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import sort from 'eslint-plugin-sort';
import testingLibrary from 'eslint-plugin-testing-library';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import { config, configs } from 'typescript-eslint';

import { DIRECTORIES } from './utils/constants.js';

export default config(
  { ignores: ['dist', '.lintstagedrc.json'] },
  {
    extends: [
      js.configs.recommended,
      ...configs.recommendedTypeChecked,
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
      sort.configs['flat/recommended'],
      eslintPluginUnicorn.configs.recommended,
    ],
    files: ['**/*.{js,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'unused-imports': unusedImports,
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          fixStyle: 'inline-type-imports',

          prefer: 'type-imports',
        },
      ],
      '@typescript-eslint/member-ordering': [
        'error',
        {
          classes: [
            'public-static-field',
            'public-static-accessor',
            'public-static-get',
            'public-static-method',

            'public-field',
            'public-accessor',
            'public-get',
            'public-method',

            'constructor',
            'protected-static-field',
            'protected-static-accessor',
            'protected-static-get',
            'protected-static-method',

            'private-static-field',
            'private-static-get',
            'private-static-accessor',
            'private-static-method',

            'protected-field',
            'protected-accessor',
            'protected-get',
            'protected-method',

            'private-field',
            'private-accessor',
            'private-get',
            'private-method',
          ],
        },
      ],
      'class-methods-use-this': 'error',
      'import/no-cycle': 'error',
      'import/order': [
        'error',
        {
          alphabetize: {
            order: 'asc',
          },
          named: true,
          'newlines-between': 'always',
          pathGroups: [
            {
              group: 'parent',
              pattern: '@/**',
              position: 'before',
            },
          ],
        },
      ],
      'no-console': 'error',
      'react/jsx-curly-brace-presence': [
        'error',
        {
          children: 'never',
          propElementValues: 'always',
          props: 'never',
        },
      ],
      'react/jsx-fragments': ['error', 'syntax'],
      'react/jsx-key': ['error', { checkFragmentShorthand: true }],
      'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
      'react/prop-types': 'off',
      'react/require-render-return': 'error',
      'react/self-closing-comp': [
        'error',
        {
          component: true,
          html: true,
        },
      ],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'sort/export-members': 'off',
      'sort/exports': 'error',
      'sort/import-members': 'off',
      'sort/imports': 'off',
      'sort/type-properties': 'error',
      'unicorn/consistent-destructuring': 'error',
      'unicorn/no-useless-undefined': ['error', { checkArguments: false }],
      'unicorn/prevent-abbreviations': 'off',
      'unused-imports/no-unused-imports': 'error',
    },
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
      },
      react: { version: 'detect' },
    },
  },
  ...guardrails.recommended(DIRECTORIES, {
    getAlias: (dir) => `@/${dir}`,
    staticUpwardPathDepth: 5,
  }),
  {
    files: ['**/*.test.{js,ts,tsx}', '**/test/*.{js,ts,tsx}'],
    rules: {
      '@typescript-eslint/await-thenable': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      'unicorn/no-null': 'off',
    },
  },
  {
    files: ['**/*.test.tsx'],
    ...testingLibrary.configs['flat/react'],
  },
  eslintPluginPrettierRecommended,
  eslintConfigPrettier,
  {
    rules: {
      'arrow-body-style': [
        'error',
        'as-needed',
        { requireReturnForObjectLiteral: false },
      ],
      'prefer-arrow-callback': 'error',
    },
  }
);
