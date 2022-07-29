<template>
	<view>
		<Lines></Lines>
		 <view class='login-tel'>
		 	<view class='tel-main'>
		 		<view class='login-from'>
		 			<view class='login-user'>
		 				<text class='user-text'>手机号</text>
		 				<input type="number" v-model="validatePhone" focus='true' value="" placeholder="请输入11位手机号"/>
		 			</view>
					<view class='tel' @tap="goGetCode">下一步</view>
		 		</view>
		 		
		 	</view>
		 </view>
	</view>
</template>

<script>
	import $http from '@/common/api/request.js'
	import Lines from '@/components/common/Line.vue'
	export default {
		components:{
			Lines
		},
		data() {
			return {
				validatePhone:'',
				rules:{
					validatePhone:{
						rule:/^1[3456789]\d{9}$/,
						msg:"请输入11位手机号"
					}
				}
			}
		},
		methods: {
			
			validate(key){
				let flag = true;
			
				if(!this.rules[key].rule.test(this[key])){
					uni.showToast({
						title:this.rules[key].msg,
						icon:'error'
					})
					flag = false;
					return false;
				}
				return flag;
			},
			
			
			goGetCode(){
				if (!this.validate("validatePhone") ) return;
				
				
				
				
				uni.navigateTo({
					url:'../getMsgCode/getMsgCode'
				})
			}
		}
	}
</script>

<style scoped>
.login-tel{
	width: 100vw;
	height: 100vh;
}
.tel-main{
	padding:0 20rpx;
}
.login-from{
	padding:100rpx 0;
}
.login-user{
	font-size:32rpx;
	padding:10rpx 0;
	display: flex;
	align-items: center;
	border-bottom:2rpx solid #f7f7f7;
}
.user-text{
	padding-right:10rpx;
}
.tel{
	margin-top: 20rpx;
	width:100%;
	height: 80rpx;
	line-height: 80rpx;
	text-align: center;
	color:#FFFFFF;
	background-color: #49BDFB;
	border-radius: 40rpx;
}
</style>
