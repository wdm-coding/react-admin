import { getUserInfo } from '@/api/user.ts'
import { Button } from 'antd'
function Home() {
	const getUserInfoHandler = async ()=>{
		await getUserInfo(1)
	}
	return (
		<div>
			<Button onClick={getUserInfoHandler}>获取用户信息</Button>
		</div>
	)
}

export default Home
