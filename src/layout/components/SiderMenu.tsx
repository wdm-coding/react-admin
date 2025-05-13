import { Menu } from 'antd'
import {
	HomeOutlined,
	UserOutlined,
	VideoCameraOutlined,
	UsergroupAddOutlined,
	ConsoleSqlOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
type MenuItem = Required<MenuProps>['items'][number];
const items: MenuItem[] = [
	{
		key: '/',
		icon: <HomeOutlined />,
		label: '首页',
	},
	{
		key: '/users',
		icon: <UserOutlined />,
		label: '用户管理',
	},
	{
		key: '/roles',
		icon: <UsergroupAddOutlined />,
		label: '角色管理',
	},
	{
		key: '/menus',
		icon: <VideoCameraOutlined />,
		label: '菜单管理',
	},
	{
		key: '/logs',
		icon: <ConsoleSqlOutlined />,
		label: '日志管理',
	}
]
function SiderMenu() {
	const navigate = useNavigate()
	const location = useLocation()
	const [selectedKeys, setSelectedKeys] = useState<string[]>([])
	const menuItemClick: MenuProps['onClick'] = item => {
		navigate(item.key)
	}
	useEffect(() => {
		setSelectedKeys([location.pathname])
	}, [location.pathname])
	return (
		<Menu
			theme="dark"
			mode="inline"
			selectedKeys={selectedKeys}
			items={items}
			onClick={menuItemClick}
		/>
	)
}

export default SiderMenu
