<template>
	<view class="container">
		<!-- 轮播图 -->
		<u-swiper :list="bannerList" height="300" indicator-pos="bottomRight" border-radius="10"></u-swiper>

		<!-- 功能入口 -->
		<view class="function-entry">
			<view class="function-item" v-for="(item, index) in functionList" :key="index"
				@click="navigateTo(item.path)">
				<view class="function-icon">
					<u-icon :name="item.icon" size="28" color="#F48FB1"></u-icon>
				</view>
				<text class="function-text">{{ item.name }}</text>
			</view>
		</view>

		<!-- 名医 -->
		<view class="section">
			<view class="section-title">
				<text class="section-title-text">医生介绍</text>
				<text class="section-more" @click="navigateTo('/pages/doctor/list')">更多 ></text>
			</view>
			<scroll-view class="doctor-scroll" scroll-x="true">
				<view class="doctor-list">
					<view class="doctor-card" v-for="(doctor, index) in doctorList" :key="index">
						<view class="doctor-header" @click="goDoctorDetail(doctor.id)">
							<u-avatar :src="doctor.avatar" size="50"></u-avatar>
							<view class="doctor-info">
								<text class="doctor-name">{{ doctor.name }}</text>
								<text class="doctor-title">{{ doctor.title }}</text>
							</view>
						</view>
						<text class="doctor-desc">{{ doctor.desc }}</text>
					</view>
				</view>
			</scroll-view>
		</view>

		<!-- 乳腺知识 -->
		<view class="section">
			<view class="section-title">
				<text class="section-title-text">乳腺知识</text>
				<text class="section-more" @click="navigateTo('/pages/knowledge/list')">更多 ></text>
			</view>
			<view class="knowledge-list">
				<view class="knowledge-item" v-for="(item, index) in knowledgeList" :key="index"
					@click="navigateTo('/pages/knowledge/detail?id=' + item.id)">
					<u-image width="100px" height="80px" :src="item.image" radius="5"></u-image>
					<view class="knowledge-content">
						<text class="knowledge-title">{{ item.title }}</text>
						<!-- 这里我帮你改成 description 就正常了 -->
						<text class="knowledge-desc">{{ item.description }}</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 交流社区 -->
		<view class="section">
			<view class="section-title">
				<text class="section-title-text">交流社区</text>
				<text class="section-more" @click="navigateTo('/pages/community/list')">更多 ></text>
			</view>
			<view class="post-list">
				<view class="post-item" v-for="(post, index) in postList" :key="index"
					@click="navigateTo('/pages/community/detail?id=' + post.id)">
					<view class="post-header">
						<u-avatar :src="post.avatar" size="40"></u-avatar>
						<view class="post-user">
							<text class="post-username">{{ post.username }}</text>
							<text class="post-time">{{ post.time }}</text>
						</view>
					</view>
					<text class="post-content">{{ post.content }}</text>
					<view class="post-footer">
						<text>点赞 {{ post.likes }}</text>
						<text>评论 {{ post.comments }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

 <script>
 	import {
 		doctorListApi
 	} from '@/api/modules/doctor.js'
 	import {
 		knowledgeListApi
 	} from '@/api/modules/knowledge.js'
 
 	export default {
 		data() {
 			return {
 				bannerList: [{
 						url: '/static/1.png'
 					},
 					{
 						url: '/static/2.png'
 					},
 					{
 						url: '/static/3.png'
 					}, {
 						url: '/static/4.png'
 					}
 				],
 				functionList: [{
 						name: '名医介绍',
 						icon: 'account',
 						path: '/pages/doctor/list'
 					},
 					{
 						name: '健康知识',
 						icon: 'file-text',
 						path: '/pages/knowledge/list'
 					},
 					{
 						name: '交流社区',
 						icon: 'chat',
 						path: '/pages/community/list',
 						type: 'tab'
 					},
 					{
 						name: '推荐医生',
 						icon: 'clock',
 						path: '/pages/reminder/index'
 					}
 				],
 				doctorList: [],
 				knowledgeList: [],
 				postList: [{
 						id: 1,
 						username: '小丽',
 						avatar: '/static/avatar1.jpg',
 						time: '2小时前',
 						content: '最近感觉乳房有些胀痛，有没有姐妹有类似经验？应该注意什么？',
 						likes: 12,
 						comments: 5
 					},
 					{
 						id: 2,
 						username: '健康天使',
 						avatar: '/static/avatar2.jpg',
 						time: '5小时前',
 						content: '分享我的康复经历，乳腺癌并不可怕，早期发现治愈率很高！',
 						likes: 45,
 						comments: 22
 					}
 				]
 			}
 		},
 		onLoad() {
 			this.loadDoctorList()
 			this.getKnowledgeList()
 		},
 		methods: {
 			async loadDoctorList() {
 				uni.showLoading({ title: '加载中...' })
 				// 首页只取第一页 5 条
 				const res = await doctorListApi({ page: 1, limit: 5 })
 				if (res.code === 200) {
 					this.doctorList = res.data
 				}
 				uni.hideLoading()
 			},
 
 			async getKnowledgeList() {
 				const res = await knowledgeListApi()
 				if (res.code === 200) {
 					this.knowledgeList = res.data.slice(0, 3)
 				}
 			},
 
 			goDoctorDetail(id) {
 				uni.navigateTo({
 					url: `/pages/doctor/detail?id=${id}`
 				})
 			},
 			navigateTo(path) {
 				if (path == '/pages/community/list') {
 					uni.switchTab({ url: path })
 				} else if (path == '/pages/reminder/index') {
 					uni.navigateTo({ url: '/pages/reminder/list' })
 				} else {
 					uni.navigateTo({ url: path })
 				}
 			}
 		}
 	}
 </script>
<style lang="scss" scoped>
	.container {
		background-color: #f9f9f9;
		min-height: 100vh;
		padding-bottom: 20rpx;
	}

	.function-entry {
		display: flex;
		justify-content: space-around;
		padding: 40rpx 0;
		background-color: #FFFFFF;
		margin: 20rpx;
		border-radius: 20rpx;

		.function-item {
			display: flex;
			flex-direction: column;
			align-items: center;

			.function-icon {
				width: 100rpx;
				height: 100rpx;
				background-color: #FCE4EC;
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-bottom: 16rpx;
			}

			.function-text {
				font-size: 28rpx;
				color: #666666;
			}
		}
	}

	.section {
		background-color: #FFFFFF;
		margin: 20rpx;
		border-radius: 20rpx;
		padding: 0 30rpx 30rpx;

		.section-title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 30rpx 0;
			border-bottom: 1rpx solid #f0f0f0;

			.section-title-text {
				font-size: 32rpx;
				font-weight: bold;
				color: #333333;
			}

			.section-more {
				font-size: 28rpx;
				color: #F48FB1;
			}
		}
	}

	.doctor-scroll {
		white-space: nowrap;
		margin-top: 30rpx;

		.doctor-list {
			display: inline-flex;
			gap: 30rpx;
		}

		.doctor-card {
			width: 400rpx;
			background-color: #FFFFFF;
			border-radius: 16rpx;
			padding: 30rpx;
			box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
			border: 1rpx solid #f0f0f0;
			display: inline-block;

			.doctor-header {
				display: flex;
				align-items: center;
				margin-bottom: 20rpx;

				.doctor-info {
					margin-left: 20rpx;
					display: flex;
					flex-direction: column;

					.doctor-name {
						font-size: 32rpx;
						font-weight: bold;
						margin-bottom: 10rpx;
					}

					.doctor-title {
						font-size: 24rpx;
						color: #666666;
					}
				}
			}

			.doctor-desc {
				font-size: 26rpx;
				color: #666666;
				line-height: 1.5;
			}
		}
	}

	.knowledge-list {
		margin-top: 30rpx;

		.knowledge-item {
			display: flex;
			margin-bottom: 30rpx;
			background-color: #FFFFFF;
			border-radius: 16rpx;
			overflow: hidden;
			box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);

			.knowledge-content {
				flex: 1;
				padding: 20rpx 30rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.knowledge-title {
					font-size: 30rpx;
					font-weight: bold;
					margin-bottom: 10rpx;
					line-height: 1.4;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					overflow: hidden;
				}

				.knowledge-desc {
					font-size: 24rpx;
					color: #666666;
					line-height: 1.4;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					overflow: hidden;
				}
			}
		}
	}

	.post-list {
		margin-top: 30rpx;

		.post-item {
			background-color: #FFFFFF;
			border-radius: 16rpx;
			padding: 30rpx;
			margin-bottom: 30rpx;
			box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);

			.post-header {
				display: flex;
				align-items: center;
				margin-bottom: 20rpx;

				.post-user {
					margin-left: 20rpx;
					flex: 1;

					.post-username {
						font-size: 28rpx;
						font-weight: bold;
						display: block;
					}

					.post-time {
						font-size: 24rpx;
						color: #666666;
					}
				}
			}

			.post-content {
				font-size: 28rpx;
				line-height: 1.5;
				margin-bottom: 20rpx;
				display: -webkit-box;
				-webkit-line-clamp: 3;
				-webkit-box-orient: vertical;
				overflow: hidden;
			}

			.post-footer {
				display: flex;
				justify-content: space-between;
				font-size: 24rpx;
				color: #666666;
			}
		}
	}
</style>