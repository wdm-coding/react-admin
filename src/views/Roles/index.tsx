import { Space, Table, Button, Popconfirm } from 'antd'
import type { TableProps } from 'antd'
import {PlusCircleOutlined} from '@ant-design/icons'
import UpdateRole, {RoleModalRef} from './modules/UpdateRole'
import { useEffect, useRef, useState } from 'react'
import {getRolesList,deleteRoles} from '@/api/roles'
interface DataType {
  id: string;
  name: string;
	code: string;
	description?: string;
}
function Roles(){
	const [data, setData] = useState<DataType[]>([])
	const updateRoleRef = useRef<RoleModalRef>(null)
	const columns: TableProps<DataType>['columns'] = [
		{
			title: 'ID',
			dataIndex: 'id',
			align: 'center',
		},
		{
			title: '角色名称',
			dataIndex: 'name',
			align: 'center',
		},
		{
			title: '角色编码',
			dataIndex: 'code',
			align: 'center',
		},
		{
			title: '角色描述',
			dataIndex: 'description',
			align: 'center',
		},
		{
			title: '操作',
			key: 'action',
			align: 'center',
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
	const openAdd = () => {
		updateRoleRef.current?.add()
	}
	const openEdit = (row:DataType) => {
		updateRoleRef.current?.edit(row)
	}
	const deleteHandler = async (row:DataType) => {
		const {code} = await deleteRoles(row.id)
		if(code === 0){
			onReloadList()
		}
	}
	const getRoleListHandler = async () => {
		const {code,data} = await getRolesList()
		if(code === 0){
			setData(data || [])
		}
	}
	const  onReloadList = async () => {
		await getRoleListHandler()
		window.$message.success('操作成功')
	}
	useEffect(()=>{
		getRoleListHandler()
	},[])
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
			<UpdateRole ref={updateRoleRef} onReloadList={onReloadList}/>
		</div>
		
	)
}

export default Roles