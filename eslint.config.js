import typescript from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import importPlugin from 'eslint-plugin-import'
import prettierConfig from 'eslint-config-prettier'

export default [
  {
    ignores: [
      'coverage/',
      'node_modules/',
      'dist/',
      '**/*.d.ts',
      '_drizzle/',
      'worker-configuration.d.ts',
      '.wrangler/',
      'drizzle.config.ts',
    ],
  },

  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
      globals: {
        console: 'readonly',
        process: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      import: importPlugin,
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.ts'],
        },
        typescript: {
          project: './tsconfig.json',
        },
      },
    },
    rules: {
      ...prettierConfig.rules,

      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
        },
      ],

      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['./*', '../*'],
              message: 'Use absolute imports with @worker/, @actor/, @workflow/, @durable/, or @web3-api-types/ prefix instead',
            },
          ],
        },
      ],

      'prefer-const': 'error',
      'no-var': 'error',
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],

      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
    },
  },

  {
    files: ['**/*.test.ts', '**/*.spec.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'no-console': 'off',
      'no-restricted-imports': 'off',
    },
  },

  {
    files: ['**/index.ts'],
    rules: {
      'import/no-default-export': 'off',
    },
  },
]
