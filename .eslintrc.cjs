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
    "react/react-in-jsx-scope": "off",// 解决react/react-in-jsx-scope报错
    'react-refresh/only-export-components': 'off',// 解决react-refresh/only-export-components报错
    "@typescript-eslint/no-explicit-any": "off", // 解决@typescript-eslint/no-explicit-any报错
    'no-unused-vars': 'warn'// 没有使用时报错
  },
}
