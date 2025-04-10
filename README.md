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
3. tsconfig.json 配置别名映射
```json
"baseUrl": "src",
"paths": {
  "@/*": ["*"]
}
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

## 安装Antd
1. 下载依赖
```bash
$ npm install antd
```

## 路由配置

### API路由 + 组件化路由配置
1. 安装React-Router
```bash
$ npm install react-router-dom
```
2. 项目根目录下创建`src/router/index.tsx`文件
```ts
import { useRoutes, RouteObject, Navigate } from 'react-router-dom'
import Login from '@/views/Login.tsx'
import NotFound from '@/views/NotFound.tsx'
import Home from '@/views/Home/index.tsx'
import Layout from '@/layout/index.tsx'
// 定义路由配置数组
const router: RouteObject[] = [
	{
		path: '/',
		element: <Layout />,
		children: [
			{ path: 'home', element: <Home /> },
			{ path: 'about', element: <div>about</div> }
		]
	},
	{ path: '/login', element: <Login /> },
	{ path: '/404', element: <NotFound /> },
	{ path: '*', element: <Navigate to="/404" /> }
]
// 创建路由组件
function Router() {
	return useRoutes(router)
}
export default Router
// 在App.tsx中使用
import { BrowserRouter } from 'react-router-dom'
import Router from './router'
// API+组件化创建的路由
function App() {
	return (
		<BrowserRouter>
			<Router />
		</BrowserRouter>
	)
}
export default App
```
## Axios封装

### 1. 安装依赖
```bash
$ npm install axios
```
### 2. 项目根目录下创建`src/utils/request.ts`文件
### 3. 封装axios请求方法
```js
import axios from 'axios'
// 创建axios实例
const request = axios.create({
  baseURL: '/api', // API的base_url
  timeout: 5000, // 请求超时时间
})
// 请求拦截器
request.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)
// 响应拦截器
request.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return response.data
    } else {
      console.log('error')
    }
  },
  (error) => {
    return Promise.reject(error)
  }
)
export default request
```
### 4. 使用`request`请求数据
```js
import request from '@/utils/request'
export function getUserInfo() {
  return request.get('/user')
}
```
### 5. 配置开发环境代理
在`vite.config.ts`中配置代理
```js
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // 目标服务器地址
        changeOrigin: true, // 是否改变源
        rewrite: (path) => path.replace(/^\/api/, ''), // 重写路径
        logLevel: 'debug', // 日志级别
      },
    },
  },
})
```
## 项目配置scss
1. 安装依赖
```bash
$ npm install sass -D
```
2. 在`vite.config.ts`中配置scss
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/index.scss";`, // 全局引入样式文件
      },
    },
  },
})
```
## 项目样式初始化`Normalize.css`
 1. 安装依赖
```bash
$ npm install normalize.css
```
2. 在`src/styles/index.scss`中引入样式文件
```js
import 'normalize.css'
```

## 全局loading组件封装
1. 在`utils`目录下创建`loading/index.js`

2. 封装loading组件的展示和隐藏
```tsx
import ReactDOM from 'react-dom/client'
import Loading from './loading'
let count = 0
export const showLoading = () => {
	if (count === 0) {
		const spinWrapDiv = document.createElement('div')
		spinWrapDiv.setAttribute('id', 'root-loading')
		document.body.appendChild(spinWrapDiv)
		ReactDOM.createRoot(spinWrapDiv).render(<Loading />)
	}
	count++
}
export const hideLoading = () => {
	if (count < 0) return
	count--
	if (count === 0) {
		const spinWrapDiv = document.getElementById('root-loading') as HTMLDivElement
		document.body.removeChild(spinWrapDiv)
	}
}
```

3. 在`loading/loading.tsx`中创建组件
```tsx
import { Spin } from 'antd'
import './loading.scss'
function Loading({ tip = 'loading' }: { tip?: string }) {
	return <Spin size="large" tip={tip} wrapperClassName="requiest-loading" fullscreen={true} />
}

export default Loading
```

4. 在`loading/loading.scss`中创建样式
```scss
#root-loading{
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

