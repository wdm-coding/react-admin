import { Space, Table, Button, Popconfirm } from 'antd'
import type { TableProps } from 'antd'
import {PlusCircleOutlined} from '@ant-design/icons'
import UpdateRole, { RoleModalRef } from './modules/UpdateRole'
import { useRef } from 'react'
interface DataType {
  id: string;
  roleName: string;
	roleDesc: string;
}
const Roles = () => {
	const updateRoleRef = useRef<RoleModalRef>(null)
	const columns: TableProps<DataType>['columns'] = [
		{
			title: 'ID',
			dataIndex: 'id',
			align: 'center',
		},
		{
			title: '角色名称',
			dataIndex: 'roleName',
			align: 'center',
		},
		{
			title: '操作',
			key: 'action',
			width: 250,
			render: (_,row) => (
				<Space size="small" align="center"  style={{display:'flex',width:'100%',justifyContent:'center'}}>
					<Button 
						type="primary"
						ghost
						size="small"
						onClick={()=>openEdit(row)}
					>
							编辑
					</Button>
					<Popconfirm
						title="是否确认删除此条数据"
						description="删除后将无法恢复，请谨慎操作！"
						okText="确认"
						cancelText="取消"
						onConfirm={()=>deleteHandler(row)}
					>
						<Button
							type="primary"
							danger
							ghost
							size="small"
						>
							删除
						</Button>
					</Popconfirm>
				</Space>
			),
		},
	]
	const data: DataType[] = [
		{
			id: '1',
			roleName: '超级管理员',
			roleDesc: '拥有所有权限'
		},
		{
			id: '2',
			roleName: '普通用户',
			roleDesc: '拥有普通用户权限'
		}
	]
	const openAdd = () => {
		updateRoleRef.current?.add()
	}
	const openEdit = (row:DataType) => {
		updateRoleRef.current?.edit(row)
	}
	const deleteHandler = (row:DataType) => {
		console.log('delete',row)
	}
	return (
		<div>
			<Button
				type="primary" 
				icon={<PlusCircleOutlined />}
				style={{marginBottom:'10px'}}
				onClick={openAdd}
			>
				新增
			</Button>
			<Table
				size="small"
				bordered 
				columns={columns} 
				dataSource={data}
				rowKey="id"
			/>
			<UpdateRole ref={updateRoleRef}/>
		</div>
	)
}

export default Roles