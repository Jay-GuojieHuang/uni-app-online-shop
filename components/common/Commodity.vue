<template>
	<view class="commodity" :style="`flex-wrap: ${wrap}`">
		
		<view @tap="goDetail" v-for="item in commodityList" :key="item.id" class="commodity-item" :style="`width: ${itemWidth}`"><!-- 单个商品组件 -->
			<image class="commodity-img" :style="`height:${itemWidth}`" :src="item.imgUrl" mode=""></image>
			<view class="commodity-content">
				<!-- 放置价格折扣 -->
				<text class="commodity-name">{{item.name}}</text>
				<view class="">
					<text class="cur-price">${{item.pprice}}</text>
					<text class="ori-price">${{item.oprice}}</text>
				</view>
				<view class=""><text class="discount">{{item.discount}}折</text></view>
			</view>
		</view>

			
	</view>
	
	
</template>

<script>
	export default {
		props:{
			commodityList : Array,
			itemWidth:{
				type: String,
				default: '375rpx'
			},
			wrap:{
				type: String,
				default: 'wrap'
			}
		},
		methods:{
			goDetail(){
				uni.navigateTo({
					url:'../../pages/detail/detail'
				})
			}
		}
	}
</script>

<style scoped>
.commodity {
	display: flex;
	/* flex-wrap: wrap; */
	/* justify-content: space-around; */
	width: 100%;
}

.commodity-item {
	/* width: 375rpx; */
	padding-bottom: 20rpx;
	/* flex: 1 1 auto; */
	/* overflow: hidden; */

}
.commodity-img {
	width: 100%;
	height: 375rpx;
}
.commodity-name {
	height: 80rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	color: #333333;
	word-break: break-all;
	padding: 5rpx 20rpx;
}
.commodity-content {
	justify-content: center;
	align-items: center;
	text-align: center;
}
.ori-price {
	text-decoration: line-through;
	font-size: 24rpx;
	margin-left: 10rpx;
	color: grey;
}

.discount {
	border-radius: 4rpx;
	border: 1px solid red;
	padding: 2rpx 10rpx;
	font-size: 20rpx;
	color: #FF3333
}
</style>
