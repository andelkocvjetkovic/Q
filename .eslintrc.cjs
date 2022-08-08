let path = require('path');

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  parserOptions: { ecmaVersion: 2020 },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
    'import/resolver': {
      alias: {
        map: [['@app', path.resolve(__dirname, 'src')]],
        extensions: ['.js', '.jsx'],
      },
    },
  },
  rules: {
    'react/prop-types': ['error', { ignore: ['children'] }],
    'react/react-in-jsx-scope': 'off',
    /*'no-console': ['warn', { allow: ['error'] }],*/
  },
  env: {
    jest: true,
  },
  globals: {
    module: true,
    require: true,
    process: true,
    window: true,
    document: true,
    console: true,
    Promise: true,
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: true,
    AbortController: true,
    clearInterval: true,
    setInterval: true,
    setTimeout: true,
    navigator: true,
    __dirname: true,
    requestAnimationFrame: true,
    alert: true,
  },
};
