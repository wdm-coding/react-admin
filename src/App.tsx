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
					colorPrimary: '#13C2C2',
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