## 本地存储封装
1. 在`utils`目录下创建`storage/index.ts`
2. 将本项目所有的存储放在统一的key下

```ts
const BASE_KEY = 'REACT_ADMIN_CACHE'
// 1.sessionStorage存储
export function setItem(key: string, data: any) {
	// 1. 读取已有数据
	const oldData = JSON.parse(sessionStorage.getItem(BASE_KEY) as string)
	// 2. 合并新旧数据
	if (oldData) {
		const newData = { ...oldData, [key]: data }
		return sessionStorage.setItem(BASE_KEY, JSON.stringify(newData))
	} else {
		sessionStorage.setItem(BASE_KEY, JSON.stringify({ [key]: data }))
	}
}
// 2.sessionStorage获取
export function getItem(key: string) {
	const oldData = JSON.parse(sessionStorage.getItem(BASE_KEY) as string)
	if (oldData) {
		const result = oldData[key]
		try {
			return JSON.parse(result as string)
		} catch (error) {
			return result as string
		}
	} else {
		return null
	}
}
// 3.sessionStorage移除
export function removeItem(key: string) {
	const oldData = JSON.parse(sessionStorage.getItem(BASE_KEY) as string)
	if (oldData && oldData[key]) {
		delete oldData[key]
		return sessionStorage.setItem(BASE_KEY, JSON.stringify(oldData))
	} else {
		return null
	}
}
// 清楚缓存
export function clearCache() {
	sessionStorage.removeItem(BASE_KEY)
}
```
## 编译时环境配置
1. vite 将环境变量暴漏在`import.meta.env`上
2. 在`.env`文件中配置开发环境变量
```yaml
# 设置NODE_NEV环境模式
VITE_NODE_NEV = dev
# 前端端口
VITE_PORT = 9001
# 反向代理地址
VITE_PROXY_URL = http://localhost:3000/api
# 设置接口的api地址
VITE_BASE_API = '/api'
```
3. 在`.env.stag`文件中配置测试环境变量
4. 在`.env.production`文件中配置生产环境变量
5. 在`package.json`中配置环境变量
```json
"scripts": {
  "dev": "vite",
  "build:stag": "vite build --mode stag",
  "build:prod": "vite build --mode prod",
}
```

## 运行时环境配置
1. 在`src/config/index.ts`中配置
2. 封装运行时环境配置
```ts
type ENV = 'dev' | 'stag' | 'prod'
const env = import.meta.env.VITE_NODE_NEV as ENV
const config = {
	dev: {
		name: '开发环境'
	},
	stag: {
		name: '测试环境'
	},
	prod: {
		name: '生产环境'
	}
}
export default config[env]
```

::: tip 编译时环境配置和运行时环境配置的区别
1. 编译时环境配置：在项目构建阶段就已经确定了，比如`VITE_PORT`, `VITE_PROXY_URL`等
2. 运行时环境配置：在项目运行阶段才能确定，比如`VITE_NODE_NEV`, `VITE_BASE_API`等
3. 运行时环境配置更容易做动态切换，比如在开发阶段和测试阶段的接口地址不一样。
:::

## 金额格式化

::: tip toLocaleString() 方法参数
1. locales：语言环境，比如`ar-EG`, `zh-CN`等
2. options：配置项，比如`style: 'percent'`表示百分比格式化
3. style：格式化样式，比如`percent`, `currency`, `decimal`等
:::
1. 千分位格式化
```ts
export function formatMoney(value: number | string) {
  return Number(value).toLocaleString('ar-EG')
}
```
2. 百分比格式化
```ts
export function formatPercent(value: number | string) {
  return Number(value).toLocaleString('ar-EG', { style: 'percent' })
}
```
3. 货币格式化
```ts
export function formatCurrency(value: number | string) {
  return Number(value).toLocaleString('ar-EG', { style: 'currency', currency: 'CNY' })
}
```
4. 数字格式化
```ts
export function formatNumber(value: number | string) {
  return Number(value).toLocaleString('ar-EG', { style: 'decimal' })
}
```
5. 中文数字格式化
```ts
export function formatChineseNumber(value: number | string) {
  return Number(value).toLocaleString('zh-CN', { style: 'decimal' })
}
```