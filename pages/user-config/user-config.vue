<template>
	<view class="user-config">
		<view class="config-item" @tap="goToAddressManagement">
			<view class="">地址管理</view>
			<view class="">></view>
		</view>
		<view class="config-item">
			<view class="">地址管理</view>
			<view class="">></view>
		</view>
		<view class="config-item">
			<view class="">地址管理</view>
			<view class="">></view>
		</view>
		<view class="config-item">
			<view class="">地址管理</view>
			<view class="">></view>
		</view>
		<view class="config-item">
			<view class="">地址管理</view>
			<view class="">></view>
		</view>
		<view class="user-config-exit">退出</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		goToAddressManagement(){
			uni.navigateTo({
				url:'/pages/user-address/user-address'
			})
		}
	}
};
</script>

<style scoped>
.user-config {
	/* padding: 0 20rpx; */
}
.config-item {
	height: 80rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 2rpx solid #f3f2f3;
	padding: 20rpx;
}

.user-config-exit {
	background-color: #49bdfb;
	color: #fff;
	width: 100%;
	line-height: 80rpx;
	text-align: center;
}
</style>
