<template>
    <view class="doctor-list-page">
        <!-- 顶部导航 -->
  <!--      <view class="navbar">
            <view class="navbar-back" @click="goBack">
                <u-icon name="arrow-left" size="24" color="#FFFFFF"></u-icon>
            </view>
            <text class="navbar-title">名医推荐</text>
            <view class="navbar-placeholder"></view>
        </view> -->

        <!-- 搜索区域 -->
        <view class="search-box">
            <u-search
                v-model="searchKeyword"
                placeholder="搜索医生姓名或科室"
                :show-action="false"
                bg-color="#F8F8F8"
                border-color="#F8BBD9"
                @search="onSearch"
            ></u-search>
        </view>

        <!-- 筛选条件 -->
        <view class="filter-tabs">
            <scroll-view class="filter-scroll" scroll-x="true">
                <view class="filter-list">
                    <view 
                        class="filter-item"
                        :class="{ active: currentFilter === 'all' }"
                        @click="changeFilter('all')"
                    >
                        全部
                    </view>
                    <view 
                        class="filter-item"
                        :class="{ active: currentFilter === 'surgery' }"
                        @click="changeFilter('surgery')"
                    >
                        乳腺外科
                    </view>
                    <view 
                        class="filter-item"
                        :class="{ active: currentFilter === 'oncology' }"
                        @click="changeFilter('oncology')"
                    >
                        肿瘤科
                    </view>
                    <view 
                        class="filter-item"
                        :class="{ active: currentFilter === 'imaging' }"
                        @click="changeFilter('imaging')"
                    >
                        影像科
                    </view>
                    <view 
                        class="filter-item"
                        :class="{ active: currentFilter === 'traditional' }"
                        @click="changeFilter('traditional')"
                    >
                        中医科
                    </view>
                </view>
            </scroll-view>
        </view>

        <!-- 医生列表 -->
        <view class="doctor-list">
            <view 
                class="doctor-item" 
                v-for="doctor in filteredDoctors" 
                :key="doctor.id"
                @click="goToDetail(doctor.id)"
            >
                <view class="doctor-avatar">
                    <u-avatar :src="doctor.avatar" size="80"></u-avatar>
                    <view class="online-status" :class="{ online: doctor.online }">
                        {{ doctor.online ? '在线' : '离线' }}
                    </view>
                </view>
                
                <view class="doctor-info">
                    <view class="doctor-basic">
                        <text class="doctor-name">{{ doctor.name }}</text>
                        <text class="doctor-title">{{ doctor.title }}</text>
                        <text class="doctor-hospital">{{ doctor.hospital }}</text>
                    </view>
                    
                    <view class="doctor-tags">
                        <text class="tag" v-for="tag in doctor.tags" :key="tag">{{ tag }}</text>
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
                
                <view class="consult-btn">
                    <u-button 
                        size="mini" 
                        type="primary" 
                        :custom-style="{
                            background: '#F8BBD9',
                            border: 'none',
                            color: '#FFFFFF'
                        }"
                        @click.stop="consultDoctor(doctor.id)"
                    >
                        咨询
                    </u-button>
                </view>
            </view>
        </view>

        <!-- 空状态 -->
        <view class="empty-state" v-if="filteredDoctors.length === 0">
            <u-empty mode="search" icon="/static/empty-search.png">
                <text class="empty-text">暂无相关医生</text>
            </u-empty>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            searchKeyword: '',
            currentFilter: 'all',
            doctors: [
                {
                    id: 1,
                    name: '张美丽',
                    title: '乳腺外科主任医师',
                    hospital: '北京协和医院',
                    department: 'surgery',
                    avatar: '/static/doctors/doctor1.jpg',
                    online: true,
                    tags: ['乳腺微创', '乳腺癌手术', '乳腺重建'],
                    experience: 20,
                    patients: 5000,
                    rating: 4.9,
                    description: '擅长乳腺疾病诊断与微创手术，20年临床经验'
                },
                {
                    id: 2,
                    name: '王建国',
                    title: '肿瘤科主任医师',
                    hospital: '上海瑞金医院',
                    department: 'oncology',
                    avatar: '/static/doctors/doctor2.jpg',
                    online: false,
                    tags: ['化疗', '靶向治疗', '免疫治疗'],
                    experience: 15,
                    patients: 3000,
                    rating: 4.8,
                    description: '专注于乳腺癌综合治疗，发表多篇学术论文'
                },
                {
                    id: 3,
                    name: '李雪梅',
                    title: '影像科副主任医师',
                    hospital: '广州中山医院',
                    department: 'imaging',
                    avatar: '/static/doctors/doctor3.jpg',
                    online: true,
                    tags: ['乳腺超声', '钼靶检查', 'MRI诊断'],
                    experience: 12,
                    patients: 8000,
                    rating: 4.7,
                    description: '精通乳腺影像学诊断，准确率高'
                },
                {
                    id: 4,
                    name: '陈明华',
                    title: '中医科主任医师',
                    hospital: '成都中医药大学附属医院',
                    department: 'traditional',
                    avatar: '/static/doctors/doctor4.jpg',
                    online: true,
                    tags: ['中药调理', '针灸', '术后康复'],
                    experience: 25,
                    patients: 6000,
                    rating: 4.9,
                    description: '擅长中西医结合治疗乳腺疾病'
                },
                {
                    id: 5,
                    name: '赵晓雯',
                    title: '乳腺外科副主任医师',
                    hospital: '武汉同济医院',
                    department: 'surgery',
                    avatar: '/static/doctors/doctor5.jpg',
                    online: false,
                    tags: ['乳腺良性肿瘤', '乳腺炎', '乳腺增生'],
                    experience: 10,
                    patients: 2000,
                    rating: 4.6,
                    description: '专注于乳腺良性疾病的诊治'
                }
            ]
        }
    },
    computed: {
        filteredDoctors() {
            let result = this.doctors;
            
            // 按科室筛选
            if (this.currentFilter !== 'all') {
                result = result.filter(doctor => doctor.department === this.currentFilter);
            }
            
            // 按关键词搜索
            if (this.searchKeyword) {
                const keyword = this.searchKeyword.toLowerCase();
                result = result.filter(doctor => 
                    doctor.name.toLowerCase().includes(keyword) ||
                    doctor.hospital.toLowerCase().includes(keyword) ||
                    doctor.title.toLowerCase().includes(keyword) ||
                    doctor.tags.some(tag => tag.toLowerCase().includes(keyword))
                );
            }
            
            return result;
        }
    },
    methods: {
        goBack() {
            uni.navigateBack();
        },
        onSearch() {
            console.log('搜索关键词:', this.searchKeyword);
        },
        changeFilter(filter) {
            this.currentFilter = filter;
        },
        goToDetail(doctorId) {
            uni.navigateTo({
                url: `/pages/doctor/detail?id=${doctorId}`
            });
        },
        consultDoctor(doctorId) {
            uni.showToast({
                title: '即将跳转到咨询页面',
                icon: 'none'
            });
            // 实际开发中这里会跳转到咨询页面
        }
    }
}
</script>

<style lang="scss" scoped>
.doctor-list-page {
    min-height: 100vh;
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
        position: relative;
        margin-right: 30rpx;
        
        .online-status {
            position: absolute;
            bottom: -10rpx;
            left: 50%;
            transform: translateX(-50%);
            background-color: #FF4444;
            color: #FFFFFF;
            padding: 4rpx 12rpx;
            border-radius: 20rpx;
            font-size: 20rpx;
            white-space: nowrap;
            
            &.online {
                background-color: #67C23A;
            }
        }
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
    
    .consult-btn {
        margin-left: 20rpx;
    }
}

.empty-state {
    padding: 100rpx 0;
    
    .empty-text {
        color: #999999;
        font-size: 28rpx;
    }
}
</style>