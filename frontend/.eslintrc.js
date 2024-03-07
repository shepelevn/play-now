module.exports = {
  env: {
    browser: true,
    es2022: true,
  },
  extends: [
    'eslint:recommended',
    'prettier',
    'plugin:@typescript-eslint/eslint-recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['prettier', '@typescript-eslint'],
  rules: {
    'no-useless-constructor': 0,
    semi: 2,
    'no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/semi': 2,
    'prettier/prettier': 'error',
    '@typescript-eslint/prefer-readonly': ['error'],
  },
};
