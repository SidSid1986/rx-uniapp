<template>
	<view class="knowledge-list-page">
		<!-- 头部标题 -->
		<view class="page-header">
			<text class="page-title">健康知识</text>
		</view>

		<!-- 知识列表 -->
		<view class="list-container">
			<view class="knowledge-item" v-for="item in knowledgeList" :key="item.id" @click="goDetail(item.id)">
				<u-image :src="item.image" width="180rpx" height="140rpx" radius="12"></u-image>
				<view class="knowledge-info">
					<text class="knowledge-title">{{ item.title }}</text>
					<text class="knowledge-desc">{{ item.description }}</text>
					<view class="knowledge-time">
						{{ item.create_time }}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// 直接用你写好的接口
	import { knowledgeListApi } from '@/api/modules/knowledge.js'

	export default {
		data() {
			return {
				knowledgeList: []
			}
		},
		onLoad() {
			this.getKnowledgeList()
		},
		methods: {
			// 获取知识列表
			async getKnowledgeList() {
				const res = await knowledgeListApi()
				if (res.code === 200) {
					this.knowledgeList = res.data
				}
			},
			// 跳详情
			goDetail(id) {
				uni.navigateTo({
					url: `/pages/knowledge/detail?id=${id}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.knowledge-list-page {
		background-color: #f9f9f9;
		min-height: 100vh;
		padding: 20rpx;
	}

	.page-header {
		padding: 20rpx 0 30rpx;
		text-align: center;
	}

	.page-title {
		font-size: 38rpx;
		font-weight: bold;
		color: #333;
	}

	.list-container {
		display: flex;
		flex-direction: column;
		gap: 20rpx;
	}

	.knowledge-item {
		background: #fff;
		border-radius: 20rpx;
		padding: 24rpx;
		display: flex;
		align-items: center;
		box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);
	}

	.knowledge-info {
		flex: 1;
		margin-left: 24rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 140rpx;
	}

	.knowledge-title {
		font-size: 32rpx;
		font-weight: bold;
		color: #333;
		line-height: 1.4;
	}

	.knowledge-desc {
		font-size: 26rpx;
		color: #666;
		line-height: 1.4;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.knowledge-time {
		font-size: 24rpx;
		color: #999;
	}
</style>