import { Button, Drawer, Form, Input } from 'antd'
import { forwardRef, useImperativeHandle, useState } from 'react'
import type { FormProps } from 'antd'
type FieldType = {
	account: string,
	password: string,
}
interface UserModalRef {
  show: () => void;
	hide: () => void;
}
const UpdateUser = forwardRef<UserModalRef>((_props,ref) => {
	const [open, setOpen] = useState(false)
	const show = () => {
		setOpen(true)
	}
	const hide = () => {
		setOpen(false)
	}
	const onFinish: FormProps<FieldType>['onFinish'] = values => {
		console.log(values)
	}
	useImperativeHandle(ref, () => ({ show, hide }))
	return (
		<Drawer title="新增" onClose={hide} open={open}>
			<Form
				name="basic"
				onFinish={onFinish}
				size="large"
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
					<div className="pt-[3vh] w-full flex items-center justify-center">
						<Button
							type="primary"
							htmlType="submit"
							className="w-[20vw] h-[40px]"
							size="large"
						>
							登录
						</Button>
					</div>
				</Form.Item>
			</Form>
		</Drawer>
	)
})

export default UpdateUser