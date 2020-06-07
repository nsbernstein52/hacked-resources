module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
    'plugin:mocha/recommended',
    'plugin:react/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    'chai-friendly',
    'mocha',
    'react',
  ],
  rules: {
    'arrow-body-style': 0,
    'chai-friendly/no-unused-expressions': 2,
    'max-len': 1,
    'mocha/no-mocha-arrows': 0,
    'no-console': 0,
    'no-unused-expressions': 0,
    'no-unused-vars': 0,
  }
};
