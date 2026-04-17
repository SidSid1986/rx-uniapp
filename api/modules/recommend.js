import request from '../request.js'

// 提交医生推荐（小程序页面用）
export function addRecommendDoctor(data) {
  return request.post('/recommend-doctor/add', data)
}

// 获取推荐列表（小程序列表页用）
export function getRecommendDoctorList() {
  return request.get('/recommend-doctor/list')
}