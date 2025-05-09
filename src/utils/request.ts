import axios from 'axios'
import {getItem,clearCache} from '@/utils/storage'
import { showLoading, hideLoading } from '@/utils/loading/index'
import { AxiosRequestConfig } from 'axios'// 扩展 AxiosRequestConfig 类型定义
declare module 'axios' {
  interface AxiosRequestConfig {
    hideLoading?: boolean | undefined
  }
}
// 创建axios实例
const VITE_BASE_API = import.meta.env.VITE_BASE_API || '/'
// 1.定义pendingRequests作为Map，存储请求的key和对应的cancel函数。
const pendingRequests = new Map()
// 2.生成唯一的key，用于取消重复请求。
const generateRequestKey = (config:AxiosRequestConfig) => {
	const { method, url, params, data } = config
	return [method, url, JSON.stringify(params), JSON.stringify(data)].join('&')
}
// 3. 添加请求到pendingRequests的函数。
const addPendingRequest = (config:AxiosRequestConfig) => {
	const requestKey = generateRequestKey(config)
	config.cancelToken = config.cancelToken || new axios.CancelToken(cancel => {
		if (!pendingRequests.has(requestKey)) {
			pendingRequests.set(requestKey, cancel)
		}
	})
}
// 4. 移除等待中的请求
const removePendingRequest = (config:AxiosRequestConfig) => {
	const requestKey = generateRequestKey(config)
	if (pendingRequests.has(requestKey)) {
		const cancelRequest = pendingRequests.get(requestKey)
		cancelRequest && cancelRequest(requestKey)
		pendingRequests.delete(requestKey)
	}
}
// 5.创建axios实例，配置baseURL、超时等。
const service = axios.create({
	baseURL: VITE_BASE_API,
	headers: {
		'Content-Type': 'application/json;charset=UTF-8'
	},
	timeout: 50000
})
// 6. request拦截器
service.interceptors.request.use(
	config => {
		// 7.请求开始时开启全局loading
		!config.hideLoading && showLoading()
		// 8.处理重复请求（取消之前的）
		removePendingRequest(config)
		addPendingRequest(config)
		// 9.添加认证头(Token)等信息。
		const token = getItem('token') || ''
		if (token) {
			config.headers.Authorization = 'Bearer ' + token
		}
		return config 
	},
	// 10.请求失败处理逻辑
	error => {
		return Promise.reject(error)
	}
)
// 11. respone拦截器
service.interceptors.response.use(
	// 12. 响应成功处理逻辑
	response => {
		// 13. 请求成功时关闭全局loading
		hideLoading()
		// 14. 移除等待中的请求
		removePendingRequest(response.config)
		// 15. 如果是blob类型，直接返回response对象
		if (response.config.responseType === 'blob') {
			return response.data
		}  else {
			const res = response.data
			if (res.code === 0) {
				return res
			} else if (res.code === -1) {
				window.$message.error(res.msg || 'Error')
				return res
			} else if (res.code === -2) {
				window.$message.error('登录超时，请重新登录', 3,() => { clearCache() })
				return res
			} else {
				window.$message.error(res.msg || 'Error')
				return Promise.reject()
			}
		}
	},
	// 16. 响应失败处理逻辑
	error => {
		// 17. 请求失败时关闭全局loading
		hideLoading()
		// 18. 移除等待中的请求
		error.config && removePendingRequest(error.config)
		// 19. 处理取消请求的错误
		if (axios.isCancel(error)) {
			return Promise.reject({ message: '请求被取消' })
		} else {
			const { status,data } = error.response
			if (status) {
				switch (status) {
					case 401:
						window.$message.error('登录超时，请重新登录', 3,() => { clearCache() })
						break
					case 404:
						window.$message.error('路径未找到',3)
						break
					case 403:
						window.$message.error('权限不足',3)
						break
					case 400:
						window.$message.error(data.msg || '错误的请求',3)
						break
					case 500:
						window.$message.error('服务器异常',3)
						break
					default:
						window.$message.error('请求错误，请稍后再试……',3)
						break
				}
			} else {
				window.$message.error('网络错误，请稍后再试……',3)
			}
		}
		return error.response || Promise.reject(error)
	}
)

export default service
