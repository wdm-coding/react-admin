import request from '@/utils/request.ts'
export function userLogin() {
	return request({
		url: '/user/test',
		method: 'get'
	})
}
