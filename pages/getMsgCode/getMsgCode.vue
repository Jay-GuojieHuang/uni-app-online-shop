<template>
	<view>
		<Lines></Lines>
		<view class='login-tel'>
			<view class='tel-main'>
				<view class='login-from'>
					<view class='login-user'>
						<text class='user-text'>验证码</text>
						<input type="text" placeholder="请输入验证码"/>
						<button plain='true' size='mini' :disabled="disabled" @tap="sendCode"> {{codeMsg}} </button>
					</view>
				</view>
				<view class='tel'@tap="goNext" >下一步</view>
			</view>
		</view>
	</view>
</template>

<script>
	import $http from '@/common/api/request.js'
	import Lines from "@/components/common/Line.vue"
	import {mapMutations} from 'vuex'
	export default {
		data() {
			return {
				countDown: 10,
				codeMsg:'',
				disabled: false
			}
		},
		components:{
			Lines
		},
		onReady() {
		this.codeMsg = `重新发送(${this.countDown})`
		this.sendCode()
		},
		onLodad(e) {
		
		},
		methods: {
			sendCode(){
				this.disabled = true;
				let timer = setInterval(()=>{
					--this.countDown;
					this.codeMsg = `重新发送(${this.countDown})`
				},1000)
				
				setTimeout(()=>{
					clearInterval(timer);
					this.disabled = false
					this.countDown=10
					this.codeMsg = `重新发送`
				},10000)
			},
			goNext(){
				uni.switchTab({
					
					url:"/pages/index/index",
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
	padding:30rpx 0;
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
	width:100%;
	height: 80rpx;
	line-height: 80rpx;
	text-align: center;
	color:#FFFFFF;
	background-color: #49BDFB;
	border-radius: 40rpx;
}
</style>
