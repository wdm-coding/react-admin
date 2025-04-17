import { getUserInfo,getUserLog,getLogsGroup } from '@/api/user.ts'
import { Button } from 'antd'
function Home() {
	const getUserInfoHandler = async ()=>{
		await getUserInfo(1)
	}
	const getUserLogHandler = async ()=>{
		await getUserLog(1)
	}
	const getLogsGroupHandler = async ()=>{
		await getLogsGroup(1)
	}
	return (
		<div>
			<Button onClick={getUserInfoHandler}>获取用户信息</Button>
			<Button onClick={getUserLogHandler}>获取用户日志信息</Button>
			<Button onClick={getLogsGroupHandler}>日志高级查询</Button>
		</div>
	)
}

export default Home
