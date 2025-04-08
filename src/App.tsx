import { RouterProvider, BrowserRouter, Routes, Route } from 'react-router-dom'
import router from './router'
// API创建的路由
// function App() {
// 	return <RouterProvider router={router} />
// }
// 组件化创建的路由
import Login from '@/views/Login.tsx'
import NotFound from '@/views/NotFound.tsx'
import Home from '@/views/Home/index.tsx'
function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	)
}
export default App
