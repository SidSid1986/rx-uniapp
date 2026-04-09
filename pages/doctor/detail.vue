<template>
    <view class="doctor-detail-page">
        <!-- 顶部导航 -->
        <view class="navbar">
            <view class="navbar-back" @click="goBack">
                <u-icon name="arrow-left" size="24" color="#FFFFFF"></u-icon>
            </view>
            <text class="navbar-title">医生详情</text>
            <view class="navbar-placeholder"></view>
        </view>

        <scroll-view class="scroll-content" scroll-y="true">
            <!-- 医生基本信息 -->
            <view class="basic-info">
                <view class="doctor-header">
                    <view class="avatar-section">
                        <u-avatar :src="doctor.avatar" size="120"></u-avatar>
                        <view class="online-status" :class="{ online: doctor.online }">
                            {{ doctor.online ? '在线' : '离线' }}
                        </view>
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
                
                <view class="stats-section">
                    <view class="stat-item">
                        <text class="stat-value">{{ doctor.experience }}年</text>
                        <text class="stat-label">从业经验</text>
                    </view>
                    <view class="stat-item">
                        <text class="stat-value">{{ doctor.patients }}+</text>
                        <text class="stat-label">服务患者</text>
                    </view>
                    <view class="stat-item">
                        <text class="stat-value">{{ doctor.responseTime }}分钟</text>
                        <text class="stat-label">平均回复</text>
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
                    <text class="expertise-tag" v-for="tag in doctor.expertise" :key="tag">{{ tag }}</text>
                </view>
            </view>

            <!-- 个人介绍 -->
            <view class="section">
                <view class="section-title">
                    <text class="section-icon">👩‍⚕️</text>
                    <text class="section-text">个人介绍</text>
                </view>
                <view class="introduction">
                    <text class="introduction-text">{{ doctor.introduction }}</text>
                </view>
            </view>

            <!-- 专业背景 -->
            <view class="section">
                <view class="section-title">
                    <text class="section-icon">📚</text>
                    <text class="section-text">专业背景</text>
                </view>
                <view class="background-list">
                    <view class="background-item" v-for="item in doctor.background" :key="item.type">
                        <text class="background-type">{{ item.type }}：</text>
                        <text class="background-content">{{ item.content }}</text>
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
                    <view class="review-item" v-for="review in doctor.reviews.slice(0, 3)" :key="review.id">
                        <view class="review-header">
                            <u-avatar :src="review.avatar" size="60"></u-avatar>
                            <view class="reviewer-info">
                                <text class="reviewer-name">{{ review.name }}</text>
                                <text class="review-time">{{ review.time }}</text>
                            </view>
                            <u-rate :count="5" v-model="review.rating" disabled size="20"></u-rate>
                        </view>
                        <text class="review-content">{{ review.content }}</text>
                    </view>
                    
                    <view class="view-all-reviews" @click="viewAllReviews" v-if="doctor.reviews.length > 3">
                        <text>查看全部评价</text>
                        <u-icon name="arrow-right" size="24" color="#F48FB1"></u-icon>
                    </view>
                </view>
            </view>
        </scroll-view>

        <!-- 底部操作栏 -->
        <view class="action-bar">
            <view class="action-buttons">
                <view class="action-btn secondary" @click="addToFavorites">
                    <u-icon name="star" size="32" :color="isFavorited ? '#FFD700' : '#999999'"></u-icon>
                    <text>收藏</text>
                </view>
                
                <view class="action-btn secondary" @click="makeAppointment">
                    <u-icon name="calendar" size="32" color="#999999"></u-icon>
                    <text>预约</text>
                </view>
                
                <view class="primary-btn" @click="startConsultation">
                    <text>立即咨询</text>
                    <text class="consult-price">¥{{ doctor.consultPrice }}</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            doctorId: null,
            isFavorited: false,
            doctor: {
                id: 1,
                name: '张美丽',
                title: '乳腺外科主任医师',
                hospital: '北京协和医院',
                avatar: '/static/doctors/doctor1.jpg',
                online: true,
                rating: 4.9,
                experience: 20,
                patients: 5000,
                responseTime: 15,
                consultPrice: 198,
                expertise: [
                    '乳腺微创手术', '乳腺癌根治术', '乳腺重建手术', 
                    '乳腺良性肿瘤切除', '乳腺炎治疗', '乳腺增生调理'
                ],
                introduction: '北京协和医院乳腺外科主任医师，医学博士，博士生导师。从事乳腺外科临床工作20年，擅长各种乳腺疾病的诊断和治疗，尤其在乳腺微创手术和乳腺癌综合治疗方面有深入研究。曾赴美国MD Anderson癌症中心进修学习。',
                background: [
                    { type: '教育背景', content: '北京医科大学医学博士' },
                    { type: '工作经历', content: '北京协和医院乳腺外科主任医师（2010年至今）' },
                    { type: '学术成就', content: '发表SCI论文30余篇，主持国家级科研项目5项' },
                    { type: '专业认证', content: '中华医学会乳腺病学分会委员' }
                ],
                reviews: [
                    {
                        id: 1,
                        name: '李女士',
                        avatar: '/static/avatars/avatar1.jpg',
                        time: '2024-01-15',
                        rating: 5,
                        content: '张医生非常专业，手术做得很好，恢复得很快，非常感谢！'
                    },
                    {
                        id: 2,
                        name: '王女士',
                        avatar: '/static/avatars/avatar2.jpg',
                        time: '2024-01-10',
                        rating: 4.5,
                        content: '医生很耐心，解释得很清楚，让我对病情有了全面的了解。'
                    },
                    {
                        id: 3,
                        name: '赵女士',
                        avatar: '/static/avatars/avatar3.jpg',
                        time: '2024-01-05',
                        rating: 5,
                        content: '非常感谢张医生的精心治疗，现在恢复得很好，定期复查都很正常。'
                    }
                ]
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
        loadDoctorDetail() {
            // 实际开发中这里会调用API获取医生详情
            console.log('加载医生详情:', this.doctorId);
        },
        addToFavorites() {
            this.isFavorited = !this.isFavorited;
            uni.showToast({
                title: this.isFavorited ? '已收藏' : '已取消收藏',
                icon: 'none'
            });
        },
        makeAppointment() {
            uni.navigateTo({
                url: `/pages/appointment/book?doctorId=${this.doctorId}`
            });
        },
        startConsultation() {
            uni.navigateTo({
                url: `/pages/consultation/start?doctorId=${this.doctorId}`
            });
        },
        viewAllReviews() {
            uni.navigateTo({
                url: `/pages/doctor/reviews?doctorId=${this.doctorId}`
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.doctor-detail-page {
    height: 100vh;
    display: flex;
    flex-direction: column;
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
    background-color: #f9f9f9;
}

.basic-info {
    background: linear-gradient(135deg, #F8BBD9, #F48FB1);
    padding: 40rpx 30rpx;
    color: #FFFFFF;
    
    .doctor-header {
        display: flex;
        align-items: center;
        margin-bottom: 40rpx;
        
        .avatar-section {
            position: relative;
            margin-right: 30rpx;
            
            .online-status {
                position: absolute;
                bottom: -10rpx;
                left: 50%;
                transform: translateX(-50%);
                background-color: rgba(255, 255, 255, 0.9);
                color: #FF4444;
                padding: 6rpx 16rpx;
                border-radius: 20rpx;
                font-size: 20rpx;
                white-space: nowrap;
                
                &.online {
                    color: #67C23A;
                }
            }
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
    
    .stats-section {
        display: flex;
        justify-content: space-around;
        background-color: rgba(255, 255, 255, 0.2);
        border-radius: 20rpx;
        padding: 30rpx;
        
        .stat-item {
            text-align: center;
            
            .stat-value {
                display: block;
                font-size: 32rpx;
                font-weight: bold;
                margin-bottom: 10rpx;
            }
            
            .stat-label {
                display: block;
                font-size: 24rpx;
                opacity: 0.8;
            }
        }
    }
}

.section {
    background-color: #FFFFFF;
    margin: 20rpx;
    border-radius: 20rpx;
    padding: 30rpx;
    
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
            color: #333333;
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

.introduction {
    .introduction-text {
        font-size: 28rpx;
        line-height: 1.6;
        color: #666666;
    }
}

.background-list {
    .background-item {
        margin-bottom: 20rpx;
        
        .background-type {
            font-size: 28rpx;
            font-weight: bold;
            color: #333333;
        }
        
        .background-content {
            font-size: 28rpx;
            color: #666666;
        }
    }
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
                    color: #333333;
                }
                
                .review-time {
                    display: block;
                    font-size: 24rpx;
                    color: #999999;
                }
            }
        }
        
        .review-content {
            font-size: 28rpx;
            color: #666666;
            line-height: 1.5;
        }
    }
    
    .view-all-reviews {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 30rpx 0;
        color: #F48FB1;
        font-size: 28rpx;
    }
}

.action-bar {
    background-color: #FFFFFF;
    padding: 20rpx