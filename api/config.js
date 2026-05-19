// 环境判断：开发/生产
const ENV = process.env.NODE_ENV === 'development' ? 'dev' : 'prod'

// 基础URL配置
const BASE_URL = {
	// dev: 'http://localhost:8000/api',  // 本地开发（你的FastAPI地址）
	// dev: 'http://82.156.119.99/api', // 本地开发（你的FastAPI地址）
	// prod: 'http://82.156.119.99/api', // 上线后替换

	dev: 'https://www.pinklove.cn/api', // 改成 HTTPS
	prod: 'https://www.pinklove.cn/api' // 改成 HTTPS
}

export default {
	baseURL: BASE_URL[ENV],
	timeout: 10000, // 请求超时10秒
}