<template>
	<view class="wrap" :style="`height: ${viewHomeHeight + 80}px;`">
		<view class="me">
			<!-- 头部 -->
			<view class="me-header" :style="`padding-top:${statusBarHeight}px `">
				<view class="header-main">
					<view class="header-config" @tap="naviToConfig"><image class="config-img" src="../../static/img/config.png"></image></view>
					<view class="header-avatar" @tap="goLogin">
						<image class="avatar-img" :src="loginStatus && userInfo.imgUrl ? userInfo.imgUrl : ''" mode=""></image>
						<view class="user-name">{{loginStatus && userInfo.imgUrl  ? userInfo.nickName:'未登录'}}</view>
					</view>
				</view>
			</view>
			<!-- 我的订单 -->
			<view class="order">
				<view class="order-title f-color" @tap="goOrders">
					<view class="">我的订单</view>
					<view class="">全部订单 ></view>
				</view>
				<!-- <Lines></Lines> -->
				<view class="options-list f-color">
					<view class="order-item">
						<image class="order-item-img" src="../../static/img/order1.png" mode=""></image>
						<view class="">待付款</view>
					</view>
					<view class="order-item">
						<image class="order-item-img" src="../../static/img/order2.png" mode=""></image>
						<view class="">待发货</view>
					</view>
					<view class="order-item">
						<image class="order-item-img" src="../../static/img/order3.png" mode=""></image>
						<view class="">待收货</view>
					</view>
					<view class="order-item">
						<image class="order-item-img" src="../../static/img/order4.png" mode=""></image>
						<view class="">待评价</view>
					</view>
					<view class="order-item">
						<image class="order-item-img" src="../../static/img/order5.png" mode=""></image>
						<view class="">售后</view>
					</view>
				</view>
			</view>

			<!-- 内容列表 -->
			<view class="me-content">
				<view class="content-list f-color">
					<view class="content-list-item">
						<view class="content-list-item-name">
							<image class="content-list-item-img" src="../../static/tabbar/cart.png" mode=""></image>
							<text>我的收藏</text>
						</view>
						<view class="">></view>
					</view>
					<view class="content-list-item">
						<view class="content-list-item-name">
							<image class="content-list-item-img" src="../../static/tabbar/cart.png" mode=""></image>
							<text>我的优惠卷</text>
						</view>
						<view class="">></view>
					</view>
					<view class="content-list-item">
						<view class="content-list-item-name">
							<image class="content-list-item-img" src="../../static/tabbar/cart.png" mode=""></image>
							<text>我的积分</text>
						</view>
						<view class="">></view>
					</view>
				</view>
			</view>

			<view class="me-content">
				<view class="content-list f-color">
					<view class="content-list-item">
						<view class="content-list-item-name">
							<image class="content-list-item-img" src="../../static/tabbar/cart.png" mode=""></image>
							<text>加入VIP</text>
						</view>
						<view class="">></view>
					</view>
				</view>
			</view>

			<view class="me-content">
				<view class="content-list f-color">
					<view class="content-list-item">
						<view class="content-list-item-name">
							<image class="content-list-item-img" src="../../static/tabbar/cart.png" mode=""></image>
							<text>帮助中心</text>
						</view>
						<view class="">></view>
					</view>
					<view class="content-list-item">
						<view class="content-list-item-name">
							<image class="content-list-item-img" src="../../static/tabbar/cart.png" mode=""></image>
							<text>联系客服</text>
						</view>
						<view class="">></view>
					</view>
					<view class="content-list-item">
						<view class="content-list-item-name">
							<image class="content-list-item-img" src="../../static/tabbar/cart.png" mode=""></image>
							<text>商家入驻</text>
						</view>
						<view class="">></view>
					</view>
				</view>
			</view>
		</view>
		<TabBar currentPage="me"></TabBar>
	</view>
</template>

<script>
import {mapState} from 'vuex';
import TabBar from '@/components/common/Tabbar.vue';
export default {
	components: {
		// Lines
		TabBar
	},
	computed:{
		...mapState({
			loginStatus: state=>state.user.loginStatus,
			userInfo: state=>state.user.userInfo
		})
	},
	data() {
		return {
			viewHomeHeight: 0,
			statusBarHeight: 0
		};
	},
	onReady() {
		//获取盒子高度
		// let view = uni.createSelectorQuery().select('.view-home');
		// view.boundingClientRect(data => {
		// 	this.viewHomeHeight = data.height;
		// 	// this.viewHomeHeight = 2000; //uniapp的bug
		// }).exec();

		uni.getSystemInfo({
			success: res => {
				// console.log(res);
				// this.viewHomeHeight = res.windowHeight - this.getClientHeight();
				this.viewHomeHeight = res.windowHeight;
				
			    this.statusBarHeight = res.statusBarHeight;

			}
		});
	},
	methods: {
		naviToConfig() {
			uni.navigateTo({
				url:'/pages/user-config/user-config'
			})
		},
		goOrders(){
			uni.navigateTo({
				url:'/pages/orders/orders'
			})
		},
		goLogin(){
			uni.navigateTo({
				url:'../login/login'
			})
		}
	}
};
</script>

<style scoped>
.wrap {
	width: 100%;
	height: 100%;
	background-color: #f3f2f3;
}

.me-header {
	background: url(../../static/img/mybg.png) no-repeat;
	background-size: 100% 100%;
	/* background-attachment:fixed; */
	width: 100%;
	height: 350rpx;
}
.header-main {
	/* position: relative; */
	/* top:60rpx; */
	/* padding: 0 40rpx; */
}

.header-avatar {
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.config-img {
	margin: 15rpx 0 0 15rpx;
	width: 60rpx;
	height: 60rpx;
}

.avatar-img {
	width: 100rpx;
	height: 100rpx;
	border-radius: 50%;
	margin-bottom: 20rpx;
}

.user-name {
	font-weight: bold;
	color: #fff;
}

.order {
	padding: 20rpx 20rpx;
	background-color: #fff;
}

.order-title {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20rpx 0;
}

.options-list {
	padding: 10rpx 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.order-item {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.me-content {
	margin-top: 40rpx;
	background-color: #fff;
}

.order-item-img {
	width: 80rpx;
	height: 80rpx;
	padding-bottom: 10rpx;
}

.content-list-item {
	display: flex;
	justify-content: space-between;
	padding: 20rpx 20rpx;
	border-bottom: 1rpx solid #f3f2f3;
}

.content-list-item-name {
	display: flex;
	align-items: center;
}
.content-list-item-img {
	width: 40rpx;
	height: 40rpx;
	padding-right: 10rpx;
}
</style>
