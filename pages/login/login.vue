<template>
	<swiper vertical="true" style="height: 100vh;">
		<swiper-item>
			<scroll-view scroll-y="true">
				<view class="login-wrap">
					<view class="login-content">
						<view class="login-item">
							<!-- 关闭按钮 -->
							<view @tap="close" class="close"><image class="close-img" src="../../static/img/close.png" mode=""></image></view>
							<!-- logo区域 -->
							<view class="logo"><image class="logo-img" src="/static/img/logo.jpg" mode=""></image></view>
							<!-- 手机注册 -->
							<view class="phone" @tap="goSignUp"><view class="phone-register">手机号注册</view></view>
							<!-- 登陆选项 -->
							<LoginOption></LoginOption>
							<!-- 已有账号 -->
							<view class="have-account">
								<view class="have-account-text">已有账号，去登陆</view>
								<view class="iconfont icon-xiajiantou"></view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</swiper-item>
		<swiper-item>
			<scroll-view scroll-y="true">
				<view class="login-wrap">
					<view class="login-content">
						<view class="login-item">
							<!-- 关闭按钮 -->
							<view class="login-sec-header">
								<image @tap="close" class="close-img" src="../../static/img/close.png" mode=""></image>
								<view class="register-acc">
									<view class="iconfont icon-shangjiantou"></view>
									<view class="no-account-text">没有账号，去注册</view>
								</view>
								<view class=""></view>
							</view>

							<view class="login-from">
								<view class="login-user">
									<text class="user-text">账号</text>
									<input type="text" v-model="userName" value="" placeholder="请输入手机号/昵称" />
								</view>
								<view class="login-user">
									<text class="user-text">密码</text>
									<input type="password" v-model="password" value="" placeholder="6-16位字符" />
								</view>
							</view>
							<view class="login-quick">
								<view>忘记密码?</view>
								<view>免密登录</view>
							</view>
							<view class="phone-register" @tap="loginCheck">登录</view>
							<view class="reminder">温馨提示：您可以选择免密登录，更加方便</view>

							<LoginOption></LoginOption>
						</view>
					</view>
				</view>
			</scroll-view>
		</swiper-item>
	</swiper>
</template>

<script>
import $http from '@/common/api/request.js';
import LoginOption from '@/components/common/Login.vue';
export default {
	components: {
		LoginOption
	},
	data() {
		return {
			userName: '',
			password: '',
			//验证规则
			rules: {
				username: {
					rule: /\S/,
					msg: '用户名不能为空'
				},
				password: {
					rule: /^[0-9a-zA-Z]{3,16}$/,
					msg: '密码长度为3到16位'
				}
			}
		};
	},
	methods: {
		close() {
			uni.navigateBack({
				delta: 1
			});
		},
		loginCheck() {
			if (!this.rules.username.rule.test(this.userName)) {
				uni.showToast({
					title: this.rules.username.msg,
					icon: 'error'
				});

				return false;
			} else if (!this.rules.password.rule.test(this.password)) {
				uni.showToast({
					title: this.rules.password.msg,
					icon: 'error'
				});
				return false;
			} else {
				uni.showLoading({
					title: '登录中。。。'
				});

				$http.request({
						header: {
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						url: '/login',
						method: 'POST',
						data: {
							userName: this.userName,
							userPwd: this.password
						},
						dataType:'json',
					})
					.then(res => {
						console.log(res);
						uni.hideLoading();
						uni.showToast({
							title: '登陆成功',
							icon: 'success'
						});
						uni.switchTab({
							url:'../index/index'
						})
					})
					.catch(() => {
						uni.showToast({
							title: '请求失败',
							icon: 'error'
						});
							// uni.hideLoading()
					});

				// uni.switchTab({
				// 	url:'../index/index'
				// })
			}
		},

		goSignUp() {
			uni.navigateTo({
				url: '../signUpByPhone/signUpByPhone'
			});
		}
	}
};
</script>

<style scoped>
.login-content {
	width: 100vw;
	height: 100vh;
}

.login-item {
	padding: 20rpx 20rpx;
	display: flex;
	flex-direction: column;
}

.close-img {
	width: 50rpx;
	height: 50rpx;
	padding-top: 50rpx;
}

.logo {
	/* background-color: gray; */
	height: 600rpx;
	display: flex;
	justify-content: center;
	align-items: flex-end;
}
.logo-img {
	width: 450rpx;
	height: 450rpx;
}

.phone {
	display: flex;
	justify-content: center;
	padding-top: 80rpx;
}
.phone-register {
	width: 100%;
	height: 80rpx;
	border-radius: 50rpx;
	background-color: #49bdfb;
	line-height: 80rpx;
	color: #fff;
	text-align: center;
}

.have-account {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	/* padding-top: 100rpx; */
}

.login-sec-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.register-acc {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.login-from {
	padding-top: 300rpx;
}
.login-user {
	font-size: 32rpx;
	padding: 10rpx 0;
	display: flex;
	align-items: center;
	border-bottom: 2rpx solid #f7f7f7;
}
.user-text {
	padding-right: 10rpx;
}
.login-quick {
	display: flex;
	justify-content: space-between;
	padding: 20rpx 0;
}
.reminder {
	color: #cccccc;
	padding: 20rpx 0;
	text-align: center;
}
</style>
