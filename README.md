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
10. styles: 存放全局样式
10. views: 存放页面组件

## 安装Antd
1. 下载依赖
```bash
$ npm install antd
```
2. 定制主题`ConfigProvider`
3. 获取主题变量

## vite项目安装Tailwind CSS 
1. 下载依赖
```bash
$ npm install tailwindcss @tailwindcss/vite
```
2. 配置 Vite 插件
```bash
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```
3. 在src目录下创建`styles/index.css`文件，并写入以下内容
```css
@import "tailwindcss";
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
3. 在`src/styles/index.scss`中写入全局样式
```scss
// 浏览器填充文本框背景色修改
.ant-input:-webkit-autofill,
.ant-input:-webkit-autofill:hover,
.ant-input:-webkit-autofill:focus,
.ant-input:-webkit-autofill:active {
	transition-delay: 999999999s;
	transition: color  999999999s ease-out, background-color  999999999s ease-out;
	-webkit-transition-delay:  999999999s;
	-webkit-transition: color  999999999s ease-out, background-color  999999999s ease-out;
	-webkit-text-fill-color: #fff;
}
.ant-input:-webkit-autofill {
  box-shadow: 0 0 0px 1000px #ffffff inset !important;   //改成你想要的背景色
  -webkit-text-fill-color:#000000 !important;
}
```
4. css module 引入scss文件
```js
// 创建'./index.module.scss'
// 修改第三方组件样式:global
:global(.globalStyle) {
    color: blue;
}
```

## 项目样式初始化`Normalize.css`
 1. 安装依赖
```bash
$ npm install normalize.css
```
2. 在`src/styles/index.css`中引入样式文件
```js
import 'normalize.css'
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
```ts
import axios from 'axios'
import {getItem,clearCache} from '@/utils/storage'
import { showLoading, hideLoading } from '@/utils/loading/index'
import { AxiosRequestConfig } from 'axios'// 扩展 AxiosRequestConfig 类型定义
declare module 'axios' {
  interface AxiosRequestConfig {
    hideLoading?: boolean | undefined
  }
}
// 创建axios实例
const VITE_BASE_API = import.meta.env.VITE_BASE_API || '/'
// 1.定义pendingRequests作为Map，存储请求的key和对应的cancel函数。
const pendingRequests = new Map()
// 2.生成唯一的key，用于取消重复请求。
const generateRequestKey = (config:AxiosRequestConfig) => {
	const { method, url, params, data } = config
	return [method, url, JSON.stringify(params), JSON.stringify(data)].join('&')
}
// 3. 添加请求到pendingRequests的函数。
const addPendingRequest = (config:AxiosRequestConfig) => {
	const requestKey = generateRequestKey(config)
	config.cancelToken = config.cancelToken || new axios.CancelToken(cancel => {
		if (!pendingRequests.has(requestKey)) {
			pendingRequests.set(requestKey, cancel)
		}
	})
}
// 4. 移除等待中的请求
const removePendingRequest = (config:AxiosRequestConfig) => {
	const requestKey = generateRequestKey(config)
	if (pendingRequests.has(requestKey)) {
		const cancelRequest = pendingRequests.get(requestKey)
		cancelRequest && cancelRequest(requestKey)
		pendingRequests.delete(requestKey)
	}
}
// 5.创建axios实例，配置baseURL、超时等。
const service = axios.create({
	baseURL: VITE_BASE_API,
	headers: {
		'Content-Type': 'application/json;charset=UTF-8'
	},
	timeout: 50000
})
// 6. request拦截器
service.interceptors.request.use(
	config => {
		// 7.请求开始时开启全局loading
		!config.hideLoading && showLoading()
		// 8.处理重复请求（取消之前的）
		removePendingRequest(config)
		addPendingRequest(config)
		// 9.添加认证头(Token)等信息。
		const token = getItem('token') || ''
		if (token) {
			config.headers.Authorization = 'Bearer ' + token
		}
		return config 
	},
	// 10.请求失败处理逻辑
	error => {
		return Promise.reject(error)
	}
)
// 11. respone拦截器
service.interceptors.response.use(
	// 12. 响应成功处理逻辑
	response => {
		// 13. 请求成功时关闭全局loading
		hideLoading()
		// 14. 移除等待中的请求
		removePendingRequest(response.config)
		// 15. 如果是blob类型，直接返回response对象
		if (response.config.responseType === 'blob') {
			return response.data
		}  else {
			const res = response.data
			if (res.code === 0) {
				return res
			} else if (res.code === -1) {
				window.$message.error(res.msg || 'Error')
				return res
			} else if (res.code === -2) {
				window.$message.error('登录超时，请重新登录', 3,() => { clearCache() })
				return res
			} else {
				window.$message.error(res.msg || 'Error')
				return Promise.reject()
			}
		}
	},
	// 16. 响应失败处理逻辑
	error => {
		// 17. 请求失败时关闭全局loading
		hideLoading()
		// 18. 移除等待中的请求
		error.config && removePendingRequest(error.config)
		// 19. 处理取消请求的错误
		if (axios.isCancel(error)) {
			return Promise.reject({ message: '请求被取消' })
		} else {
			const { status } = error.response
			if (status) {
				switch (status) {
					case 401:
						window.$message.error('登录超时，请重新登录', 3,() => { clearCache() })
						break
					case 404:
						window.$message.error('路径未找到',3)
						break
					case 403:
						window.$message.error('权限不足',3)
						break
					case 400:
						window.$message.error('错误的请求',3)
						break
					case 500:
						window.$message.error('服务器异常',3)
						break
					default:
						window.$message.error('请求错误，请稍后再试……',3)
						break
				}
			} else {
				window.$message.error('网络错误，请稍后再试……',3)
			}
		}
		return Promise.reject(error)
	}
)

export default service
```

