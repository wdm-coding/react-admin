import {getSSE} from '@/api/index'
import { Button } from 'antd'
function Home() {
	const initSSE = () =>{
		const eventSource = new EventSource('/api/sse/message') // 创建EventSource对象，连接到服务器端的事件流
		eventSource.onopen = () => {
			console.log('连接成功')
		}
		eventSource.onmessage = function(event) {
			const {data} = event
			console.log('接收到的数据:', JSON.parse(data)) // 接收到来自服务器的数据时执行的操作
		}
		eventSource.onerror = e => {
			console.log('连接错误:', e)
		}
	}
	initSSE()
	const sendHandler = () => {
		getSSE()
	}
	return (
		<div className="w-[40vw] flex justify-around">
			<Button onClick={sendHandler}>发送</Button>
		</div>
	)
}

export default Home
