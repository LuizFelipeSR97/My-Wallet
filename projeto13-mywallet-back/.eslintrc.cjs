module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['airbnb', 'prettier'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: true,
        tabWidth: 2,
        trailingComma: 'none'
      }
    ],
    'consistent-return': 'off',
    'object-curly-newline': 'off',
    'import/extensions': 'off'
  }
};
