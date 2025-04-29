import { Space, Table, Button, Popconfirm, Form, Input, Row, Col, Select } from 'antd'
import type { TablePaginationConfig, TableProps } from 'antd'
import {PlusCircleOutlined} from '@ant-design/icons'
import UpdateUser, {UserModalRef} from './modules/UpdateUser'
import { useEffect, useRef, useState } from 'react'
import {getUserList,deleteUser} from '@/api/user'
import {getRolesList} from '@/api/roles'
interface DataType {
  userId: string;
  username: string;
	password: string;
}
function Users(){
	const [formRef] = Form.useForm()
	const [data, setData] = useState<DataType[]>([])
	const [roleList, setRoleList] = useState<any[]>([])
	const[query, setQuery] = useState<any>(null)
	const [pagination, setPagination] = useState<any>({
		current: 1,
		pageSize: 10,
		total: 0
	})
	const updateUserRef = useRef<UserModalRef>(null)
	const columns: TableProps<DataType>['columns'] = [
		{
			title: 'ID',
			dataIndex: 'userId',
			align: 'center',
		},
		{
			title: '账号',
			dataIndex: 'username',
			align: 'center',
		},
		{
			title: '所属角色',
			dataIndex: 'roleName',
			align: 'center',
		},
		{
			title: '性别',
			dataIndex: 'gender',
			align: 'center',
			render:gender=>gender === 1 ? '男':'女'
		},
		{
			title: '地址',
			dataIndex: 'address',
			align: 'center',
		},
		{
			title: '手机号',
			dataIndex: 'phone',
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
		const {code} = await deleteUser(row.userId)
		if(code === 0){
			onReloadList()
		}
	}
	const handleTableChange = (pagination:TablePaginationConfig) => {
		setPagination({
			...pagination,
			current: pagination.current,
			pageSize: pagination.pageSize
		})
	}
	const getUserListHandler = async () => {
		const baseParams = {
			pageNum:pagination.current,
			pageSize:pagination.pageSize,
			...query
		}
		const {code,data} = await getUserList(baseParams)
		if(code === 0){
			setPagination({
				...pagination,
				total: data.total || 0,
			})
			setData(data.list || [])
		}
	}
	const  onReloadList = async () => {
		await getUserListHandler()
		window.$message.success('操作成功')
	}
	const searchHandler = () => {
		setQuery(formRef.getFieldsValue())
		setPagination({
			...pagination,
			current: 1
		})
	}
	const resetHandler = () => {
		formRef.resetFields()
		setQuery(formRef.getFieldsValue())
		setPagination({
			...pagination,
			current: 1
		})
	}
	useEffect(()=>{
		getUserListHandler()
	},[pagination.current,pagination.pageSize,query])
	useEffect(()=>{
		async function getRoleListHandler() {
			const {code,data} = await getRolesList()
			if(code === 0){
				const list = data.map((item:any) => ({value: item.id, label: item.name}))
				setRoleList(list)
			}
		}
		getRoleListHandler()
	},[])
	return (
		<div>
			<Row style={{marginBottom:'10px'}}>
				<Col span={18}>
					<Form layout="inline" form={formRef}>
						<Form.Item label="账号" name="username">
							<Input placeholder="请输入账号" />
						</Form.Item>
						<Form.Item label="角色" name="roleId">
							<Select
								placeholder="请选择角色"
								style={{ width: 220 }}
								options={roleList}
							/>
						</Form.Item>
						<Form.Item label="性别" name="gender">
							<Select
								placeholder="请选择性别"
								style={{ width: 220 }}
								options={[
									{ value: '1', label: '男' },
									{ value: '2', label: '女' }
								]}
							/>
						</Form.Item>
					</Form>
				</Col>
				<Col span={6} style={{display:'flex'}} className="items-center justify-end">
					<Button type="default" onClick={resetHandler}>重置</Button>
					<Button type="primary" onClick={searchHandler} style={{marginLeft:'10px'}}>查询</Button>
				</Col>
			</Row>
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
				rowKey="userId"
				pagination={{ 
					...pagination,
					position: ['bottomRight'],
					showSizeChanger: true,
					showQuickJumper: true,
					pageSizeOptions: ['10', '20', '50', '100'],
					showTotal: total => `共 ${total} 条`,
				}}
				onChange={handleTableChange}
			/>
			<UpdateUser ref={updateUserRef} onReloadList={onReloadList} roleList={roleList}/>
		</div>
		
	)
}

export default Users