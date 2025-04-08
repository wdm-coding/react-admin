import request from '@/utils/request.ts'

export function userLogin(params: any) {
	return request({
		url: '/api/v1/user/info',
		method: 'get',
		params
	})
}
