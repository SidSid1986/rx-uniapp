<template>
	<view class="doctor-list-page">
		<!-- 搜索区域 -->
		<view class="search-box">
			<u-search v-model="searchKeyword" placeholder="搜索医生姓名或科室" :show-action="false" 
				bg-color="#F8F8F8" border-color="#F8BBD9" @search="onSearch"></u-search>
		</view>

		<!-- 筛选条件 -->
		<view class="filter-tabs">
			<scroll-view class="filter-scroll" scroll-x="true">
				<view class="filter-list">
					<view class="filter-item" :class="{ active: currentDept == 'all' }" @click="changeDept('all')">
						全部
					</view>
					<view class="filter-item" :class="{ active: currentDept == 'surgery' }" @click="changeDept('surgery')">
						乳腺外科
					</view>
					<view class="filter-item" :class="{ active: currentDept == 'oncology' }" @click="changeDept('oncology')">
						肿瘤科
					</view>
					<view class="filter-item" :class="{ active: currentDept == 'imaging' }" @click="changeDept('imaging')">
						影像科
					</view>
					<view class="filter-item" :class="{ active: currentDept == 'traditional' }" @click="changeDept('traditional')">
						中医科
					</view>
				</view>
			</scroll-view>
		</view>

		<!-- 医生列表 -->
		<view class="doctor-list">
			<view class="doctor-item" v-for="doctor in doctorsList" :key="doctor.id" @click="goToDetail(doctor.id)">
				<view class="doctor-avatar">
					<u-avatar :src="doctor.avatar" size="80"></u-avatar>
				</view>

				<view class="doctor-info">
					<view class="doctor-basic">
						<text class="doctor-name">{{ doctor.name }}</text>
						<text class="doctor-title">{{ doctor.title }}</text>
						<text class="doctor-hospital">{{ doctor.hospital }}</text>
					</view>

					<view class="doctor-tags">
						<text class="tag" v-for="(tag,index) in doctor.tags" :key="index">{{ tag.name }}</text>
					</view>

					<view class="doctor-stats">
						<view class="stat-item">
							<text class="stat-value">{{ doctor.experience }}年</text>
							<text class="stat-label">从业经验</text>
						</view>
						<view class="stat-item">
							<text class="stat-value">{{ doctor.patients }}+</text>
							<text class="stat-label">服务患者</text>
						</view>
						<view class="stat-item">
							<text class="stat-value">{{ doctor.rating }}</text>
							<text class="stat-label">评分</text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 加载提示 -->
		<view class="loading" v-if="loading">
			<text>加载中...</text>
		</view>

		<!-- 没有更多 -->
		<view class="no-more" v-if="finished && doctorsList.length > 0">
			<text>没有更多数据了</text>
		</view>

		<!-- 空状态 -->
		<view class="empty-state" v-if="!loading && finished && doctorsList.length === 0">
			<u-empty mode="search">
				<text class="empty-text">暂无相关医生</text>
			</u-empty>
		</view>
	</view>
</template>

<script>
	import { doctorListApi } from '@/api/modules/doctor.js'
	
	export default {
		data() {
			return {
				searchKeyword: '',
				currentDept: 'all',
				doctorsList: [],
				page: 1,
				limit: 5,
				loading: false,
				finished: false
			}
		},

		onLoad() {
			this.loadDoctorList()
		},

		// 上拉加载更多
		onReachBottom() {
			if (!this.finished) {
				this.page++
				this.loadDoctorList()
			}
		},

		methods: {
			// 加载列表
			async loadDoctorList() {
				if (this.loading) return
				this.loading = true

				const params = {
					page: this.page,
					limit: this.limit,
					keyword: this.searchKeyword,
					department: this.currentDept === 'all' ? '' : this.currentDept
				}

				const res = await doctorListApi(params)
				this.loading = false

				if (res.code === 200) {
					const data = res.data || []
					if (this.page === 1) {
						this.doctorsList = data
					} else {
						this.doctorsList = [...this.doctorsList, ...data]
					}

					// 判断是否还有更多
					if (data.length < this.limit) {
						this.finished = true
					}
				}
			},

			// 搜索
			onSearch() {
				this.resetAndLoad()
			},

			// 切换科室
			changeDept(dept) {
				this.currentDept = dept
				this.resetAndLoad()
			},

			// 重置并重新加载
			resetAndLoad() {
				this.page = 1
				this.finished = false
				this.doctorsList = []
				this.loadDoctorList()
			},

			// 去详情
			goToDetail(doctorId) {
				uni.navigateTo({ url: `/pages/doctor/detail?id=${doctorId}` })
			}
		}
	}
</script>

<style lang="scss" scoped>
	.doctor-list-page {
		min-height: 100vh;
		background-color: #f9f9f9;
	}

	.search-box {
		padding: 30rpx;
		background-color: #FFFFFF;
	}

	.filter-tabs {
		background-color: #FFFFFF;
		padding: 20rpx 30rpx;

		.filter-scroll {
			white-space: nowrap;
		}

		.filter-list {
			display: inline-flex;
			gap: 20rpx;
		}

		.filter-item {
			padding: 12rpx 24rpx;
			background-color: #F8F8F8;
			border-radius: 30rpx;
			font-size: 28rpx;
			color: #666666;
			white-space: nowrap;

			&.active {
				background-color: #F8BBD9;
				color: #FFFFFF;
			}
		}
	}

	.doctor-list {
		padding: 30rpx;
	}

	.doctor-item {
		background-color: #FFFFFF;
		border-radius: 20rpx;
		padding: 30rpx;
		margin-bottom: 30rpx;
		display: flex;
		align-items: flex-start;
		box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);

		.doctor-avatar {
			margin-right: 30rpx;
		}

		.doctor-info {
			flex: 1;

			.doctor-basic {
				margin-bottom: 20rpx;

				.doctor-name {
					font-size: 32rpx;
					font-weight: bold;
					color: #333333;
					margin-right: 20rpx;
				}

				.doctor-title {
					font-size: 26rpx;
					color: #F48FB1;
					margin-right: 20rpx;
				}

				.doctor-hospital {
					font-size: 26rpx;
					color: #666666;
					display: block;
					margin-top: 10rpx;
				}
			}

			.doctor-tags {
				margin-bottom: 20rpx;

				.tag {
					display: inline-block;
					background-color: #FCE4EC;
					color: #F48FB1;
					padding: 6rpx 16rpx;
					border-radius: 20rpx;
					font-size: 22rpx;
					margin-right: 10rpx;
					margin-bottom: 10rpx;
				}
			}

			.doctor-stats {
				display: flex;
				gap: 30rpx;

				.stat-item {
					text-align: center;

					.stat-value {
						display: block;
						font-size: 28rpx;
						font-weight: bold;
						color: #333333;
					}

					.stat-label {
						display: block;
						font-size: 22rpx;
						color: #999999;
					}
				}
			}
		}
	}

	.loading {
		text-align: center;
		padding: 20rpx;
		color: #666;
	}

	.no-more {
		text-align: center;
		padding: 20rpx;
		color: #999;
	}

	.empty-state {
		padding: 100rpx 0;
		text-align: center;
	}
</style>