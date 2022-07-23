<template>
	<view class="recommand">
		<view class="recommand-items" v-for="(item, index) in dataList" :key="index">
			<image class="item-big" :src="item.bigUrl" mode=""></image>
			<view class="item-small">
				<image v-for="(k,i) in item.data" :key="i" class="item-img" :src="k.imgUrl" mode=""></image>
			</view>
		</view>
	
	</view>
</template>

<script>
	export default {
		props:{
			dataList:{
				type: Array
			}
		}
	}
</script>

<style scoped> 
	.recommand {
		padding: 20rpx;
	}
	.recommand-items {
		display: flex;
		flex-direction: column;
		border-radius: 18rpx;
		/* border:  2rpx solid #CCCCCC; */
		overflow: hidden;
		margin: 20rpx 0;
		box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
	}
	.item-big {
		width: 100%;
		height: 300rpx;
	}
	.item-small {
		display: flex;
		/* float: left; */
		/* justify-content: space-around; */
		width: 100%;
		height: 240rpx;
		font-size: 0;
	}
	.item-img {
		width: 100%;
		height: 240rpx;
		/* justify-content: space-around; */
	}
</style>
