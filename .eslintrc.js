module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 9,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      plugins: ['@typescript-eslint'],
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:jest/recommended'
      ],
      rules: {
        'arrow-parens': ['warn', 'always'],
        'comma-dangle': ['error', 'always-multiline'],
        'global-require': 'off',
        'indent': 'off',
        'linebreak-style': 'off',
        'max-len': ['warn', 200],
        'newline-per-chained-call': 'off', // let it for autoformat
        'no-confusing-arrow': 'off',
        'no-empty-function': 'off',
        'no-mixed-operators': 'off', // let it for autoformat
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
        '@typescript-eslint/semi': ['error'],
        'no-unused-vars': 'off',
        'no-useless-constructor': 'off',
        '@typescript-eslint/camelcase': [
          'error',
          {
            allow: [
              '^DSDLC_[A-Z]', // Items inside Sharepoint list items
              '^UNSAFE_',
            ],
          },
        ],
      },
    },
    {
      files: ['*.test.js', '*.test.ts', '*.test.jsx', '*.test.tsx'],
      rules: {
        'no-unused-expressions': 'off',
        'jest/no-disabled-tests': 'warn',
        'jest/no-focused-tests': 'error',
        'jest/no-identical-title': 'error',
        'jest/valid-expect': 0,
      },
    },
  ],
  plugins: ['jest'],
  env: {
    'es6': true,
    'browser': true,
    'node': true,
  },
  globals: {
    window: true,
    require: true,
    console: true,
  },
  rules: {
    'camelcase': ['warn', {properties: 'never', allow: ['^UNSAFE_']}],
  },
};
