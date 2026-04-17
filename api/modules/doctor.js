import request from '../request.js'

// 医生列表（分页 + 筛选）
export const doctorListApi = (params = {}) => {
	return request.get('/doctor/list', params)
}

// 医生详情 ✅ 修复
export const doctorDetail = (id) => {
	return request.get('/doctor/detail?id=' + id)
}

// 新增/修改医生
export const saveDoctor = (data) => {
	return request.post('/doctor/save', data)
}

// 删除医生
export const deleteDoctor = (id) => {
	return request.post('/doctor/delete', { id })
}

// 上传医生头像 ✅ 修复相对路径
export const uploadDoctorAvatar = (filePath) => {
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: '/api/doctor/upload_avatar',
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

// 评价接口（后端暂未实现）
export const addReviewApi = (data) => {
	return request.post('/doctor/add_review', data)
}