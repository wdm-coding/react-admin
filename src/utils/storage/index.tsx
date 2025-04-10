const BASE_KEY = 'REACT_ADMIN_CACHE'
// 1.sessionStorage存储
export function setItem(key: string, data: any) {
	// 1. 读取已有数据
	const oldData = JSON.parse(sessionStorage.getItem(BASE_KEY) as string)
	// 2. 合并新旧数据
	if (oldData) {
		const newData = { ...oldData, [key]: data }
		return sessionStorage.setItem(BASE_KEY, JSON.stringify(newData))
	} else {
		sessionStorage.setItem(BASE_KEY, JSON.stringify({ [key]: data }))
	}
}
// 2.sessionStorage获取
export function getItem(key: string) {
	const oldData = JSON.parse(sessionStorage.getItem(BASE_KEY) as string)
	if (oldData) {
		const result = oldData[key]
		try {
			return JSON.parse(result as string)
		} catch (error) {
			return result as string
		}
	} else {
		return null
	}
}
// 3.sessionStorage移除
export function removeItem(key: string) {
	const oldData = JSON.parse(sessionStorage.getItem(BASE_KEY) as string)
	if (oldData && oldData[key]) {
		delete oldData[key]
		return sessionStorage.setItem(BASE_KEY, JSON.stringify(oldData))
	} else {
		return null
	}
}
// 清楚缓存
export function clearCache() {
	sessionStorage.removeItem(BASE_KEY)
}
