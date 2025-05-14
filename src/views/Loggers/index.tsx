import { Table } from 'antd'
import type { TableProps } from 'antd'
import { useEffect, useState } from 'react'
import {getLogsList} from '@/api/loggers'
interface DataType {
	id: string;
	name: string;
	code: string;
	description?: string;
}
function Loggers(){
	const [data, setData] = useState<DataType[]>([])
	const columns: TableProps<DataType>['columns'] = [
		{
			title: 'ID',
			dataIndex: 'id',
			align: 'center',
		},
		{
			title: '请求方式',
			dataIndex: 'method',
			align: 'center',
		},
		{
			title: '请求路径',
			dataIndex: 'path',
			align: 'center',
		},
		{
			title: '请求参数',
			dataIndex: 'data',
			align: 'center',
		},
		{
			title: '请求结果',
			dataIndex: 'result',
			align: 'center',
		}
	]
	const getRoleListHandler = async () => {
		const {code,data} = await getLogsList()
		if(code === 0){
			setData(data || [])
		}
	}
	useEffect(()=>{
		getRoleListHandler()
	},[])
	return (
		<div>
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

export default Loggers