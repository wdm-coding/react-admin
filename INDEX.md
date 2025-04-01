步骤1：创建Vite项目
bash
Copy Code
npm create vite@latest admin-system -- --template react-ts
cd admin-system
npm install
步骤2：安装依赖
bash
Copy Code
npm install react-router-dom@next antd @ant-design/icons
npm install less -D
步骤3：配置Ant Design主题
vite.config.ts:

typescript
Copy Code
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          '@primary-color': '#1890ff', // 主色
          '@border-radius-base': '4px' // 圆角
        }
      }
    }
  }
})
步骤4：配置React Router 7
src/router.tsx:

tsx
Copy Code
import { createBrowserRouter } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import Dashboard from './pages/Dashboard'
import UserManagement from './pages/UserManagement'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'users', element: <UserManagement /> },
      { path: 'settings', lazy: () => import('./pages/Settings') }
    ]
  },
  {
    path: '/login',
    lazy: () => import('./pages/Login')
  }
])
步骤5：创建路由守卫
src/components/AuthRoute.tsx:

tsx
Copy Code
import { Navigrate, useLocation } from 'react-router-dom'

export default function AuthRoute({ children }: { children: ReactNode }) {
  const [isLogin] = useState(false) // 替换为实际登录状态
  const location = useLocation()

  if (!isLogin) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}
步骤6：主布局组件
src/layouts/AppLayout.tsx:

tsx
Copy Code
import { Outlet, Link } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import type { MenuProps } from 'antd'

const { Header, Sider, Content } = Layout

const items: MenuProps['items'] = [
  { key: 'dashboard', label: <Link to="/">Dashboard</Link> },
  { key: 'users', label: <Link to="/users">用户管理</Link> },
  { key: 'settings', label: <Link to="/settings">系统设置</Link> }
]

export default function AppLayout() {
  return (
    <Layout className="h-screen">
      <Sider theme="light">
        <div className="h-8 bg-gray-100 m-4 rounded" />
        <Menu mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header className="bg-white shadow-sm">
          <div className="flex justify-end px-4">用户头像</div>
        </Header>
        <Content className="p-4 overflow-auto">
          <AuthRoute>
            <Outlet />
          </AuthRoute>
        </Content>
      </Layout>
    </Layout>
  )
}
步骤7：入口文件配置
src/main.tsx:

tsx
Copy Code
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import { router } from './router'
import 'antd/dist/reset.css'
import './index.less'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ConfigProvider theme={{ cssVar: true }}>
    <RouterProvider router={router} />
  </ConfigProvider>
)
关键优化配置
按需加载：
tsx
Copy Code
// 路由配置中使用lazy加载
{
  path: 'settings',
  lazy: () => import('./pages/Settings')
}
全局样式文件index.less:
less
Copy Code
#root {
  height: 100vh;
}

.ant-layout {
  background: #fff;
}
代理配置vite.config.ts:
typescript
Copy Code
server: {
  proxy: {
    '/api': {
      target: 'http://backend:3000',
      changeOrigin: true
    }
  }
}
注意事项
React 19需要确保TypeScript版本 >= 5.0
使用Antd 5.x版本时注意图标库独立安装
路由守卫逻辑需根据实际鉴权方案调整
开发环境需配置less支持
生产构建时使用：
bash
Copy Code
npm run build && npm run preview
这个配置实现了以下功能：

基于Ant Design的响应式布局
React Router 7的嵌套路由系统
路由级代码分割
基础权限控制
主题定制能力
开发环境代理配置
可以根据实际需求添加状态管理（推荐Jotai/Zustand）、接口请求封装（推荐axios）、权限系统扩展等功能模块。