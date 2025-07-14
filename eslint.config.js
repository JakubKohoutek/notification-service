const { FlatCompat } = require('@eslint/eslintrc');
const compat = new FlatCompat();

module.exports = [
  ...compat.config({
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 9,
      sourceType: 'module',
      ecmaFeatures: { jsx: true },
    },
    plugins: ['jest', '@typescript-eslint'],
    env: {
      es6: true,
      browser: true,
      node: true,
    },
    globals: {
      window: true,
      require: true,
      console: true,
    },
    rules: {
      'arrow-parens': ['warn', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
      'global-require': 'off',
      'indent': 'off',
      'linebreak-style': 'off',
      'max-len': ['warn', 200],
      'newline-per-chained-call': 'off',
      'no-confusing-arrow': 'off',
      'no-empty-function': 'off',
      'no-mixed-operators': 'off',
      'no-multi-assign': 'off',
      'no-multi-spaces': 'off',
      'no-restricted-imports': ['error', 'isomorphic-fetch', 'fetch-retry'],
      'no-trailing-spaces': ['warn', {ignoreComments: false}],
      'prefer-template': 'off',
      'quote-props': ['error', 'consistent'],
      'semi-style': ['error', 'last'],
      'semi': ['warn', 'always'],
      'space-before-function-paren': [
        'warn',
        {
          anonymous: 'always',
          named: 'never',
          asyncArrow: 'always',
        },
      ],
      'template-curly-spacing': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: true,
          argsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-useless-constructor': 'error',
      'semi': ['error'],
      'no-unused-vars': 'off',
      'no-useless-constructor': 'off',
      'camelcase': ['warn', {properties: 'never', allow: ['^UNSAFE_']}],
    },
  }),
  {
    ignores: [
      'lib/',
      'node_modules/',
      '*.env',
      '*.http',
    ],
  },
];
