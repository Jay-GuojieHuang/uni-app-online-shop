<template>
	<view>
		<Lines></Lines>
		<view class='login-tel'>
			<view class='tel-main'>
				<view class='login-from'>
					<view class='login-user'>
						<text class='user-text'>验证码</text>
						<input type="text" v-model="userInputCode" placeholder="请输入验证码"/>
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
				countDown: 60,
				codeMsg:'',
				disabled: false,
				phone:'',
				SmsCode:'',
				userInputCode:''
			}
		},
		components:{
			Lines
		},
		onReady() {
		this.codeMsg = `重新发送(${this.countDown})`
		this.sendCode()
		},
		onLoad(e) {
		 this.phone = e.phone
		 console.log(e);
		},
		methods: {
			...mapMutations(['login']),
			sendCode(){
				
				$http.request({
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					url:'/code',
					method:'POST',
					data:{
						phone : this.phone
					},
						dataType: 'json'
				}).then(res=>{
					// console.log(res);
					if(res.success){
						this.SmsCode = res.code
					}
					
					
				}).catch(()=>{
					uni.showToast({
						title: '请求失败',
						icon: 'error'
					})
				})
				
				
				this.disabled = true;
				let timer = setInterval(()=>{
					--this.countDown;
					this.codeMsg = `重新发送(${this.countDown})`
				},1000)
				
				setTimeout(()=>{
					clearInterval(timer);
					this.disabled = false
					this.countDown=60
					this.codeMsg = `重新发送`
				},60000)
			},
			goNext(){
				
				//对比验证吗
				if(this.SmsCode == this.userInputCode){
					$http.request({
						header: {
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						url:'/addUser',
						method:'POST',
						data:{
							userName : this.phone,
							code : this.userInputCode
						},
							dataType: 'json'
					}).then(res=>{
						
						this.login(res.data)
						// console.log(res);
						
						// this.login({
						// 	imgUrl: "../../static/img/commodity1.jpg",
						// 	nickName: this.phone,
						// 	phone: this.phone,
						// 	token: "",
						// 	userName: "默认昵称",
						// 	userPwd: "123"
						// })
						
						
						if(res.success){
							uni.showToast({
								title: '用户添加成功',
								icon: 'success'
							})
						}
						return
						
					}).catch(()=>{
						uni.showToast({
							title: '请求失败',
							icon: 'error'
						})
						return
					})
					
					
					
							uni.navigateTo({
					url:"/pages/index/index",
				})
				}else{
					uni.showToast({
						title:"验证码错误，请重试！",
						icon:'error'
					})
					return
				}
				
				
				
		
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
