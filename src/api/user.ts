import request from '@/utils/request.ts'
// 用户登录
export function userLogin() {
	return request({
		url: '/user/test',
		method: 'get'
	})
}
// 查询用户信息
export function getUserInfo(id:number | string) {
	return request({
		url: `/user/profile/${id}`,
		method: 'get'
	})
}