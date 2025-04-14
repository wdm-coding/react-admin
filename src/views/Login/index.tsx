import './index.scss'
type FieldType = {
  username?: string
  password?: string
};
import { Button, Form, Input } from 'antd'
function Login() {
	const onFinish = () => (values: FieldType) => {
		console.log('Success:', values)
	}
	return (
		<div className="login_wrap w-screen h-screen text-white flex items-centejustify-center">
			<div className="w-[30vw] h-[42vh] bg-white">
				<h1 className="ss">sss</h1>
				<Form
					name="basic"
					initialValues={{ remember: true }}
					onFinish={onFinish}
					autoComplete="off"
				>
					<Form.Item<FieldType>
						label="Username"
						name="username"
						rules={[{ required: true, message: 'Please input your username!' }]}
					>
						<Input />
					</Form.Item>
					<Form.Item<FieldType>
						label="Password"
						name="password"
						rules={[{ required: true, message: 'Please input your password!' }]}
					>
						<Input.Password />
					</Form.Item>
					<Form.Item label={null}>
						<Button
							type="primary"
							htmlType="submit"
						>
              Submit
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	)
}
export default Login
