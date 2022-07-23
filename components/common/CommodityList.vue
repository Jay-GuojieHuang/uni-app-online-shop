<template>
	<view class="commodity-list">
		<Commodity :commodityList="dataList"/>
	</view>
</template>
	
<script>
	import Commodity from './Commodity.vue'
	export default {
		components:{
			Commodity
		},
		props:{
			dataList:{
				type: Array
			}
		}
		
	}
</script>

<style scoped>
	.commodity-list {
		text-align: center;
	}
</style>