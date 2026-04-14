<template>
  <view class="wrap">
    <!-- 帖子主体（现在能正常显示！） -->
    <view class="card" v-if="info.id">
      <view class="user">
        <u-avatar :src="info.avatar || '/static/avatar1.jpg'" size="50"></u-avatar>
        <view class="user-info">
          <text class="username">{{ info.username }}</text>
          <text class="time">{{ info.create_time }}</text>
        </view>
      </view>

      <view class="title" v-if="info.title">{{ info.title }}</view>
      <view class="content">{{ info.content }}</view>
    </view>

    <!-- 回复列表 -->
    <view class="comment-section">
      <text class="title">全部回复（{{ comments.length }}）</text>
      <view class="comment-item" v-for="item in comments" :key="item.id">
        <u-avatar :src="item.avatar || '/static/avatar1.jpg'" size="36"></u-avatar>
        <view class="comment-box">
          <text class="c-name">{{ item.username }}</text>
          <text class="c-content">{{ item.content }}</text>
          <text class="c-time">{{ item.create_time }}</text>
        </view>
      </view>
    </view>

    <!-- 回复框 -->
    <view class="reply-box">
      <input v-model="content" placeholder="写下你的回复..." class="input" />
      <button @click="send" type="primary">回复</button>
    </view>
  </view>
</template>

<script>
import { communityPostDetail, communityCommentAdd } from '@/api/modules/community.js'

export default {
  data() {
    return {
      id: null,
      info: {},       // 帖子信息
      comments: [],   // 回复列表
      content: ''
    }
  },

  onLoad(e) {
    this.id = e.id
    this.getDetail()
  },

  methods: {
    async getDetail() {
      const res = await communityPostDetail(this.id)
      console.log('详情数据', res.data)
      
      // ✅ 正常赋值
      this.info = res.data.post
      this.comments = res.data.comments
    },

    async send() {
      if (!this.content) {
        uni.showToast({ title: '请输入内容', icon: 'none' })
        return
      }

      await communityCommentAdd({
        post_id: this.id,
        username: '健康用户',
        avatar: '/static/avatar1.jpg',
        content: this.content
      })

      uni.showToast({ title: '回复成功' })
      this.content = ''
      this.getDetail()
    }
  }
}
</script>

<style scoped>
.wrap {
  background: #f9f9f9;
  padding: 20rpx;
  min-height: 100vh;
  padding-bottom: 120rpx;
}

.card {
  background: white;
  border-radius: 16rpx;
  padding: 30rpx;
  margin-bottom: 30rpx;
}

.user {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
}

.user-info {
  margin-left: 20rpx;
}

.username {
  font-size: 30rpx;
  font-weight: bold;
  display: block;
}

.time {
  font-size: 24rpx;
  color: #999;
}

.title {
  font-size: 34rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
}

.content {
  font-size: 30rpx;
  line-height: 1.7;
}

.comment-section {
  background: white;
  border-radius: 16rpx;
  padding: 30rpx;
}

.comment-section .title {
  font-size: 28rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
  display: block;
}

.comment-item {
  display: flex;
  margin-bottom: 20rpx;
}

.comment-box {
  margin-left: 16rpx;
  background: #f9f9f9;
  padding: 20rpx;
  border-radius: 12rpx;
  flex: 1;
}

.c-name {
  font-weight: bold;
  font-size: 26rpx;
  margin-bottom: 6rpx;
  display: block;
}

.c-content {
  font-size: 26rpx;
  line-height: 1.5;
  margin-bottom: 6rpx;
}

.c-time {
  font-size: 22rpx;
  color: #999;
}

.reply-box {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  display: flex;
  padding: 20rpx;
  gap: 20rpx;
}

.input {
  flex: 1;
  border: 1rpx solid #eee;
  border-radius: 12rpx;
  padding: 0 20rpx;
}

button {
  background: #F8BBD9;
  color: white;
  border-radius: 12rpx;
}
</style>