type ENV = 'dev' | 'stag' | 'prod'
const env = import.meta.env.VITE_NODE_NEV as ENV
const config = {
	dev: {
		name: '开发环境'
	},
	stag: {
		name: '测试环境'
	},
	prod: {
		name: '生产环境'
	}
}
export default config[env]
