module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    indent: 'off',
    'no-undef': 'off',
    'linebreak-style': 0,
    'no-param-reassign': 0,
    'no-restricted-syntax': 0,
    'max-len': 0,
    'no-unused-vars': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/jsx-no-bind': 0,
    'react/jsx-no-useless-fragment': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interaction': 0,
    'jsx-a11y/interactive-supports-focus': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'import/extensions': 0,
    'import/no-unresolved': 0,
  },
};
