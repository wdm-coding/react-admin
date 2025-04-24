import { Button, Drawer, Flex, Form, Input } from 'antd'
import { forwardRef, useImperativeHandle, useState } from 'react'
import type { FormProps } from 'antd'
import {addUser,editUser} from '@/api/user'
type FieldType = {
	username: string,
	password: string,
}
export interface UserModalRef {
  add: () => void
	edit: (row:any) => void
	hide: () => void
}
const UpdateUser = forwardRef<UserModalRef,any>(({onReloadList},ref) => {
	const [formRef] = Form.useForm()
	const [open, setOpen] = useState(false)
	const [updateType, setUpdateType] = useState('add')
	const [rowId, setRowId] = useState<string | number>('')
	const add = () => {
		setUpdateType('add')
		setOpen(true)
	}
	const edit = (row:any) =>{
		setRowId(row.id)
		setUpdateType('edit')
		formRef.setFieldsValue(row)
		setOpen(true)
	}
	const hide = () => {
		onReset()
		setOpen(false)
	}
	const onFinish: FormProps<FieldType>['onFinish'] = async values => {
		const {code} = updateType === 'add' ? await addUser(values) : await editUser(rowId,values)
		if(code === 0){
			hide()
			onReloadList(updateType)
		}
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
			提交
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
			title={updateType === 'add' ? '添加用户': '编辑用户'}
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