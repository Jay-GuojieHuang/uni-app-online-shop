<template>
	<view class="pay-success">
		<view class="">
			支付成功！
		</view>
		<view class="go-home f-active-color" @tap="goHome">
			返回首页继续逛～
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			goHome(){
				// console.log(123);
				uni.switchTab({
					url:'../index/index'
				})
			}
		}
	}
</script>

<style scoped>
.pay-success {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	height: 100%;
	width: 100%;
}

.go-home {
	width: 300rpx;
	height: 80rpx;
	border: 4rpx solid #42B7FB;
	border-radius: 50rpx;
	text-align: center;
	line-height: 80rpx;
	margin-top: 20rpx;
	
}
</style>
