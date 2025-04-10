import axios from 'axios'
import { showLoading, hideLoading } from '@/utils/loading/index'
// 创建axios实例
const request = axios.create({
	baseURL: '/api', // API的base_url
	timeout: 5000 // 请求超时时间
})
request.interceptors.request.use(
	config => {
		showLoading()
		return config
	},
	error => {
		Promise.reject(error)
	}
)
// 响应拦截器
request.interceptors.response.use(
	response => {
		hideLoading()
		const { status, data } = response
		if (status === 200) {
			const { code } = data
			if (code === 0) {
				return data
			} else if (code === -1) {
				return alert('服务器出错，请稍后再试')
			} else if (code === -2) {
				return alert('登录过期，请重新登录')
			} else {
				return alert('未知错误')
			}
		} else {
			switch (status) {
				case 401:
					return alert('登录失败，请重新登录')
				case 403:
					return alert('无权限访问该资源')
				case 404:
					return alert('请求的资源不存在')
				case 500:
					return alert('服务器出错，请稍后再试')
				default:
					alert('未知错误')
					break
			}
		}
	},
	error => {
		hideLoading()
		alert('未知错误')
		return Promise.reject(error)
	}
)
export default request
