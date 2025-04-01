import { createHashRouter, RouteObject, Navigate } from 'react-router-dom'
import Login from '@/views/Login.tsx'
import NotFound from '@/views/NotFound.tsx'
import Home from '@/views/Home/index.tsx'
const router: RouteObject[] = [
	{ path: '/', element: <Home /> },
	{ path: '/login', element: <Login /> },
	{ path: '/about', element: <div>关于</div> },
	{ path: '/user', element: <div>用户</div> },
	{ path: '/404', element: <NotFound /> },
	{ path: '*', element: <Navigate to="/404" /> }
]
export default createHashRouter(router)
