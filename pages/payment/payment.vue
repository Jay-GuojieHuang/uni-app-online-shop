<template>
	<view>
		<uniNaviBar title="支付方式" leftText="关闭" statusBar="true" @clickLeft="goBack"></uniNaviBar>
		<view class="payment-tool-list">
			<radio-group name="">
				<view class="payment-option">
					<image class="option-img" src="../../static/img/zfb.png" mode=""></image>
					<view class="option-detail">
						<view class="option-name">支付宝</view>
						<view class="option-description">推荐支付宝用户使用</view>
					</view>
					<label class="radio">
						<radio value="" color="#42B7FB" />
						<text></text>
					</label>
				</view>

				<view class="payment-option">
					<image class="option-img" src="../../static/img/wxf.png" mode=""></image>
					<view class="option-detail">
						<view class="option-name">微信支付</view>
						<view class="option-description">推荐有微信账号的用户使用</view>
					</view>
					<label class="radio">
						<radio name="123" value="" color="#42B7FB" />
						<text></text>
					</label>
				</view>
			</radio-group>
		</view>

		<!-- 支付 -->
		<view class="pay-footer">
			<view class="total">
				<text>合计：</text>
				<text>$ {{detail.price}}</text>
			</view>
			<view class="submit-btn" @tap="goPayment">去支付</view>
		</view>
	</view>
</template>

<script>
import uniNaviBar from '@/components/uni/uni-nav-bar/uni-nav-bar.vue';
export default {
	components: {
		uniNaviBar
	},
	onLoad(e){
		// console.log(JSON.parse(e.detail));
		
		this.detail =JSON.parse(e.detail)
	},
	data() {
		return {
			detail:{}
		};
	},
	methods: {
		goBack() {
			uni.navigateBack({
				delta: 1
			});
		},
		goPayment() {
			uni.navigateTo({
				url: '../pay-success/pay-success'
			});
		}
	}
};
</script>

<style scoped>
.payment-tool-list {
	/* 	 display: flex;
	 flex-direction: column;
	 justify-content: space-between;
	 align-items: stretch; */
}
.payment-option {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20rpx;
	border-bottom: 4rpx solid #f7f7f7;
}

.option-img {
	width: 150rpx;
	height: 150rpx;
}

.option-detail {
	/* flex: 1; */

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	text-align: left;
	/* background-color: red; */
	width: 400rpx;
	/* height: 200rpx; */
}

.pay-footer {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 125rpx;
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100%;
	/* padding: 0 20rpx; */
}

.submit-btn {
	width: 300rpx;
	height: 125rpx;
	line-height: 125rpx;
	text-align: center;
	background-color: #42b7fb;
	color: #fff;
}

.total {
	background-color: #000000;
	color: #fff;
	height: 125rpx;
	line-height: 125rpx;
	width: 100%;
	padding-left: 20rpx;
}
</style>
