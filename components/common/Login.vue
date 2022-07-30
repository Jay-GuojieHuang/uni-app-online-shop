<template>
	<view class="login-options">
		<view class="options-text">
			<view class="text">或用以下方式登陆</view>
		</view>
		<view class="option-imgs">
			<view class="option-item" @tap="loginThirdParty('weixin')">
				<image class="option-img" src="../../static/img/wx.png" mode=""></image>
				<text>微信</text>
			</view>
			<view class="option-item"  @tap="loginThirdParty('sinaweibo')">
				<image class="option-img" src="../../static/img/wb.png" mode=""></image>
				<text>微博</text>
			</view>
			<view class="option-item"  @tap="loginThirdParty('qq')">
				<image class="option-img" src="../../static/img/qq.png" mode=""></image>
				<text>QQ</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		methods:{
			loginThirdParty(provider){
				uni.login({
					provider:provider,
					success: (res) => {
						// console.log(res);
						let openid = res.authResult.openid;
						uni.getUserInfo({
							provider:provider,
							success: (res) => {
								console.log(res);
							}
						})
					}
				})
			}
		}
		
	}
</script>

<style scoped>
	
	.login-options {
/* 		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 20rpx;
		width: 100%; */
		/* background-color: grey; */
		padding: 50rpx 0;
	}
	
	.options-text {
		/* width: 100%; */
		/* text-align: center; */
		display: flex;
		/* background-color: red; */
		/* align-items: center;
		justify-content: center; */
		/* text-align: center; */
		/* position: relative; */
	}
	
	/* .text {
		line-height: 0rpx;
		padding:0 10rpx;
	} */

	.options-text{
		display: flex;
		padding:50rpx 0;
	}
	.options-text view{
		line-height: 0rpx;
		padding:0 10rpx;
	}
	.options-text::after{
		flex:1;
		content: '';
		height: 2rpx;
		background-color: #CCCCCC;
	}
	
	.options-text::before{
		flex:1;
		content: '';
		height: 2rpx;
		background-color: #CCCCCC;
	}
	
	
	
	
	
	.option-imgs {
		padding-top: 20rpx;
		display: flex;
		width: 100%;
		justify-content: space-evenly;
	}
	
	.option-item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.option-img {
		width: 80rpx;
		height: 80rpx;
	}
</style>