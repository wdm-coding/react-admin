import { App } from 'antd'
import type { MessageInstance } from 'antd/es/message/interface'
import type { ModalStaticFunctions } from 'antd/es/modal/confirm'
import type { NotificationInstance } from 'antd/es/notification/interface'
let newMessage: MessageInstance
let notification: NotificationInstance
let modal: Omit<ModalStaticFunctions, 'warn'>
const msgKey = ['info', 'success', 'error', 'warning','loading']
const message : { [key: string]: any } = {}
declare global {
	interface Window {
		$message: typeof message;
		$modal: typeof modal;
		$notification: typeof notification;
	}
}
export default function AdtdGlobal(){
	const staticFunction = App.useApp()
	newMessage = staticFunction.message
	modal = staticFunction.modal
	notification = staticFunction.notification
	msgKey.forEach(key => {
		message[key] = (content:any,duration?:number,onClose?:()=>void)=>{
			newMessage.destroy()
			newMessage[key as keyof typeof newMessage](content as any,duration,onClose)
		}
	})
	window.$message = message
	window.$modal = modal
	window.$notification = notification
	return null
}