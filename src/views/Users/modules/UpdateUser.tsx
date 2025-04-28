import { Button, Drawer, Flex, Form, Input, Select } from 'antd'
import { forwardRef, useImperativeHandle, useState } from 'react'
import type { FormProps } from 'antd'
import {addUser,editUser} from '@/api/user'
type FieldType = {
	username: string,
	password: string,
	roleIds?: any,
	gender?: string,
	address?:string,
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
		setRowId(row.userId)
		setUpdateType('edit')
		formRef.setFieldsValue({
			...row,
			roleIds: (row.roleIds?.split(',') || []).map((item:any) => Number(item))
		})
		setOpen(true)
	}
	const hide = () => {
		onReset()
		setOpen(false)
	}
	const onFinish: FormProps<FieldType>['onFinish'] = async values => {
		values.roleIds = values.roleIds?.join(',')
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
					<Input autoComplete="off" placeholder="请输入账号!"/>
				</Form.Item>
				{
					updateType === 'add' ?
						<Form.Item
							label="密码"
							name="password"
							rules={[{ required: true, message: '请输入密码!' }]}
						>
							<Input.Password autoComplete="new-password" placeholder="请输入密码"/>
						</Form.Item>
						: null
				}
				<Form.Item
					label="角色"
					name="roleIds"
					rules={[{ required: true, message: '请选择角色!' }]}
				>
					<Select
						placeholder="请选择角色"
						mode="multiple"
						options={[
							{ value: 1, label: '超级管理员' },
							{ value: 2, label: '普通用户' }
						]}
					/>
				</Form.Item>
				<Form.Item 
					label="性别"
					name="gender"
					rules={[{ required: true, message: '请选择性别!' }]}
				>
					<Select
						placeholder="请选择性别"
						options={[
							{ value: 1, label: '男' },
							{ value: 2, label: '女' }
						]}
					/>
				</Form.Item>
				<Form.Item 
					label="地址"
					name="address"
					rules={[{ required: true, message: '请输入地址!' }]}
				>
					<Input.TextArea placeholder="请输入地址" autoSize = {{ minRows: 4 }}/>
				</Form.Item>
				<Form.Item
					label="手机号"
					name="phone"
					rules={[{ required: true, message: '请输入手机号!' }]}
				>
					<Input autoComplete="off" placeholder="请输入手机号!"/>
				</Form.Item>
			</Form>
		</Drawer>
	)
})

export default UpdateUser