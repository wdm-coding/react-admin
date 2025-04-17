import { lazy } from 'react'
import { useRoutes, RouteObject, Navigate } from 'react-router-dom'
import Login from '@/views/Login/index.tsx'
import NotFound from '@/views/NotFound.tsx'
import Home from '@/views/Home/index.tsx'
import Layout from '@/layout/index.tsx'
import AuthRoute from '@/components/AuthRoute'
import LoginGuard from '@/components/LoginGuard'
const Test = lazy(() => import('@/views/Test'))
const router: RouteObject[] = [
	{
		path: '/',
		element: <AuthRoute><Layout /></AuthRoute>,
		children: [
			{ element: <Home />, index: true },
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
