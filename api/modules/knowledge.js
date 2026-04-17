import request from '../request.js'

// 健康知识列表
export const knowledgeListApi = () => {
	return request.get('/knowledge/list')
}

// 知识详情 ✅ 修复（和后端路由匹配）
export const knowledgeDetail = (id) => {
	return request.get('/knowledge/detail?id=' + id)
}

// 新增/修改知识（后台管理用）
export const saveKnowledge = (data) => {
	return request.post('/knowledge/save', data)
}

// 删除知识（后台管理用）
export const deleteKnowledge = (id) => {
	return request.post('/knowledge/delete', {
		id
	})
}

// 上传知识封面图 ✅ 修复相对路径
export const uploadKnowledgeImage = (filePath) => {
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: '/api/knowledge/upload_image',
			filePath: filePath,
			name: 'file',
			success: (res) => {
				const data = JSON.parse(res.data)
				if (data.code === 200) {
					resolve(data.data.url)
				} else {
					uni.showToast({
						title: data.msg || '上传失败',
						icon: 'none'
					})
					reject(data)
				}
			},
			fail: (err) => {
				uni.showToast({
					title: '上传失败',
					icon: 'none'
				})
				reject(err)
			}
		})
	})
}