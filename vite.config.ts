import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
export default defineConfig(({ mode }) => {
	// 获取环境变量
	const { VITE_PORT, VITE_PROXY_URL } = loadEnv(mode, __dirname)
	return {
		root: './', // 根目录
		base: '/', // 项目打包路径
		publicDir: 'public', // 静态资源目录
		plugins: [react()], // 插件
		// 别名配置
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src')
			}
		},
		// scss配置
		css: {
			preprocessorOptions: {
				scss: {
					// 关闭 sass 变量名称警告
					silenceDeprecations: ['legacy-js-api']
				}
			}
		},
		// 开发服务器配置
		server: {
			host: '0.0.0.0', // 服务器地址
			port: Number(VITE_PORT), // 服务端口号
			open: false, // 自动打开浏览器
			cors: true, // 允许跨域
			hmr: true, // 热更新
			strictPort: false, // 端口被占用时，直接退出
			// 代理配置
			proxy: {
				'/api': {
					target: VITE_PROXY_URL,
					changeOrigin: true,
					rewrite: path => path.replace(/^\/api/, '')
				}
			}
		},
		// 打包配置
		build: {
			outDir: 'dist' // 打包输出目录
		}
	}
})
