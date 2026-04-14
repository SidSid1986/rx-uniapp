import request from '../request.js'

// 帖子列表
export const communityPostList = () => {
  return request.get('/community/post/list')
}

// ✅ 帖子详情 
export const communityPostDetail = (id) => {
  return request.get(`/community/post/detail?id=${id}`)
}

// 发布评论
export const communityCommentAdd = (data) => {
  return request.post('/community/comment/add', data)
}

// 发布帖子
export const communityPostAdd = (data) => {
  return request.post('/community/post/add', data)
}