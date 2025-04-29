import request from '@/utils/request.ts'
// 定义后端响应数据的类型
interface Response {
  code: number;
  data: any; 
  msg: string;
}
interface Roles {
  id?: number | string;
  name: string;
  description: string;
}
// 查询角色列表
export function getRolesList():Promise<Response> {
	return request({
		url: '/roles/list',
		method: 'get'
	})
}
// 新增角色
export function addRoles(data:Roles):Promise<Response> {
	return request({
		url: '/roles/add',
		method: 'post',
		data
	})
}
// 编辑用户
export function editRoles(id:string | number,data:Roles):Promise<Response> {
	return request({
		url: `/roles/edit/${id}`,
		method: 'Patch',
		data
	})
}
// 删除用户
export function deleteRoles(id:number | string):Promise<Response> {
	return request({
		url: `/roles/delete/${id}`,
		method: 'Delete'
	})
}