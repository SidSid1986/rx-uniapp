import request from '../request.js'

// 提交推荐
export const addRecommendDoctor = (data) => {
  return request.post('/recommend-doctor/add', data)
}

// 推荐列表
export const getRecommendList = () => {
  return request.get('/recommend-doctor/list')
}