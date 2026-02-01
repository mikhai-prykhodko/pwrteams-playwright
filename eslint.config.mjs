// eslint.config.js
import tsParser from '@typescript-eslint/parser';
import playwright from 'eslint-plugin-playwright';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: ['**/node_modules/*', '**/test-results/*', '**/build/*'],
  },
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  {
    ...playwright.configs['flat/recommended'],
    files: ['**/*.ts', '**tests/**'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'playwright/no-skipped-test': 'off',
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],
      'playwright/no-conditional-in-test': ['error'],
    },
  },
  eslintPluginPrettierRecommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
    },
    rules: {
      indent: 'off',
      '@typescript-eslint/no-extraneous-class': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],
    },
  },
];
