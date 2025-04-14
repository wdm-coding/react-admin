module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    "prettier"
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh','react', '@typescript-eslint','prettier'],
  rules: {
    "react/react-in-jsx-scope": "off",// 解决react/react-in-jsx-scope报错
    'react-refresh/only-export-components': 'off',// 解决react-refresh/only-export-components报错
    "@typescript-eslint/no-explicit-any": "off", // 解决@typescript-eslint/no-explicit-any报错
    'no-unused-vars': 'warn',// 没有使用时报错
    "react/jsx-closing-bracket-location": [
      "error",
      { "selfClosing": "tag-aligned", "nonEmpty": "tag-aligned" }
    ],// 将>多行jsx元素单独放在下一行
    "react/jsx-max-props-per-line": [
      "error",
      {
        "maximum": 2,          // 每行最多 2 个属性（强制换行）
        "when": "always"       // 始终生效
      }
    ],// 标签属性超过2个时，强制换行
    "no-mixed-spaces-and-tabs": "error",// 禁止混用tab和空格
    // "linebreak-style": ["error", "unix"]  // 强制使用 LF（Unix 风格）
  },
}
