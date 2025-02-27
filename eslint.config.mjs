import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    parser: '@typescript-eslint/parser',
    pluggin: ['@typescript-eslint'],
    ignorePatterns: ['**/build/*', '**/node_modules/*', '**/public/*']
  }
]
n
