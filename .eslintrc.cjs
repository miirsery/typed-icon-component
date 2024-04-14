module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaFeatures: { jsx: true },
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  globals: {
    process: true,
  },
  rules: {
    semi: ['error', 'never'],
    quotes: ['error', 'single'],
    'object-curly-spacing': ['error', 'always', { objectsInObjects: true }],
    'max-len': [
      'error',
      {
        code: 120,
        tabWidth: 2,
        ignoreComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
    '@typescript-eslint/no-var-requires': 1,
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/no-explicit-any': 0,
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
  },
}