### 4. 使用`request`请求数据
```ts
import request from '@/utils/request.ts'
export function userLogin() {
	return request({
		url: '/user/test',
		method: 'get'
	})
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

## 全局`message`定义
1. 在`utils/global/index.tsx`中定义全局message、modal、notification
```tsx
import { App } from 'antd'
import type { MessageInstance } from 'antd/es/message/interface'
import type { ModalStaticFunctions } from 'antd/es/modal/confirm'
import type { NotificationInstance } from 'antd/es/notification/interface'
let newMessage: MessageInstance
let notification: NotificationInstance
let modal: Omit<ModalStaticFunctions, 'warn'>
const msgKey = ['info', 'success', 'error', 'warning','loading']
const message : { [key: string]: any } = {}
declare global {
	interface Window {
		$message: typeof message;
		$modal: typeof modal;
		$notification: typeof notification;
	}
}
export default function AdtdGlobal(){
	const staticFunction = App.useApp()
	newMessage = staticFunction.message
	modal = staticFunction.modal
	notification = staticFunction.notification
	msgKey.forEach(key => {
		message[key] = (content:any,duration?:number,onClose?:()=>void)=>{
			newMessage.destroy()
			newMessage[key as keyof typeof newMessage](content as any,duration,onClose)
		}
	})
	window.$message = message
	window.$modal = modal
	window.$notification = notification
	return null
}
```

2. 在`App.tsx`中引入
```tsx
import { BrowserRouter } from 'react-router-dom'
import { App as AntdApp, ConfigProvider,theme } from 'antd'
import Router from './router'
import AdtdGlobal from '@/utils/global'
// API+组件化创建的路由
function App() {
	return (
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: "#ed7c0b",
					borderRadius: 4,
				},
				algorithm: theme.defaultAlgorithm,
			}}
		>
			<AntdApp>
				<AdtdGlobal />
				<BrowserRouter>
					<Router />
				</BrowserRouter>
			</AntdApp>
		</ConfigProvider>
		
	)
}
export default App
```

3. 使用全局message
```js
window.$message.success('登录成功')
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
## Redux配置
1. 安装依赖
```bash
	$ npm install react-redux @reduxjs/toolkit
	$ npm install @types/redux --save-dev
```
2. 创建store文件夹，在store文件夹中创建modules文件
3. 在modules文件中创建模块，比如`user.ts`
4. 在store文件夹中创建index.ts文件，引入所有模块
5. 在项目main.tsx中引入store，并使用Provider包裹App组件
6. 使用useSelector和useDispatch钩子函数获取状态值和分发action对象

## 登录鉴权+路由守卫
1. AuthRoute组件封装路由守卫逻辑
```tsx
import {Navigate,useLocation} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import { ReactNode, useEffect } from 'react'
import {RootState} from '@/store'
import {UserState} from '@/store/modules/user'
import {SetLasterRoute} from '@/store/modules/route'
function AuthRoute ({children}:{children:ReactNode}){
	const location = useLocation()
	const dispatch = useDispatch()
	// 记录最后一次访问的路由信息
	useEffect(()=>{
		dispatch(SetLasterRoute(location))
	},[location])
	// 获取用户登录状态信息
	const user = useSelector<RootState,UserState>(state => state.user)
	const {token} = user
	if(token){
		return <>{children}</>
	}else{
		return <Navigate to="/login" replace/>
	}
}

export default AuthRoute
```

2. 在App.tsx中使用AuthRoute组件包裹需要鉴权的路由
```js
{
	path: '/',
	element: <AuthRoute><Layout /></AuthRoute>,
	children: [
		{ element: <Home />, index: true },
		{ path: 'test', element: <Test /> },
		{ path: 'about', element: <div>关于我们</div> }
	]
}
```
3. 封装login页面守卫逻辑
```tsx
// LoginGuard.tsx
import { ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { UserState } from '@/store/modules/user'
import {RouteState} from '@/store/modules/route'
import { RootState } from '@/store'
const LoginGuard = ({ children }:{children:ReactNode}) => {
	const navigate = useNavigate()
	const { token } = useSelector<RootState,UserState>(state => state.user)
	const {lasterRouter} = useSelector<RootState,RouteState>(state => state.route)
	// 登录成功后跳转至最后一次访问的路由信息
	useEffect(() => {
		if (token) {
			navigate(lasterRouter?.pathname || '/', { replace: true })
		}
	}, [token, navigate])
	// 如果没有登录，则渲染login页面组件，否则不渲染
	return !token ? children : null
}

export default LoginGuard
```
## Layout布局