<template>
  <view class="wrap">
    <view class="form-box">
      <view class="item">
        <text class="label">医生姓名（必填）</text>
        <input v-model="form.name" placeholder="请输入医生姓名" />
      </view>

      <view class="item">
        <text class="label">医院（选填）</text>
        <input v-model="form.hospital" placeholder="可不填" />
      </view>

      <view class="item">
        <text class="label">职称（选填）</text>
        <input v-model="form.title" placeholder="可不填" />
      </view>

      <view class="item">
        <text class="label">推荐理由（必填）</text>
        <textarea v-model="form.content" placeholder="请写一下您的推荐理由" class="textarea"></textarea>
      </view>

      <button @click="submit" type="primary" class="btn">提交推荐</button>
    </view>
  </view>
</template>

<script>
import { addRecommendDoctor } from '@/api/modules/recommend.js'

export default {
  data() {
    return {
      form: {
        name: '',
        hospital: '',
        title: '',
        content: ''
      }
    }
  },
  methods: {
    async submit() {
      if (!this.form.name) {
        uni.showToast({ title: '请输入医生姓名', icon: 'none' })
        return
      }
      if (!this.form.content) {
        uni.showToast({ title: '请填写推荐理由', icon: 'none' })
        return
      }

      const res = await addRecommendDoctor(this.form)
      
      if (res.code === 200) {
        uni.showToast({ title: '提交成功！等待审核' })
        setTimeout(() => {
          uni.navigateBack()
        }, 1500)
      }
    }
  }
}
</script>

<style scoped>
.wrap {
  background: #f9f9f9;
  min-height: 100vh;
  padding: 20rpx;
}
.form-box {
  background: white;
  border-radius: 16rpx;
  padding: 30rpx;
}
.item {
  margin-bottom: 30rpx;
}
.label {
  font-size: 28rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
  display: block;
}
input {
  padding: 20rpx;
  background: #f6f6f6;
  border-radius: 12rpx;
}
.textarea {
  height: 250rpx;
  padding: 20rpx;
  background: #f6f6f6;
  border-radius: 12rpx;
}
.btn {
  background: #f8bbd9;
  border-radius: 12rpx;
  color: white;
}
</style>