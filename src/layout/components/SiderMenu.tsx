import { Menu } from 'antd'
import {UserOutlined,VideoCameraOutlined} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { useNavigate } from 'react-router-dom'
type MenuItem = Required<MenuProps>['items'][number];
const items:MenuItem[] = [
	{
		key: '/',
		icon: <UserOutlined />,
		label: '首页',
	},
	{
		key: '/test',
		icon: <VideoCameraOutlined />,
		label: '测试页面',
	}
]
function SiderMenu(){
	const navigate = useNavigate()
	const menuItemClick:MenuProps['onClick'] = item => {
		navigate(item.key)
	}
	return (
		<Menu
			theme="dark"
			mode="inline"
			defaultSelectedKeys={['1']}
			items={items}
			onClick={menuItemClick}
		/>
	)
}

export default SiderMenu