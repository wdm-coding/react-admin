import { Button, Drawer, Flex, Form, Input } from 'antd'
import { forwardRef, useImperativeHandle, useState } from 'react'
import type { FormProps } from 'antd'
type FieldType = {
	username: string,
	password: string,
}
export interface UserModalRef {
  add: () => void
	edit: (row:any) => void
	hide: () => void
}
const UpdateUser = forwardRef<UserModalRef>((_props,ref) => {
	const [formRef] = Form.useForm()
	const [open, setOpen] = useState(false)
	const [title, setTitle] = useState('新增')
	const add = () => {
		setTitle('新增')
		setOpen(true)
	}
	const edit = (row:any) =>{
		setTitle('编辑')
		formRef.setFieldsValue(row)
		setOpen(true)
	}
	const hide = () => {
		onReset()
		setOpen(false)
	}
	const onFinish: FormProps<FieldType>['onFinish'] = values => {
		console.log(values)
	}
	const onSubmit = () => {
		formRef.submit()
	}
	const onReset = () => {
		formRef.resetFields()
	}
	const Footer = () => {
		return <Flex vertical={false} justify="flex-end">
			<Button
				type="primary"
				size="large"
				style={{marginRight: 8}}
				onClick={onSubmit}
			>
			登录
			</Button>
			<Button
				type="default"
				htmlType="button"
				size="large"
				onClick={onReset}
			>
			重置
			</Button>
		</Flex>
	}
	useImperativeHandle(ref, () => ({ add, edit, hide }))
	return (
		<Drawer 
			title={title}
			onClose={hide}
			open={open}
			footer={Footer()}
		>
			<Form
				form={formRef}
				onFinish={onFinish}
				style={{ maxWidth: 600 }}
			>
				<Form.Item
					label="账号"
					name="username"
					rules={[{ required: true, message: '请输入账号!' }]}
				>
					<Input autoComplete="off"/>
				</Form.Item>
				<Form.Item
					label="密码"
					name="password"
					rules={[{ required: true, message: '请输入密码!' }]}
				>
					<Input.Password autoComplete="new-password"/>
				</Form.Item>
			</Form>
		</Drawer>
	)
})

export default UpdateUser