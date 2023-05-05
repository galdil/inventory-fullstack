module.exports = {
  extends: 'airbnb-typescript/base',
  plugins: ['import'],
  env: {
    es6: true,
    node: true,
    commonjs: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  rules: {
    'max-len': ['warn', 120],
    'no-underscore-dangle': ['off'],
    'implicit-arrow-linebreak': 'off'
  }
};

