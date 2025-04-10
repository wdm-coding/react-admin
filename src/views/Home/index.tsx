import { useEffect } from 'react'
import { userLogin } from '@/api/user.ts'
function Home() {
	useEffect(() => {
		async function fetchData() {
			const res = await userLogin()
			console.log('userLogin', res)
		}
		fetchData()
	}, [])
	return <h1>Home</h1>
}

export default Home
