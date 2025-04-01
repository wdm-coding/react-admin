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
  "printWidth": 120, // 每行代码长度（默认80）
  "singleQuote": true, // 使用单引号（默认false）
  "trailingComma": "none", // 末尾逗号（默认none）
  "endOfLine": "auto", // 结尾是 \n \r \n\r auto
  "semi": false, // 句尾添加分号（默认true）
  "tabWidth": 2, // tab缩进大小(默认是2)
  "useTabs": true, // 使用tab缩进（默认false）
  "bracketSpacing": true, // 对象字面量的大括号间增加空格（默认true）
  "jsxBracketSameLine": true, // jsx标签的反尖括号是否单独一行（默认false）
  "arrowParens": "avoid", // 箭头函数参数为单个时是否省略括号（默认avoid）
}
```
4. 安装插件
- VS Code: Prettier - Code formatter
5. 局部保存格式化：项目根目录下创建`.vscode`文件
```json
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
```

## eslint配合prettier 解决格式化冲突
1. 安装依赖eslint，prettier
```bash
$ npm install -D eslint prettier eslint-plugin-react @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier
```
2. 项目根目录下创建`.eslintrc.cjs`文件
3. 配置文件内容
```js
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',// 推荐规则集
    'plugin:@typescript-eslint/recommended', // 官方推荐的规则集
    'plugin:react/recommended', // 官方推荐的react规则集
    'plugin:react-hooks/recommended',// 官方推荐的react-hooks规则集
    'plugin:prettier/recommended' // prettier推荐的规则集
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh','react','@typescript-eslint','prettier'],
  rules: {
    "react/react-in-jsx-scope": "off",
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
```

## react + vite 配置别名
1. 项目根目录下创建`vite.config.ts`文件
2. 安装依赖
```bash
$ npm install path
```
2. 配置文件内容
```js
import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src')
		}
	}
})
```
::: tip 针对 ES Modules 引入__dirname 的解决方案
  如果使用 "type": "module"，改用以下方式：
  ```js
    import { fileURLToPath } from 'url';
    import { dirname } from 'path';
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
  ```
:::
## 目录结构定义
1. api: 存放接口请求
2. components: 存放公用组件
3. config: 存放配置文件
4. layout: 存放布局组件
5. router: 存放路由配置
6. store: 存放状态管理
7. utils: 存放工具函数
8. types: 存放类型定义
9. hooks: 存放自定义hooks
10. views: 存放页面组件
## 路由配置

### API 路由配置
1. 安装React-Router
```bash
$ npm install react-router-dom
```
2. 项目根目录下创建`src/router/index.tsx`文件
3. 配置文件内容
```js
import { createHashRouter, RouteObject } from 'react-router-dom'
const router: RouteObject[] = [
	{ path: '/', element: <div>首页</div> },
	{ path: '/about', element: <div>关于</div> },
	{ path: '/user', element: <div>用户</div> }
]
export default createHashRouter(router)
```
4. 通过RouterProvider组件包裹App
```js
import { RouterProvider } from 'react-router-dom'
import router from './router'
function App() {
	return <RouterProvider router={router} />
}
export default App
```

### 组件化路由配置
  