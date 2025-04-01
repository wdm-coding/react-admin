module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended' 
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh','react', '@typescript-eslint','prettier'],
  rules: {
    "react/react-in-jsx-scope": "off",
    'react-refresh/only-export-components': [
      'off',
      { allowConstantExport: true },
    ],
    "@typescript-eslint/no-explicit-any": "off",
    // 没有使用时报错
    'no-unused-vars': 'warn'
  },
}
