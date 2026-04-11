<template>
	<view class="doctor-detail-page">
		<!-- 顶部导航 -->
	<!-- 	<view class="navbar">
			<view class="navbar-back" @click="goBack">
				<u-icon name="arrow-left" size="24" color="#FFFFFF"></u-icon>
			</view>
			<text class="navbar-title">医生详情</text>
			<view class="navbar-placeholder"></view>
		</view> -->

		<scroll-view class="scroll-content" scroll-y="true">
			<!-- 医生基本信息 -->
			<view class="basic-info">
				<view class="doctor-header">
					<view class="avatar-section">
						<u-avatar :src="doctor.avatar" size="120"></u-avatar>
					</view>

					<view class="info-section">
						<text class="doctor-name">{{ doctor.name }}</text>
						<text class="doctor-title">{{ doctor.title }}</text>
						<text class="doctor-hospital">{{ doctor.hospital }}</text>

						<view class="rating-section">
							<u-rate :count="5" v-model="doctor.rating" disabled size="24"></u-rate>
							<text class="rating-text">{{ doctor.rating }}分</text>
						</view>
					</view>
				</view>
			</view>

			<!-- 擅长领域 -->
			<view class="section">
				<view class="section-title">
					<text class="section-icon">🎯</text>
					<text class="section-text">擅长领域</text>
				</view>
				<view class="expertise-tags">
					<text class="expertise-tag" v-for="(tag, index) in doctor.tags.split(',')" :key="index">
						{{ tag }}
					</text>
				</view>
			</view>

			<!-- 简介 -->
			<view class="section" v-if="doctor.desc">
				<view class="section-title">
					<text class="section-icon">📌</text>
					<text class="section-text">医生简介</text>
				</view>
				<view class="desc">
					<text class="desc-text">{{ doctor.desc }}</text>
				</view>
			</view>

			<!-- 个人介绍 -->
			<view class="section" v-if="doctor.introduction">
				<view class="section-title">
					<text class="section-icon">👩‍⚕️</text>
					<text class="section-text">个人介绍</text>
				</view>
				<view class="introduction">
					<text class="introduction-text">{{ doctor.introduction }}</text>
				</view>
			</view>

			<!-- 专业背景 -->
			<view class="section" v-if="doctor.background.length">
				<view class="section-title">
					<text class="section-icon">📚</text>
					<text class="section-text">教育背景</text>
				</view>
				<view class="background-list">
					<view class="bg-item" v-for="(item, idx) in doctor.background" :key="idx">
						<text class="bg-type">{{ item.type }}</text>
						<text class="bg-content">{{ item.content }}</text>
					</view>
				</view>
			</view>

			<!-- 患者评价 -->
			<view class="section">
				<view class="section-title">
					<text class="section-icon">💬</text>
					<text class="section-text">患者评价（{{ doctor.reviews.length }}）</text>
				</view>
				<view class="reviews">
					<view class="review-item" v-for="review in doctor.reviews" :key="review.id">
						<view class="review-header">
							<u-avatar :src="review.avatar" size="60"></u-avatar>
							<view class="reviewer-info">
								<text class="reviewer-name">{{ review.name }}</text>
								<text class="review-time">{{ review.create_time }}</text>
							</view>
							<u-rate :count="5" v-model="review.rating" disabled size="20"></u-rate>
						</view>
						<text class="review-content">{{ review.content }}</text>
					</view>

					<view class="empty-review" v-if="doctor.reviews.length === 0">
						<text class="empty-text">暂无患者评价</text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {
		doctorDetail
	} from "@/api/modules/doctor.js"

	export default {
		data() {
			return {
				doctorId: null,
				doctor: {
					avatar: "",
					name: "",
					title: "",
					hospital: "",
					rating: 0,
					tags: "",
					desc: "",
					introduction: "",
					background: "",
					reviews: []
				}
			}
		},
		onLoad(options) {
			this.doctorId = options.id;
			this.loadDoctorDetail();
		},
		methods: {
			goBack() {
				uni.navigateBack();
			},
			async loadDoctorDetail() {
				const res = await doctorDetail(this.doctorId)
				if (res.code === 200) {
					this.doctor = res.data
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.doctor-detail-page {
		height: 100vh;
		display: flex;
		flex-direction: column;
		background-color: #f9f9f9;
	}

	.navbar {
		background: linear-gradient(135deg, #F8BBD9, #F48FB1);
		color: #FFFFFF;
		padding: 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.navbar-back {
			width: 60rpx;
		}

		.navbar-title {
			font-size: 36rpx;
			font-weight: bold;
			flex: 1;
			text-align: center;
		}

		.navbar-placeholder {
			width: 60rpx;
		}
	}

	.scroll-content {
		flex: 1;
	}

	.basic-info {
		background: linear-gradient(135deg, #F8BBD9, #F48FB1);
		padding: 40rpx 30rpx;
		color: #FFFFFF;

		.doctor-header {
			display: flex;
			align-items: center;

			.avatar-section {
				margin-right: 30rpx;
			}

			.info-section {
				flex: 1;

				.doctor-name {
					display: block;
					font-size: 40rpx;
					font-weight: bold;
					margin-bottom: 10rpx;
				}

				.doctor-title {
					display: block;
					font-size: 28rpx;
					margin-bottom: 10rpx;
					opacity: 0.9;
				}

				.doctor-hospital {
					display: block;
					font-size: 26rpx;
					opacity: 0.8;
					margin-bottom: 20rpx;
				}

				.rating-section {
					display: flex;
					align-items: center;

					.rating-text {
						margin-left: 20rpx;
						font-size: 26rpx;
					}
				}
			}
		}
	}

	.section {
		background-color: #FFFFFF;
		margin: 20rpx;
		border-radius: 20rpx;
		padding: 30rpx;
		box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);

		.section-title {
			display: flex;
			align-items: center;
			margin-bottom: 30rpx;

			.section-icon {
				font-size: 32rpx;
				margin-right: 15rpx;
			}

			.section-text {
				font-size: 32rpx;
				font-weight: bold;
				color: #333;
			}
		}
	}

	.expertise-tags {
		.expertise-tag {
			display: inline-block;
			background-color: #FCE4EC;
			color: #F48FB1;
			padding: 12rpx 24rpx;
			border-radius: 30rpx;
			font-size: 26rpx;
			margin-right: 20rpx;
			margin-bottom: 20rpx;
		}
	}

	.desc-text,
	.introduction-text,
	.background-text {
		font-size: 28rpx;
		line-height: 1.7;
		color: #666;
	}

	.reviews {
		.review-item {
			padding: 30rpx 0;
			border-bottom: 1rpx solid #f0f0f0;

			.review-header {
				display: flex;
				align-items: center;
				margin-bottom: 20rpx;

				.reviewer-info {
					flex: 1;
					margin-left: 20rpx;

					.reviewer-name {
						display: block;
						font-size: 28rpx;
						font-weight: bold;
						color: #333;
					}

					.review-time {
						display: block;
						font-size: 24rpx;
						color: #999;
					}
				}
			}

			.review-content {
				font-size: 28rpx;
				color: #666;
				line-height: 1.6;
			}
		}
	}

	.empty-review {
		padding: 40rpx 0;
		text-align: center;

		.empty-text {
			color: #999;
			font-size: 28rpx;
		}
	}
	
	.background-list {
	    display: flex;
	    flex-direction: column;
	    gap: 16rpx;
	}
	.bg-item {
	    display: flex;
	    font-size: 28rpx;
	    line-height: 1.6;
	}
	.bg-type {
	    font-weight: bold;
	    color: #333;
	    width: 100rpx;
	}
	.bg-content {
	    color: #666;
	    flex: 1;
	}
</style>