<template>
  <view class="wrap">
    <view class="card" v-for="item in list" :key="item.id">
      <view class="top">
        <text class="name">{{ item.name || '匿名医生' }}</text>
        <text class="status" :class="item.status === 1 ? 'pass' : item.status === 2 ? 'fail' : ''">
          {{ item.status === 1 ? '✅ 已采纳' : item.status === 2 ? '❌ 已拒绝' : '⏳ 审核中' }}
        </text>
      </view>

      <view class="info" v-if="item.hospital">🏥 {{ item.hospital }}</view>
      <view class="info" v-if="item.title">👨‍⚕️ {{ item.title }}</view>

      <view class="content">
        <text>推荐理由：{{ item.content }}</text>
      </view>
    </view>

    <view class="empty" v-if="list.length === 0">
      <text>暂无推荐记录</text>
    </view>

    <view class="fab" @click="goPublish">
      <text>我要推荐</text>
    </view>
  </view>
</template>

<script>
// 👉 修复：接口名必须匹配
import { getRecommendDoctorList } from '@/api/modules/recommend.js'

export default {
  data() {
    return {
      list: []
    }
  },
  onShow() {
    this.getList()
  },
  methods: {
    async getList() {
      try {
        const res = await getRecommendDoctorList()
        console.log("推荐列表：", res)
        this.list = res.data || []
      } catch (err) {
        uni.showToast({ title: '加载失败', icon: 'none' })
      }
    },
    goPublish() {
      uni.navigateTo({ url: '/pages/reminder/index' })
    }
  }
}
</script>

<style scoped>
.wrap {
  background: #f9f9f9;
  padding: 20rpx;
  min-height: 100vh;
}
.card {
  background: white;
  border-radius: 16rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
}
.top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10rpx;
}
.name {
  font-size: 30rpx;
  font-weight: bold;
}
.status {
  font-size: 24rpx;
  color: #999;
}
.status.pass {
  color: #07c160;
}
.status.fail {
  color: #fa3f3f;
}
.info {
  font-size: 26rpx;
  color: #666;
  margin-bottom: 10rpx;
}
.content {
  font-size: 26rpx;
  line-height: 1.5;
  color: #333;
}
.empty {
  text-align: center;
  padding-top: 100rpx;
  color: #999;
}
.fab {
  position: fixed;
  bottom: 120rpx;
  right: 30rpx;
  background: #f8bbd9;
  color: white;
  padding: 20rpx 30rpx;
  border-radius: 50rpx;
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.1);
}
</style>