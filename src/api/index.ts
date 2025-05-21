import request from '@/utils/request.ts'
// 定义后端响应数据的类型
interface Response {
  code: number;
  data: any; 
  msg: string;
}
// 查询日志列表
export function getSSE():Promise<Response> {
	return request({
		url: '/sse/send',
		method: 'get'
	})
}
