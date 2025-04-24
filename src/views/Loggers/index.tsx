import { Button, Space, Table,TableProps } from 'antd'
interface DataType {
	id: number,
	path: string,
	method: string,
	body: string,
	result: string,
	time: string
}
function Loggers(){
	const columns:TableProps<DataType>['columns'] = [
		{
			title: 'ID',
			dataIndex: 'id',
			align: 'center',
		},
		{
			title: '路径',
			dataIndex: 'path',
			align: 'center',
		},
		{
			title: '请求方式',
			dataIndex: 'method',
			align: 'center',
		},
		{
			title: '请求体',
			dataIndex: 'body',
			align: 'center',
		},
		{
			title: '响应结果',
			dataIndex: 'result',
			align: 'center',
		},
		{
			title: '请求时间',
			dataIndex: 'time',
			align: 'center',
		},
		{
			title: '操作',
			key: 'action',
			align: 'center',
			render: (_,row) => (
				<Space size="small" align="center"  style={{display:'flex',width:'100%',justifyContent:'center'}}>
					<Button 
						color="primary" 
						variant="solid"
						ghost
						size="small"
						onClick={()=>openDetail(row)}
					>
							详情
					</Button>
				</Space>
			),
		},
	]
	const data: DataType[] = [
		{
			id: 1,
			path: '/api/v1/user',
			method: 'GET',
			body: '{id:1234567890}',
			result: '{"code":200,"msg":"success","data":{}}',
			time: '2023-04-01 12:00:00'
		},
		{
			id: 2,
			path: '/api/v1/user',
			method: 'POST',
			body: '{id:1234567890}',
			result: '{"code":200,"msg":"success","data":{}}',
			time: '2023-04-01 12:00:00'
		},
		{
			id: 3,
			path: '/api/v1/user',
			method: 'PUT',
			body: '{id:1234567890}',
			result: '{"code":200,"msg":"success","data":{}}',
			time: '2023-04-01 12:00:00'
		},
		{
			id: 4,
			path: '/api/v1/user',
			method: 'DELETE',
			body: '{id:1234567890}',
			result: '{"code":200,"msg":"success","data":{}}',
			time: '2023-04-01 12:00:00'
		}
	]
	const openDetail = (row:DataType) => {
		console.log(row)
	}
	return (
		<Table
			size="small"
			bordered 
			columns={columns} 
			dataSource={data}
			rowKey="id"
		/>
	)
}

export default Loggers