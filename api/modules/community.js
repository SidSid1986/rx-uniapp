import request from '../request.js'

// 帖子列表（修复）
export const communityPostList = () => {
  return request.get('/community/list')
}

// 帖子详情（修复）
export const communityPostDetail = (id) => {
  return request.get(`/community/detail?id=${id}`)
}

// 发布评论（正常不用改）
export const communityCommentAdd = (data) => {
  return request.post('/community/comment/add', data)
}

// 发布帖子（修复）
export const communityPostAdd = (data) => {
  return request.post('/community/save', data)
}