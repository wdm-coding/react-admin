# React18 + ReactRouter7 + Vite + TyepScript + Antd搭建后台管理系统

## 创建项目
```bash
$ npm create vite@latest react-admin -- --template react-ts
```

## 安装依赖
```bash
$ npm install
```

## EditorConfig配置
1. 项目根目录下创建`.editorconfig`文件
2. 配置文件内容
```js
root = true // 顶层配置
[*] // 所有文件
charset = utf-8 // 编码格式
indent_style = space // 缩进风格
indent_size = 2 // 缩进大小
end_of_line = lf // 换行符 
insert_final_newline = true // 文件末尾插入新行
trim_trailing_whitespace = true // 删除行尾空格

[*.md] // 所有md文件
trim_final_newline = false // 不删除行尾空格
trim_trailing_whitespace = false // 不删除行尾空格
```
3. 安装插件
- VS Code: EditorConfig for VS Code

## Prettier配置
1. 安装依赖
```bash
$ npm install --save-dev prettier
```
2. 项目根目录下创建`.prettierrc.cjs`文件
3. 配置文件内容
```js
module.exports = {
  printWidth: 120, // 每行代码长度（默认80）
  tabWidth: 2, // 每个缩进级别的空格数（默认2）
  semi: true, // 语句末尾是否加分号（默认true）
  singleQuote: true,
  useTabs: false,
  trailingComma: 'none',
  bracketSpacing: true,
  jsxBracketSameLine: false,
  arrowParens: 'avoid',
}
```
4. 安装插件
- VS Code: Prettier - Code formatter
5. 局部保存格式化：项目根目录下创建`.vscode`文件
```json
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave":{
    "source.fixAll":true
  }
```
