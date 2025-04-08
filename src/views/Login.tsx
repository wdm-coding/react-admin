import { Button } from 'antd'
import { useEffect } from 'react'
import { userLogin } from '@/api/user.ts'
function Login() {
	useEffect(() => {
		async function fetchData() {
			const res = await userLogin({})
			console.log('userLogin', res)
		}
		fetchData()
	}, [])
	return (
		<h1>
			<Button>11</Button>
		</h1>
	)
}

export default Login
