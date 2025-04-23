import { Drawer } from 'antd'
import { useState } from 'react'

function UpdateUser() {
	const [open, setOpen] = useState(false)
	const show = () => {
		setOpen(true)
	}

	const hide = () => {
		setOpen(false)
	}
	return (
		<Drawer title="新增" onClose={hide} open={open}>
			<p>Some contents...</p>
			<p>Some contents...</p>
			<p>Some contents...</p>
		</Drawer>
	)
}

export default UpdateUser