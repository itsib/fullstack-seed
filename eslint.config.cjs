const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const jsonPlugin = require('eslint-plugin-json');
const i18nextConfig = require('eslint-plugin-i18next');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const globals = require('globals');
const a11y = require('eslint-plugin-jsx-a11y');
const react = require('eslint-plugin-react');
const reactHooks = require('eslint-plugin-react-hooks');
const tanstackConfig = require('@tanstack/eslint-plugin-query');

module.exports = [
  {
    name: 'base:ignores',
    ignores: [
      'dist/**',
      'dev-dist/**',
      '**/dev-dist/**',
      '**/*.config.*',
      '**/jest.preset*',
      '.*.js',
      '**/node_modules/**',
      '**/test-setup.ts',
      '**/esbuild.js'
    ],
  },
  ...tseslint.config([
    {
      name: 'base:ts|tsx',
      files: ['**/*.ts', '**/*.tsx'],
      ignores: ['**/*.spec.*'],
      extends: [
        eslint.configs.recommended,
        tseslint.configs.base,
        i18nextConfig.configs['flat/recommended'],
        eslintPluginPrettierRecommended,
      ],
      languageOptions: {
        parser: tseslint.parser,
        parserOptions: {
          ecmaVersion: 2022,
          tsconfigRootDir: __dirname,
          ecmaFeatures: {
            jsx: true,
            modules: true,
          },
          sourceType: 'module',
        },
        globals: {
          ...globals.node,
          ...globals.browser,
          __dirname: 'readonly',
        },
      },
      rules: {
        'prettier/prettier': 'error',
        'arrow-body-style': 'off',
        'no-var': 'error',
        'prefer-arrow-callback': 'off',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/prefer-for-of': 'off',
        '@typescript-eslint/consistent-indexed-object-style': 'off',
        '@typescript-eslint/prefer-function-type': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-unused-expressions': 'warn',
        '@typescript-eslint/no-extraneous-class': 'off',
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            caughtErrorsIgnorePattern: '^_',
          },
        ],
        'eqeqeq': ['error', 'smart'],
        'max-classes-per-file': ['error', 4],
        'no-console': ['error', {
          allow: ['error', 'warn', 'debug']
        }],
        'no-duplicate-imports': 'error',
        'no-eval': 'error',
      },
    },
    {
      name: 'front:ts|tsx',
      files: ['applications/front/**/*.ts', 'applications/front/**/*.tsx'],
      languageOptions: {
        parser: tseslint.parser,
        parserOptions: {
          ecmaVersion: 2022,
          tsconfigRootDir: __dirname,
          ecmaFeatures: {
            jsx: true,
            modules: true,
          },
          sourceType: 'module',
          projectService: true,
        },
        globals: {
          ...globals.browser,
        },
      },
      settings: {
        react: {
          version: 'detect'
        },
      },
      plugins: {
        'jsx-a11y': a11y,
        react,
        'react-hooks': reactHooks,
        '@tanstack/query': tanstackConfig,
      },
      rules: {
        ...react.configs.recommended.rules,
        ...reactHooks.configs.recommended.rules,
        ...a11y.configs.recommended.rules,
        '@tanstack/query/exhaustive-deps': 'error',
        '@tanstack/query/no-rest-destructuring': 'error',
        '@tanstack/query/stable-query-client': 'error',
        '@tanstack/query/no-unstable-deps': 'error',
        '@tanstack/query/infinite-query-property-order': 'error',
        'react/react-in-jsx-scope': 'off',
        'dot-location': 'off',
        'no-native-reassign': 'off',
        'no-negated-in-lhs': 'off',
        'no-unused-vars': 'off',
        'n/no-extraneous-import': 'off',
        'no-shadow': 'off',
        'no-undef': 'off',
        'func-names': 'off',
        'regexp/no-unused-capturing-group': 'off',
        'sort-imports': 'off',
        'n/no-missing-import': 'off',
        'n/no-unsupported-features/node-builtins': 'off',
        'no-implicit-coercion': 'off',
        'prefer-regex-literals': 'off',
        'no-use-before-define': 'off',
        'array-callback-return': 'off',
        'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
        'jsx-a11y/anchor-is-valid': 'off',
        'jsx-a11y/anchor-has-content': 'off',
        'react/button-has-type': 'off',
        'camelcase': ['error', {
          properties: 'always',
          ignoreImports: true,
          ignoreGlobals: true,
          allow: [
            'require_tld',
            'allow_underscores',
          ],
        }],
      },
    },
  ]),
  {
    name: 'base:json',
    files: ['**/*.json'],
    ...jsonPlugin.configs['recommended'],
    rules: {
      'json/unknown': 'error',
      'json/comment-not-permitted': 'error',
      'json/undefined': 'error',
      'json/enum-value-mismatch': 'error',
      'json/unexpected-end-of-comment': 'error',
      'json/unexpected-end-of-string': 'error',
      'json/unexpected-end-of-number': 'error',
      'json/invalid-unicode': 'error',
      'json/invalid-escape-character': 'error',
      'json/invalid-character': 'error',
      'json/property-expected': 'error',
      'json/comma-expected': 'error',
      'json/colon-expected': 'error',
      'json/value-expected': 'error',
      'json/comma-or-close-backet-expected': 'error',
      'json/comma-or-close-brace-expected': 'error',
      'json/trailing-comma': 'error',
      'json/duplicate-key': 'error',
      'json/schema-resolve-error': 'error',
    },
  }
];
