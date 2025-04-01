import { createHashRouter, RouteObject } from 'react-router-dom'
const router: RouteObject[] = [
	{ path: '/', element: <div>首页</div> },
	{ path: '/about', element: <div>关于</div> },
	{ path: '/user', element: <div>用户</div> },
  { path: '*', element: <div>404</div> },  
]
export default createHashRouter(router)
