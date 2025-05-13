import request from '@/utils/request.ts'
// 定义后端响应数据的类型
interface Response {
  code: number;
  data: any; 
	msg: string;
}
interface menus {
  name: string;
  path: string;
  path_key: string;
  acl?: string;
  icon?: string;
  order?: number;
	description?: string;
}
// 查询菜单列表
export function getMenusList():Promise<Response> {
	return request({
		url: '/menus/list',
		method: 'get'
	})
}
// 新增菜单
export function addMenus(data: menus):Promise<Response> {
	return request({
		url: '/menus/add',
		method: 'post',
		data
	})
}
// 删除菜单
export function deleteMenus(id: number | string):Promise<Response> {
	return request({
		url: `/menus/delete/${id}`,
		method: 'delete'
	})
}
// 更新菜单
export function editMenus(id: number| string,data: menus, ):Promise<Response> {
	return request({
		url: `/menus/edit/${id}`,
		method: 'Patch',
		data
	})
}
