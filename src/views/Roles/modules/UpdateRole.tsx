import { Button, Drawer, Flex, Form, Input } from 'antd'
import { forwardRef, useImperativeHandle, useState } from 'react'
import type { FormProps } from 'antd'
type FieldType = {
	roleName: string,
	roleDesc: string,
}
export interface RoleModalRef {
  add: () => void
	edit: (row:any) => void
	hide: () => void
}
const UpdateUser = forwardRef<RoleModalRef>((_props,ref) => {
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
					label="角色名称"
					name="roleName"
					rules={[{ required: true, message: '请输入角色名称!' }]}
				>
					<Input/>
				</Form.Item>
				<Form.Item
					label="角色描述"
					name="roleDesc"
					rules={[{ required: true, message: '请输入角色描述!' }]}
				>
					<Input/>
				</Form.Item>
			</Form>
		</Drawer>
	)
})

export default UpdateUser