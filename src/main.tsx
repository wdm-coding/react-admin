import ReactDOM from 'react-dom/client'
import './styles/index.css'
import App from './App.tsx'
import '@/config/index.ts'
import { Provider } from 'react-redux'
import store from './store'
ReactDOM.createRoot(document.getElementById('root')!).render(
	<Provider store={store} >
		<App />
	</Provider>
)
