const tseslint = require('typescript-eslint');
const eslintConfigPrettier = require('eslint-config-prettier');
const pluginImport = require('eslint-plugin-import');
const pluginPrettier = require('eslint-plugin-prettier');
const pluginDestructureDepth = require('eslint-plugin-destructure-depth');

module.exports = tseslint.config(
  {
    ignores: ['node_modules/', 'dist/', 'eslint.config.js', 'prettier.config.js', 'tsup.config.ts'],
  },
  ...tseslint.configs.recommended,
  {
    plugins: {
      import: pluginImport,
      prettier: pluginPrettier,
      'destructure-depth': pluginDestructureDepth,
    },
    settings: {
      'import/resolver': {
        typescript: true,
        node: true,
      },
    },
    rules: {
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          ts: 'never',
          js: 'never',
        },
      ],
      'prettier/prettier': 'error',
      'import/no-unresolved': 'error',
      camelcase: 'off',
      'no-underscore-dangle': 'off',
      'no-unused-expressions': 'off',
      'prefer-promise-reject-errors': 'off',
      'lines-between-class-members': 'off',
      'prefer-destructuring': 'off',
      'import/order': 'off',
      'max-len': [
        'off',
        {
          code: 300,
        },
      ],
      radix: 'off',
      'no-plusplus': 'off',
      'prefer-const': 0,
      'no-await-in-loop': 'error',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/triple-slash-reference': 'off',
      'import/no-import-module-exports': 'off',
      'no-shadow': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-misused-new': 'error',
      'max-depth': ['error', 2],
      'destructure-depth/max-depth': [
        'error',
        {
          object: {
            max: 2,
          },
        },
      ],
      'func-style': ['error', 'declaration'],
    },
  },
  eslintConfigPrettier,
);
