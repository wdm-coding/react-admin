import { Space, Table, Button } from 'antd'
import type { TableProps } from 'antd'
import {PlusCircleOutlined} from '@ant-design/icons'

interface DataType {
  id: string;
  username: string;
}

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
		title: 'Action',
		key: 'action',
		width: 250,
		render: () => (
			<Space size="small" align="center"  style={{display:'flex',width:'100%',justifyContent:'center'}}>
				<Button type="primary" ghost size="small">编辑</Button>
				<Button type="primary" danger ghost size="small">删除</Button>
			</Space>
		),
	},
]

const data: DataType[] = [
	{
		id: '1',
		username: 'John Brown',
	},
	{
		id: '2',
		username: 'Jim Green',
	}
]
function Users(){
	return (
		<div>
			<Button
				type="primary" 
				icon={<PlusCircleOutlined />}
				style={{marginBottom:'10px'}}
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
		</div>
		
	)
}

export default Users