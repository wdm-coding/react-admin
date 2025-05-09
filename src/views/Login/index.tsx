import styles from './index.module.scss'
import type { FormProps } from 'antd'
import { Button, Form, Input } from 'antd'
import { useState } from 'react'
import {useDispatch} from 'react-redux'
import {userLogin} from '@/store/modules/user'
import { AppDispatch } from '@/store'
import {userSignup} from '@/api/user'
type FieldType = {
  account?: string
  password?: string
};
function Login() {
	const [isLogin, setIsLogin] = useState<boolean>(true)

	const dispatch:AppDispatch = useDispatch<AppDispatch>()
	const [loading, setLoading] = useState<boolean>(false)
	const onFinish: FormProps<FieldType>['onFinish'] = values => {
		setLoading(true)
		if(isLogin){
			dispatch(userLogin(values)).then(()=>{
				setLoading(false)
			}).catch(()=>{
				setLoading(false)
			})
		}else{
			userRegister(values)
		}
	}
	const userRegister = async (value: FieldType)=>{
		if(!value.account || !value.password) return 
		const {code} = await userSignup({username:value.account,password:value.password})
		setLoading(false)
		if(code === 0){
			window.$message.success('注册成功，请登录',2,()=>{
				setIsLogin(true)
			})
		}
	}
	const triggerHandler = () => {
		setIsLogin(!isLogin)
	}
	return (
		<div className={`${styles.login_wrap} w-screen h-screen text-white flex items-center justify-center`}>
			<div className="w-[400px] h-[300px] bg-white pt-[10px] pl-[10px] pr-[10px] rounded-lg relative">
				<div className="absolute right-[10px] top-[10px]">
					<Button color="cyan" variant="outlined" onClick={triggerHandler}>
						{isLogin?'注册':'登录'}
					</Button>
				</div>
				<h1 className="text-black text-center pb-[10px] font-semibold">
					{isLogin?'欢迎登录':'用户注册'}
				</h1>
				<Form
					name="basic"
					onFinish={onFinish}
					size="middle"
				>
					<Form.Item<FieldType>
						label="账号"
						name="account"
						rules={[{ required: true, message: '请输入账号!' }]}
					>
						<Input autoComplete="off"/>
					</Form.Item>
					<Form.Item<FieldType>
						label="密码"
						name="password"
						rules={[{ required: true, message: '请输入密码!' }]}
					>
						<Input.Password autoComplete="new-password"/>
					</Form.Item>
					<Form.Item label={null}>
						<div className="pt-[10px] w-full flex items-center justify-center">
							<Button
								loading={loading}
								type="primary"
								htmlType="submit"
								className="w-[400px] h-[40px]"
								size="large"
							>
								{isLogin?'登录':'注册'}
							</Button>
						</div>
					</Form.Item>
				</Form>
			</div>
		</div>
	)
}
export default Login
