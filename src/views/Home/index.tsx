import { useEffect } from 'react'
import { userLogin } from '@/api/user.ts'
import { setItem } from '@/utils/storage'
function Home() {
	useEffect(() => {
		async function fetchData() {
			const res = await userLogin()
			setItem('next-js', res)
			setItem('token', res.data)
			console.log('userLogin', res)
		}
		fetchData()
	}, [])
	return <h1>Home</h1>
}

export default Home
