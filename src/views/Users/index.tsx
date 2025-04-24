import { Space, Table, Button, Popconfirm } from 'antd'
import type { TableProps } from 'antd'
import {PlusCircleOutlined} from '@ant-design/icons'
import UpdateUser, {UserModalRef} from './modules/UpdateUser'
import { useEffect, useRef, useState } from 'react'
import {getUserList,deleteUser} from '@/api/user'
interface DataType {
  id: string;
  username: string;
	password: string;
}
function Users(){
	const [data, setData] = useState<DataType[]>([])
	const updateUserRef = useRef<UserModalRef>(null)
	const columns: TableProps<DataType>['columns'] = [
		{
			title: 'ID',
			dataIndex: 'id',
			align: 'center',
		},
		{
			title: '账号',
			dataIndex: 'username',
			align: 'center',
		},
		{
			title: '密码',
			dataIndex: 'password',
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
		updateUserRef.current?.add()
	}
	const openEdit = (row:DataType) => {
		updateUserRef.current?.edit(row)
	}
	const deleteHandler = async (row:DataType) => {
		const {code} = await deleteUser(row.id)
		if(code === 0){
			onReloadList()
		}
	}
	const getUserListHandler = async (params = {}) => {
		const baseParams = {
			pageNum:1,
			pageSize:10,
			...params
		}
		const {code,data} = await getUserList(baseParams)
		if(code === 0){
			setData(data || [])
		}
	}
	const  onReloadList = async () => {
		await getUserListHandler()
		window.$message.success('操作成功')
	}
	useEffect(()=>{
		getUserListHandler()
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
			<UpdateUser ref={updateUserRef} onReloadList={onReloadList}/>
		</div>
		
	)
}

export default Users