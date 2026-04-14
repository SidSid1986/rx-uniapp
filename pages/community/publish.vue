<template>
	<view class="wrap">
		<view class="form-box">
			<view class="item">
				<text class="label">标题（选填）</text>
				<input v-model="title" placeholder="请输入标题" />
			</view>

			<view class="item">
				<text class="label">内容</text>
				<textarea v-model="content" placeholder="分享你的想法..." class="content-input"></textarea>
			</view>

			<button type="primary" class="publish" @click="submit">发布帖子</button>
		</view>
	</view>
</template>

<script>
import { communityPostAdd } from '@/api/modules/community.js'
export default {
	data() {
		return {
			title: '',
			content: ''
		}
	},
	methods: {
		async submit() {
			if (!this.content) {
				uni.showToast({ title: '请输入内容', icon: 'none' })
				return
			}

			await communityPostAdd({
				username: '健康用户', // 固定写死，后期可改登录用户
				avatar: '/static/avatar1.jpg',
				title: this.title,
				content: this.content
			})

			uni.showToast({ title: '发布成功' })
			setTimeout(() => {
				uni.navigateBack()
			}, 1500)
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
	background: #fff;
	border-radius: 16rpx;
	padding: 30rpx;
}
.item {
	margin-bottom: 30rpx;
}
.label {
	font-size: 28rpx;
	font-weight: bold;
	margin-bottom: 16rpx;
	display: block;
}
input {
	font-size: 28rpx;
	padding: 20rpx;
	background: #f9f9f9;
	border-radius: 12rpx;
}
.content-input {
	width: 100%;
	height: 300rpx;
	background: #f9f9f9;
	border-radius: 12rpx;
	padding: 20rpx;
	font-size: 28rpx;
}
.publish {
	background: #F8BBD9;
	color: #fff;
	border-radius: 12rpx;
	margin-top: 20rpx;
}
</style>