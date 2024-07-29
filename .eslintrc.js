module.exports = {
  root: true,
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  extends: ['@frknnice/eslint-config'],
  // currently we are using vite instead webpack
  rules: {
    'import/dynamic-import-chunkname': 'off',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-bitwise': 'off',
        'no-underscore-dangle': 'off',
        'no-restricted-exports': 'off',
        'import/no-duplicates': 'off',
        'class-methods-use-this': 'off',
      },
    },
  ],
}
