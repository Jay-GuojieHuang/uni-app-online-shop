<template>
	<view class="shop">
		<view class="shop-items" v-for="shop,index in dataList" :key="index">
			<view class="shop-img-big">
				<image class="shop-img-big" :src="shop.bigUrl" mode=""></image>
			</view>
			<scroll-view scroll-x="true" class="scroll-content">
				<view class="scroll-item"><Commodity :commodityList="shop.data" itemWidth="200rpx" wrap="nowrap"></Commodity></view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import Commodity from './@/components/common/Commodity.vue';
export default {
	components: {
		Commodity
	},
	props:{
		dataList:{
			type:Array
		}
	}
	// data() {
	// 	return {
	// 		shopList: [
	// 			{
	// 				id: 1,
	// 				image: '../../static/img/shop1.jpg',
	// 				name: '1xxx衣服 超级大爆款 限时抢购 xxx衣服 超级大爆款 限时抢购',
	// 				oriPrice: '399',
	// 				curPrice: '299',
	// 				discount: '4.2'
	// 			},
	// 			{
	// 				id: 2,
	// 				image: '../../static/img/shop2.jpg',
	// 				name: '2xxx衣服 超级大爆款 限时抢购 xxx衣服 超级大爆款 限时抢购',
	// 				oriPrice: '399',
	// 				curPrice: '299',
	// 				discount: '8.2'
	// 			},
	// 			{
	// 				id: 3,
	// 				image: '../../static/img/shop3.jpg',
	// 				name: '3xxx衣服 超级大爆款 限时抢购 xxx衣服 超级大爆款 限时抢购',
	// 				oriPrice: '499',
	// 				curPrice: '299',
	// 				discount: '3.2'
	// 			},
	// 			{
	// 				id: 4,
	// 				image: '../../static/img/shop4.jpg',
	// 				name: '3xxx衣服 超级大爆款 限时抢购 xxx衣服 超级大爆款 限时抢购',
	// 				oriPrice: '499',
	// 				curPrice: '299',
	// 				discount: '3.2'
	// 			},
	// 			{
	// 				id: 5,
	// 				image: '../../static/img/shop4.jpg',
	// 				name: '3xxx衣服 超级大爆款 限时抢购 xxx衣服 超级大爆款 限时抢购',
	// 				oriPrice: '499',
	// 				curPrice: '299',
	// 				discount: '3.2'
	// 			},				{
	// 				id: 5,
	// 				image: '../../static/img/shop4.jpg',
	// 				name: '3xxx衣服 超级大爆款 限时抢购 xxx衣服 超级大爆款 限时抢购',
	// 				oriPrice: '499',
	// 				curPrice: '299',
	// 				discount: '3.2'
	// 			}
	// 		]
	// 	};
	// }
};
</script>

<style scoped>
.shop-img-big {
	width: 100%;
	height: 350rpx;
	/* margin-bottom: -10rpx; */
}
.scroll-content {
	width: 100%;
	white-space: nowrap;
	/* padding-bottom: var(--window-bottom); */
}
.scroll-item {
	display: inline-block;
	/* width: 300rpx; */
	/* height: 300rpx; */
	/* border: 1px solid red; */
}
</style>
