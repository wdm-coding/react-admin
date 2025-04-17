// LoginGuard.tsx
import { ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { UserState } from '@/store/modules/user'
import {RouteState} from '@/store/modules/route'
import { RootState } from '@/store'
const LoginGuard = ({ children }:{children:ReactNode}) => {
	const navigate = useNavigate()
	const { token } = useSelector<RootState,UserState>(state => state.user)
	const {lasterRouter} = useSelector<RootState,RouteState>(state => state.route)
	useEffect(() => {
		if (token) {
			navigate(lasterRouter?.pathname || '/', { replace: true })
		}
	}, [token, navigate])
	return !token ? children : null
}

export default LoginGuard