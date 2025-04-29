import { Button, Drawer, Flex, Form, Input } from 'antd'
import { forwardRef, useImperativeHandle, useState } from 'react'
import type { FormProps } from 'antd'
import {addRoles,editRoles} from '@/api/roles'
type FieldType = {
	name: string,
	description: string,
}
export interface RoleModalRef {
  add: () => void
	edit: (row:any) => void
	hide: () => void
}
const UpdateRole = forwardRef<RoleModalRef, any>(({onReloadList},ref) => {
	const [formRef] = Form.useForm()
	const [updateType, setUpdateType] = useState('add')
	const [open, setOpen] = useState(false)
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
		const {code} = updateType === 'add' ? await addRoles(values) : await editRoles(rowId,values)
		if(code === 0){
			hide()
			onReloadList()
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
				size="middle"
				style={{marginRight: 8}}
				onClick={onSubmit}
			>
				提交
			</Button>
			<Button
				type="default"
				htmlType="button"
				size="middle"
				onClick={onReset}
			>
			重置
			</Button>
		</Flex>
	}
	useImperativeHandle(ref, () => ({ add, edit, hide }))
	return (
		<Drawer 
			title={updateType === 'add' ? '添加角色': '编辑角色'}
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
					name="name"
					rules={[{ required: true, message: '请输入角色名称!' }]}
				>
					<Input placeholder="请输入角色名称"/>
				</Form.Item>
				<Form.Item
					label="角色编码"
					name="code"
					rules={[{ required: true, message: '请输入角色编码!' }]}
				>
					<Input placeholder="请输入角色编码"/>
				</Form.Item>
				<Form.Item
					label="角色描述"
					name="description"
				>
					<Input placeholder="请输入角色描述"/>
				</Form.Item>
			</Form>
		</Drawer>
	)
})

export default UpdateRole