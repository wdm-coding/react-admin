import { Outlet } from 'react-router-dom'
function Layout() {
	return (
		<div>
			<h1>我是布局Layout</h1>
			<Outlet />
		</div>
	)
}

export default Layout
