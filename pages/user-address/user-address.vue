<template>
	<view class="address-management">
		<view class="address-list">
			<view class="list-item f-color">
				<view class="person-detail">
					<view class="recipient">
						Jay
					</view>
					<view class="phone">
						1370000000
					</view>
				</view>
				<view class="address">
					<view class="defalut bg-color">
						默认
					</view>
					广东省深圳市南山区xxx路
				</view>
			</view>
		</view>
		<view class="add-address">
			<view class="add-address-btn bg-color" @tap="goAddAddress">新增地址</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		goAddAddress(){
			uni.navigateTo({
				url:"/pages/add-new-address/add-new-address"
			})
		}
	}
};
</script>

<style scoped>
	
	.add-address {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 20rpx;
	}
	.add-address-btn {
		border-radius:  30rpx;
		padding: 10rpx 20rpx;
		color: #fff;
		width: 200rpx;
		text-align: center;
	}
	
	.list-item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 20rpx;
		border-bottom: 2rpx solid #f3f2f3;
	
	}
	
	.person-detail {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		padding-bottom: 10rpx;
	}
	
	.recipient {
		padding-right: 10rpx;
	}
	
	.defalut {
		width: 80rpx;
		display: inline-block;
		text-align: center;
		color: #fff;
		border-radius: 40rpx;
		margin-right: 10rpx;
		padding: 5rpx;
	}
</style>
