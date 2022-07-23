<template>
	<view class="card">
		<view class=""></view>
		<slot>
			<view class="card-name">- {{cardTitle}} -</view>
		</slot>
		
		<view class=""></view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {},
	props:{
		cardTitle: String
	}
};
</script>

<style scoped>
	.card {
		padding: 20rpx 0;
		display: flex;
		justify-content: center;
		font-weight: bold;
	}
</style>
