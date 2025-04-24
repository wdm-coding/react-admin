import { lazy } from 'react'
import { useRoutes, RouteObject, Navigate } from 'react-router-dom'
import Login from '@/views/Login'
import NotFound from '@/views/NotFound.tsx'
import Home from '@/views/Home'
import Layout from '@/layout'
import AuthRoute from '@/components/AuthRoute'
import LoginGuard from '@/components/LoginGuard'
const Test = lazy(() => import('@/views/Test'))
const Users = lazy(() => import('@/views/Users'))
const Roles = lazy(() => import('@/views/Roles'))
const Loggers = lazy(() => import('@/views/Loggers'))
const router: RouteObject[] = [
	{
		path: '/',
		element: <AuthRoute><Layout /></AuthRoute>,
		children: [
			{ element: <Home />, index: true },
			{ path: 'users', element: <Users /> },
			{ path: 'roles', element: <Roles /> },
			{ path: 'logs', element: <Loggers /> },
			{ path: 'test', element: <Test /> },
			{ path: 'about', element: <div>关于我们</div> }
		]
	},
	{ path: '/login', element: <LoginGuard><Login /></LoginGuard> },
	{ path: '/404', element: <NotFound /> },
	{ path: '*', element: <Navigate to="/404" /> }
]
function Router() {
	return useRoutes(router)
}
export default Router
