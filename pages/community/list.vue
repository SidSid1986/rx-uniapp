<template>
	<view class="wrap">
		<view class="post" v-for="item in list" :key="item.id" @click="toDetail(item.id)">
			<view class="user">
				<u-avatar :src="item.avatar || '/static/avatar1.jpg'" size="40"></u-avatar>
				<text class="name">{{ item.username }}</text>
			</view>
			<view class="title" v-if="item.title">{{ item.title }}</view>
			<view class="content">{{ item.content }}</view>
			<view class="time">{{ item.create_time }}</view>
		</view>
		<view class="publish-btn" @click="goPublish">
			<text class="icon">+</text>
		</view>
	</view>

</template>

<script>
	import {
		communityPostList
	} from '@/api/modules/community.js'

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
				const res = await communityPostList()
				this.list = res.data
			},

			toDetail(id) {
				uni.navigateTo({
					url: '/pages/community/detail?id=' + id
				})
			},
			goPublish() {
				uni.navigateTo({
					url: '/pages/community/publish'
				})
			}
		}
	}
</script>

<style scoped>
	.wrap {
		padding: 20rpx;
		background: #f9f9f9;
		min-height: 100vh;
	}

	.post {
		background: #fff;
		border-radius: 16rpx;
		padding: 30rpx;
		margin-bottom: 20rpx;
	}

	.user {
		display: flex;
		align-items: center;
		margin-bottom: 16rpx;
	}

	.name {
		margin-left: 16rpx;
		font-weight: bold;
		font-size: 28rpx;
	}

	.title {
		font-size: 32rpx;
		font-weight: bold;
		margin-bottom: 10rpx;
	}

	.content {
		font-size: 28rpx;
		line-height: 1.6;
		margin-bottom: 10rpx;
	}

	.time {
		font-size: 24rpx;
		color: #999;
	}
	
	/* 发帖按钮 */
	.publish-btn {
		position: fixed;
		bottom: 120rpx;
		right: 30rpx;
		width: 100rpx;
		height: 100rpx;
		background-color: #F8BBD9;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.15);
		z-index: 999;
	}
	.publish-btn .icon {
		font-size: 40rpx;
		color: #fff;
		font-weight: bold;
	}
</style>