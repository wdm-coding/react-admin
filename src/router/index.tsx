import { lazy } from 'react'
import { useRoutes, RouteObject, Navigate } from 'react-router-dom'
import Login from '@/views/Login/index.tsx'
import NotFound from '@/views/NotFound.tsx'
import Home from '@/views/Home/index.tsx'
import Layout from '@/layout/index.tsx'
const Test = lazy(() => import('@/views/Test'))
const router: RouteObject[] = [
	{
		path: '/',
		element: <Layout />,
		children: [
			{ element: <Home />, index: true },
			{ path: 'test', element: <Test /> }
		]
	},
	{ path: '/login', element: <Login /> },
	{ path: '/404', element: <NotFound /> },
	{ path: '*', element: <Navigate to="/404" /> }
]
function Router() {
	return useRoutes(router)
}
export default Router
