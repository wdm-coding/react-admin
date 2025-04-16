import {createSlice} from '@reduxjs/toolkit'
interface RouteState{
	lasterRouter:object | null
}
const routeStore = createSlice({
	name: 'route',
	initialState: {
		lasterRouter:null
	},
	reducers: {
		SetLasterRoute(state, action) {
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