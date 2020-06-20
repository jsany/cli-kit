module.exports = {
  extends: ['eslint:recommended', 'plugin:node/recommended'],
  parserOptions: {
    // Only ESLint 6.2.0 and later support ES2020.
    ecmaVersion: 2020,
  },
  rules: {
    'node/no-extraneous-require': 1,
    'no-unused-vars': 1
  },
};
