module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    // 'plugin:prettier/recommended',
    // "prettier"
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh','react', '@typescript-eslint',],//'prettier'
  rules: {
    "indent": [2, 'tab', { SwitchCase: 1 }], // tab缩进
    'no-tabs': 'off', // 关闭其他缩进
    "quotes": [ // 使用单引号
      2,
      "single",
      {"avoidEscape": true,"allowTemplateLiterals": true}
    ],
    "semi": [2, "never"], // 不使用分号结尾
    "arrow-parens": ['error', 'as-needed'], // 如果只有一个参数不需要括号
    'max-len': [ // 一行最大长度为20
      'error',
      {code: 120,tabWidth: 2}
    ], 
    "jsx-quotes":[2,"prefer-double"], // 强制在JSX属性中一致使用双引号
    "react/react-in-jsx-scope": 0,// 解决react/react-in-jsx-scope报错
    'react-refresh/only-export-components': 0,// 解决react-refresh/only-export-components报错
    "@typescript-eslint/no-explicit-any": 0, // 解决@typescript-eslint/no-explicit-any报错
    "react/self-closing-comp":2, // 当标签没有子元素的时候，始终使用自闭合的标签
    "react/jsx-boolean-value":[2,"never"], // 在JSX中不允许使用布尔属性，例如<Foo disabled/> 应该写成 <Foo disabled={true} />
    "react-hooks/exhaustive-deps": 0, // 解决react-hooks/exhaustive-deps报错
    "react/display-name": 0, // 解决react/display-name报错
    'react/jsx-closing-bracket-location': [ // 自闭合标签的结束括号位置，对齐开始标签的位置
      2, 
      {selfClosing: 'tag-aligned', nonEmpty: 'tag-aligned'}
    ],
    'react/jsx-first-prop-new-line': [2, 'multiline'], //如果 JSX 标签跨多行，则第一个属性换行‌（单行不换行）
    'react/jsx-max-props-per-line': [ // 单行最多一个属性
      2,
      { maximum: 1, when: 'multiline' },
    ]
  },
}
