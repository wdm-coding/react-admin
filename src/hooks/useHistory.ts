import { useEffect,useState } from 'react'
import { useLocation } from 'react-router-dom'

const useRouteHistory = () => {
	const location = useLocation()
	const [history, setHistory] = useState([location.pathname])
	useEffect(() => {
		setHistory(prev => [...prev, location.pathname])
	}, [location])

	// 获取上一个路由路径
	const getPreviousPath = () => {
		return history.length > 1 ? history[history.length - 2] : '/'
	}

	return { history, getPreviousPath }
}

export default useRouteHistory
