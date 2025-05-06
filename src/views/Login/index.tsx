import styles from './index.module.scss'
import type { FormProps } from 'antd'
import { Button, Form, Input } from 'antd'
import { useState } from 'react'
import {useDispatch} from 'react-redux'
import {userLogin} from '@/store/modules/user'
import { AppDispatch } from '@/store'
type FieldType = {
  account?: string
  password?: string
};
function Login() {
	const dispatch:AppDispatch = useDispatch<AppDispatch>()
	const [loading, setLoading] = useState<boolean>(false)
	const onFinish: FormProps<FieldType>['onFinish'] = values => {
		setLoading(true)
		dispatch(userLogin(values)).then(()=>{
			setLoading(false)
		}).catch(()=>{
			setLoading(false)
		})
	}
	return (
		<div className={`${styles.login_wrap} w-screen h-screen text-white flex items-center justify-center`}>
			<div className="w-[400px] h-[300px] bg-white pt-[10px] pl-[10px] pr-[10px] rounded-lg">
				<h1 className="text-black text-center pb-[10px] font-semibold">欢迎登录</h1>
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
              登录
							</Button>
						</div>
					</Form.Item>
				</Form>
			</div>
		</div>
	)
}
export default Login
