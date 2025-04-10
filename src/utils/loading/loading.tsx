import { Spin } from 'antd'
import './loading.scss'
function Loading({ tip = 'loading' }: { tip?: string }) {
	return <Spin size="large" tip={tip} wrapperClassName="requiest-loading" fullscreen={true} />
}

export default Loading
