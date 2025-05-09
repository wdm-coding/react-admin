import request from '@/utils/request.ts'
// 定义后端响应数据的类型
interface Response {
  code: number;
  data: any; 
	msg: string;
}
interface User {
  username: string;
  password: string;
}
// 用户注册
export function userSignup(data:User):Promise<Response> {
	return request({
		url: '/auth/signup',
		method: 'POST',
		data
	})
}
// 用户登录
export function userSignin(data:any):Promise<Response> {
	return request({
		url: '/auth/signin',
		method: 'POST',
		data
	})
}
// 查询用户列表
export function getUserList(params:any = {}):Promise<Response> {
	return request({
		url: '/user/list',
		method: 'get',
		params
	})
}
// 新增用户
export function addUser(data:User):Promise<Response> {
	return request({
		url: '/user/add',
		method: 'post',
		data
	})
}
// 编辑用户
export function editUser(id:string | number,data:User):Promise<Response> {
	return request({
		url: `/user/edit/${id}`,
		method: 'Patch',
		data
	})
}
// 删除用户
export function deleteUser(id:number | string):Promise<Response> {
	return request({
		url: `/user/delete/${id}`,
		method: 'Delete'
	})
}