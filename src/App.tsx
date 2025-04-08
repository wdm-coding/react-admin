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
