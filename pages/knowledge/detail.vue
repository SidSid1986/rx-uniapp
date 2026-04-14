<template>
	<view class="knowledge-detail-page">
		<!-- 封面图 -->
		<u-image :src="info.image" width="750rpx" height="400rpx"></u-image>

		<!-- 内容区 -->
		<view class="content-wrapper">
			<text class="article-title">{{ info.title }}</text>

			<view class="article-info">
				<text>发布时间：{{ info.create_time }}</text>
			</view>

			<view class="article-content">
				<text class="content-text">{{ info.content }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	// 完全用你写好的接口
	import { knowledgeDetail } from '@/api/modules/knowledge.js'

	export default {
		data() {
			return {
				id: null,
				info: {
					image: "",
					title: "",
					description: "",
					content: "",
					create_time: ""
				}
			}
		},
		onLoad(options) {
			this.id = options.id
			this.getDetail()
		},
		methods: {
			async getDetail() {
				const res = await knowledgeDetail(this.id)
				if (res.code === 200) {
					this.info = res.data
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.knowledge-detail-page {
		background-color: #f9f9f9;
		min-height: 100vh;
	}

	.content-wrapper {
		padding: 40rpx 30rpx;
	}

	.article-title {
		font-size: 40rpx;
		font-weight: bold;
		color: #333;
		line-height: 1.5;
		margin-bottom: 20rpx;
		display: block;
	}

	.article-info {
		font-size: 26rpx;
		color: #999;
		margin-bottom: 40rpx;
	}

	.article-content {
		font-size: 30rpx;
		color: #444;
		line-height: 1.8;
	}

	.content-text {
		line-height: 1.8;
	}
</style>