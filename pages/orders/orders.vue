<template>
	<view class="my-order bg-color" :style="`height: ${viewHomeHeight}px;`">
		<Lines></Lines>
		<view class="order-header">
			<view @tap="changeTab(index)" v-for="(item, index) in tabList" :key="index" class="header-item" :class="tabIndex === index ? 'active' : ''">{{ item.name }}</view>
		</view>

		<block v-for="(tabItem, index) in tabList" :key="index">
			<view v-show="index === tabIndex">
				<view v-if="tabItem.list.length > 0" class="order-main">
					<!-- 商品 -->
					<view class="order-item" v-for="(order, i) in tabItem.list" :key="i">
						<view class="item-header f-color">
							<view class="shop-name">小可爱商店</view>
							<view class="item-status f-active-color">{{ order.status }}</view>
						</view>
						<view class="item-content" v-for="(good, idx) in order.goods_item" :key="idx">
							<image class="item-img" :src="good.imgUrl" mode=""></image>
							<view class="item-detail f-color">
								<view class="item-name">
									<view class="name-text">{{ good.name }}</view>
									<view class="color">颜色分类：{{ good.attrs }}</view>
									<view class="f-active-color">七天无理由退换</view>
								</view>
								<view class="item-price-num">
									<view class="price">${{ good.pprice }}</view>
									<view class="num">x{{ good.num }}</view>
								</view>
							</view>
						</view>
						<!-- 总价 -->
						<view class="">
							<view class="total f-color">
								订单金额：
								<text class="f-active-color">${{ order.totalPrice }}</text>
								（含运费¥0.00）
							</view>
							<Lines></Lines>
						</view>
						<!-- 支付 -->
						<view class="checkout"><view class="checkout-text">支付</view></view>
					</view>
				</view>

				<view class="no-data" v-else>
					<view class="no-data-text f-color">您暂时没有订单哦～</view>
					<view class="go-home-page">去首页逛逛</view>
				</view>
			</view>
		</block>
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
			//顶部选项卡的数据
			tabList: [
				{
					name: '全部',
					list: [
						{
							status: '待付款',
							totalPrice: '3999.00',
							goods_item: [
								{
									imgUrl: '../../static/img/Children3.jpg',
									name: '大姨绒毛大款2020年必须买,不买你就不行了必须买',
									attrs: '黑色',
									pprice: '299.00',
									num: '1'
								},
								{
									imgUrl: '../../static/img/Children3.jpg',
									name: '大姨绒毛大款2020年必须买,不买你就不行了必须买',
									attrs: '黑色',
									pprice: '299.00',
									num: '5'
								}
							]
						},
						{
							status: '待付款',
							totalPrice: '3999.00',
							goods_item: [
								{
									imgUrl: '../../static/img/Children3.jpg',
									name: '大姨绒毛大款2020年必须买,不买你就不行了必须买',
									attrs: '黑色',
									pprice: '299.00',
									num: '1'
								},
								{
									imgUrl: '../../static/img/Children3.jpg',
									name: '大姨绒毛大款2020年必须买,不买你就不行了必须买',
									attrs: '黑色',
									pprice: '299.00',
									num: '5'
								}
							]
						},
					]
				},
				{
					name: '待付款',
					list: []
				},
				{
					name: '待发货',
					list: []
				},
				{
					name: '待收货',
					list: []
				},
				{
					name: '待评价',
					list: []
				}
			],
			// tabList: [
			// 	{ name: '全部', isActive: true },
			// 	{ name: '待付款', isActive: false },
			// 	{ name: '待发货', isActive: false },
			// 	{ name: '已收货', isActive: false },
			// 	{ name: '待评价', isActive: false }
			// ],
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
	/* background-color: #fff; */
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
	margin-bottom: 30rpx;
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
	background-color: #f7f7f7;
}
.item-detail {
	display: flex;
	flex: 1;
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
	flex: 1;
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
	border: 2rpx solid #49bdfb;
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
	border: 2rpx solid #49bdfb;
	color: #49bdfb;
	margin-top: 20rpx;
	border-radius: 50rpx;
}
</style>
