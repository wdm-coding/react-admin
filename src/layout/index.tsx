import { Outlet } from 'react-router-dom'
import {MenuFoldOutlined,MenuUnfoldOutlined} from '@ant-design/icons'
import { Button, Layout as AppLayout, theme } from 'antd'
import { useState } from 'react'
import SiderMenu from './components/SiderMenu'
import LogoTitle from './components/LogoTitle'
const { Header, Sider, Content } = AppLayout
function Layout() {
	const [collapsed, setCollapsed] = useState(false)
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken()
	return (
		<AppLayout className="w-full h-full">
			<Sider
				trigger={null}
				collapsible
				collapsed={collapsed}
			>
				<div className="h-[100vh] flex flex-col">
					<div className="h-[64px] bg-blue-300 rounded-xs">
						<LogoTitle />
					</div>
					<div
						className="min-h-0 flex-1 overflow-auto"
						style={{
							insetInlineStart: 0,
							scrollbarWidth: 'thin',
							scrollbarGutter: 'stable'
						}}
					>
						<SiderMenu/>
					</div>
				</div>
			</Sider>
			<AppLayout>
				<Header style={{ padding: 0, background: colorBgContainer }}>
					<Button
						type="text"
						icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
						onClick={() => setCollapsed(!collapsed)}
						style={{
							fontSize: '16px',
							width: 64,
							height: 64,
						}}
					/>
				</Header>
				<Content
					style={{
						margin: '16px',
						padding: 12,
						background: colorBgContainer,
						borderRadius: borderRadiusLG,
					}}
				>
					<Outlet />
				</Content>
			</AppLayout>
		</AppLayout>
	)
}

export default Layout
