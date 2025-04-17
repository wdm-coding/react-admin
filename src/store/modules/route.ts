import { getItem, setItem } from '@/utils/storage'
import {createSlice} from '@reduxjs/toolkit'
interface RouteState{
	lasterRouter:{
		hash: string
		key: string
		pathname: string
		search: string
		state: any
	} | null
}
const routeStore = createSlice({
	name: 'route',
	initialState: {
		lasterRouter:getItem('lasterRouter') || null,
	},
	reducers: {
		SetLasterRoute(state, action) {
			setItem('lasterRouter', action.payload)
			state.lasterRouter = action.payload
		}
	}
})
// 2.从slice对象中导出action创建函数和reducer函数
const {SetLasterRoute} = routeStore.actions
const routeReducer = routeStore.reducer
// 3.导出action创建函数和reducer函数
export { SetLasterRoute }
export type { RouteState }
export default routeReducer