import js from '@eslint/js'
import globals from 'globals'
import * as tseslint from 'typescript-eslint'

export default [
  { ignores: ['**/build/*', '**/node_modules/*', '**/public/*'] },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      '@typescript-eslint/no-unsafe-assignment': 'off',
    },
  },
  ...tseslint.configs.recommendedTypeChecked,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
    rules: {},
  },
]
