import js from '@eslint/js'
import tseslint from '@typescript-eslint'
import globals from 'globals'

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
