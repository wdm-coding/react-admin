import { Button, Drawer, Flex, Form, Input } from 'antd'
import { forwardRef, useImperativeHandle, useState } from 'react'
import type { FormProps } from 'antd'
import {addMenus,editMenus} from '@/api/menus'
type FieldType = {
	name: string;
  path: string;
  path_key: string;
  acl?: string;
  icon?: string;
  order?: number;
	description?: string;
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
		const {code} = updateType === 'add' ? await addMenus(values) : await editMenus(rowId,values)
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
			title={updateType === 'add' ? '添加菜单': '编辑菜单'}
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
					label="菜单名称"
					name="name"
					rules={[{ required: true, message: '请输入菜单名称!' }]}
				>
					<Input placeholder="请输入菜单名称"/>
				</Form.Item>
				<Form.Item
					label="菜单路由"
					name="path"
					rules={[{ required: true, message: '请输入菜单路由!' }]}
				>
					<Input placeholder="请输入菜单路由"/>
				</Form.Item>
				<Form.Item
					label="菜单编码"
					name="path_key"
					rules={[{ required: true, message: '请输入菜单编码!' }]}
				>
					<Input placeholder="请输入菜单编码"/>
				</Form.Item>
				<Form.Item
					label="菜单ICON"
					name="icon"
				>
					<Input placeholder="请输入菜单ICON"/>
				</Form.Item>
				<Form.Item
					label="菜单排序"
					name="order"
				>
					<Input placeholder="请输入菜单排序"/>
				</Form.Item>
				<Form.Item
					label="菜单说明"
					name="description"
				>
					<Input placeholder="请输入菜单说明"/>
				</Form.Item>
				<Form.Item
					label="菜单ACL"
					name="acl"
				>
					<Input placeholder="请输入菜单ACL"/>
				</Form.Item>
			</Form>
		</Drawer>
	)
})

export default UpdateRole