import {createSlice} from '@reduxjs/toolkit'
import {setItem,getItem,clearCache} from '@/utils/storage'
import { Dispatch } from 'redux'
import {userSignin} from '@/api/user'
interface UserState{
	token:string | null,
	userInfo:{name:string,phone:number,avator:string} | null
}
// 1.创建slice对象
const userStore = createSlice({
	name: 'user', // 切片名称，唯一标识
	initialState: { // 初始状态
		token:getItem('token') || null,
		userInfo: getItem('userInfo') || null,
	},
	reducers:{ // 同步操作函数集合，每个方法对应一个action类型
		SetToken:(state,action)=>{
			setItem('token',action.payload)
			state.token = action.payload
		},
		SetUserInfo:(state,action)=>{
			setItem('userInfo',action.payload)
			state.userInfo = action.payload
		},
		Logout:state=>{
			clearCache()
			state.token = null
			state.userInfo = null
		}
	}
})

// 异步登录操作函数，获取token
const userLogin = (params:any)=>{
	return (dispatch:Dispatch)=>{
		return new Promise<void>((resolve,reject)=>{
			userSignin({username:params.account,password:params.password}).then(({code,data})=>{
				if(code === 0 && data){
					window.$message.success('登录成功',2,()=>{
						dispatch(SetToken(data))
						resolve()
					})
				}else{
					reject()
				}
			}).catch(()=>{
				reject()
			})
		})
	}
}
// 获取用户信息
const getUserInfo = (phone: any)=>{
	return (dispatch:Dispatch)=>{
		return new Promise<void>(resolve=>{
			setTimeout(()=>{
				dispatch(
					SetUserInfo({
						name:'张三',
						phone,
						avator:`https://img2.baidu.com/it/u=797128434,3616502808&fm=
						253&app=53&size=f60,60&n=0&g=0n&f=jpeg&fmt=auto?sec=1744446333
						&t=821fbae2142674b2acffe74c5cbe1f26`
					}))
				resolve()
			},1000)
		})
	}
}

// 2.从slice对象中导出action创建函数和reducer函数
const {SetUserInfo,SetToken,Logout} = userStore.actions
const userReducer = userStore.reducer
// 3.导出action创建函数和reducer函数
export { SetUserInfo, SetToken, userLogin, getUserInfo, Logout }
export type { UserState }
export default userReducer