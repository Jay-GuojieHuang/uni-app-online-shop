<template>
	<view class="" >
		<Commodity :commodityList="dataList" itemWidth="250rpx"></Commodity>
	</view>
</template>

<script>
import Commodity from '../common/Commodity.vue'
export default {
	components:{
		Commodity
	},
	// onShow(){
	// 	console.log(this.hotList);
	// },
	props:{
		dataList:{
			type: Array
		}
	}
	// data(){
	// 	return{
	// 		hotList:[
	// 			{
	// 				id: 1,
	// 				image: '../../static/img/hot1.jpg',
	// 				name: '1xxx衣服 超级大爆款 限时抢购 xxx衣服 超级大爆款 限时抢购',
	// 				oriPrice: '399',
	// 				curPrice: '299',
	// 				discount: '4.2'
					
	// 			},
	// 			{
	// 				id: 2,
	// 				image: '../../static/img/hot2.jpg',
	// 				name: '2xxx衣服 超级大爆款 限时抢购 xxx衣服 超级大爆款 限时抢购',
	// 				oriPrice: '399',
	// 				curPrice: '299',
	// 				discount: '8.2'
					
	// 			},
	// 			{
	// 				id: 3,
	// 				image: '../../static/img/hot3.jpg',
	// 				name: '3xxx衣服 超级大爆款 限时抢购 xxx衣服 超级大爆款 限时抢购',
	// 				oriPrice: '499',
	// 				curPrice: '299',
	// 				discount: '3.2'
					
	// 			}
	// 		]
	// 	}
	// }
}
</script>

<style>
</style>