import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
export default defineConfig({
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
	// 开发服务器配置
	server: {
		host: '0.0.0.0', // 服务器地址
		port: 8080, // 服务端口号
		open: false, // 自动打开浏览器
		cors: true, // 允许跨域
		hmr: true, // 热更新
		strictPort: false, // 端口被占用时，直接退出
		// 代理配置
		proxy: {
			'/api': {
				target: 'http://localhost:8080',
				changeOrigin: true,
				rewrite: path => path.replace(/^\/api/, '')
			}
		}
	},
	// 打包配置
	build: {
		outDir: 'dist' // 打包输出目录
	}
})
