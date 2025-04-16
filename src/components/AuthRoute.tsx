import {Navigate,useLocation} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import { ReactNode, useEffect } from 'react'
import {RootState} from '@/store'
import {UserState} from '@/store/modules/user'
import {SetLasterRoute} from '@/store/modules/route'
function AuthRoute ({children}:{children:ReactNode}){
	const location = useLocation()
	const dispatch = useDispatch()
	useEffect(()=>{
		dispatch(SetLasterRoute(location))
	},[location])
	const user = useSelector<RootState,UserState>(state => state.user)
	const {token} = user
	if(token){
		return <>{children}</>
	}else{
		return <Navigate to="/login" replace/>
	}
}

export default AuthRoute