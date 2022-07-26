<template>
	<view class="my-order bg-color" :style="`height: ${viewHomeHeight}px;`">
		<Lines></Lines>
		<view class="order-header">
			<view @tap="changeTab(index)" v-for="(item, index) in tabList" :key="index" class="header-item" :class="tabIndex === index ? 'active' : ''">{{ item.name }}</view>
		</view>

		<view class="order-main" v-if="false">
			<!-- 商品 -->
			<view class="order-item">
				<view class="item-header f-color">
					<view class="shop-name">小可爱商店</view>
					<view class="item-status f-active-color">未付款</view>
				</view>
				<view class="item-content">
					<image class="item-img" src="../../static/img/Furnishing2.jpg" mode=""></image>
					<view class="item-detail f-color">
						<view class="item-name">
							<view class="name-text">
								床上四件套低调奢华有品位床上四件套低调奢华有品位床上四件套低调奢华有品位
							</view>
							<view class="color">
								颜色分类：粉色
							</view>
							<view class="f-active-color">
								七天无理由退换
							</view>
						</view>
						<view class="item-price-num">
							<view class="price">
								$123123
							</view>
							<view class="num">
								x1
							</view>
						</view>
					</view>
				</view>
				<view class="item-content">
					<image class="item-img" src="../../static/img/Furnishing2.jpg" mode=""></image>
					<view class="item-detail f-color">
						<view class="item-name">
							<view class="name-text">
								床上四件套低调奢华有品位床上四件套低调奢华有品位床上四件套低调奢华有品位
							</view>
							<view class="color">
								颜色分类：粉色
							</view>
							<view class="f-active-color">
								七天无理由退换
							</view>
						</view>
						<view class="item-price-num">
							<view class="price">
								$123123
							</view>
							<view class="num">
								x1
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 总价 -->
			<view class="">
				<view class="total f-color">
					订单金额：
					<text class="f-active-color">$129.00</text>
					（含运费¥0.00）
				</view>
				<Lines></Lines>
			</view>
			<!-- 支付 -->
			<view class="checkout">
				<view class="checkout-text">
					支付
				</view>
			</view>
		</view>
	
		<view class="no-data" v-else>
			<view class="no-data-text f-color">
				您暂时没有订单哦～
			</view>
			<view class="go-home-page">
				去首页逛逛
			</view>
		</view>
	</view>
</template>

<script>
import Lines from '../../components/common/Line.vue';
export default {
	components: {
		Lines
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

				// this.statusBarHeight = res.statusBarHeight;
			}
		});
	},
	data() {
		return {
			tabIndex: 0,
			tabList: [
				{ name: '全部', isActive: true },
				{ name: '待付款', isActive: false },
				{ name: '待发货', isActive: false },
				{ name: '已收货', isActive: false },
				{ name: '待评价', isActive: false }
			],
			viewHomeHeight: 0
		};
	},
	methods: {
		changeTab(index) {
			console.log(index);
			this.tabIndex = index;
		}
	}
};
</script>

<style scoped>
.bg-color {
	background-color: #f7f7f7;
}
.order-main {
	background-color: #fff;
}
.order-header {
	height: 80rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 2rpx solid #f7f7f7;
	background-color: #fff;
}

.header-item {
	text-align: center;
	background-color: #fff;
	flex: 1;
	line-height: 80rpx;
	height: 70rpx;
}

.active {
	border-bottom: 4rpx solid #49bdfb;
}

.order-item {
	background-color: #fff;
}

.item-header {
	width: 100%;
	height: 80rpx;
	padding: 20rpx 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
}


.shop-name {
	padding-left: 20rpx;
}

.item-status {
	padding-right: 20rpx;
}

.item-content {
	padding: 20rpx;
	display: flex;
	background-color: #F7F7F7;
}
.item-detail {
	display: flex;
	flex:1;
	justify-content: space-between;
}
.item-name {
	display: flex;
	flex-direction: column;
	padding: 0 10rpx;
}
.name-text {
	height: 80rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	color: #333333;
	word-break: break-all;
	/* padding: 5rpx 20rpx; */
}

.item-price-num {
	flex:1;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
}
.item-img {
	width: 200rpx;
	height: 200rpx;
}

.total {
	height: 100rpx;
	line-height: 100rpx;
	text-align: right;
}

.checkout {
	height: 150rpx;
	width: 100%;
	display: flex;
	justify-content: flex-end;
	align-items: center;
}


.checkout-text {
	height: 70rpx;
	width: 200rpx;
	line-height: 70rpx;
	text-align: center;
	border:2rpx solid #49bdfb;
	color: #49bdfb;
	margin-right: 20rpx;
	border-radius: 50rpx;
	
}

.no-data {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 800rpx;
}

.go-home-page {
	height: 70rpx;
	width: 200rpx;
	line-height: 70rpx;
	text-align: center;
	border:2rpx solid #49bdfb;
	color: #49bdfb;
	margin-top: 20rpx;
	border-radius: 50rpx;
}
</style>
