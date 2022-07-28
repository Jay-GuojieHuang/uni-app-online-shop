<template>
	<view class="address-management">
		<view class="address-list">
			<view @tap="toEditAddress(index)" class="list-item f-color" v-for="(item, index) in list" :key="index">
				<view @tap="goConfirmOrder(item)">
					<view class="person-detail">
						<view class="recipient">{{ item.name }}</view>
						<view class="phone">{{ item.tel }}</view>
					</view>
					<view class="address">
						<view v-if="item.isDefault" class="defalut bg-color">默认</view>
						{{ item.city }}{{ item.address }}
					</view>
				</view>
			</view>
		</view>
		<view class="add-address"><view class="add-address-btn bg-color" @tap="goAddAddress">新增地址</view></view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
export default {
	onLoad(e) {
		if (e.type === 'selectAddress') {
			// console.log(123);
			this.isFromConfirmOrder = true;
		}
	},
	data() {
		return {
			isFromConfirmOrder: false
		};
	},
	computed: {
		...mapState({
			list: state => state.address.list
		})
	},
	methods: {
		goAddAddress() {
			uni.navigateTo({
				url: '/pages/add-new-address/add-new-address'
			});
		},
		toEditAddress(index) {
			if (!this.isFromConfirmOrder) {
				let addressObj = JSON.stringify({
					index: index,
					item: this.list[index]
				});
				uni.navigateTo({
					url: `/pages/add-new-address/add-new-address?data=${addressObj}`
				});
			}
		},
		goConfirmOrder(item) {
			if (this.isFromConfirmOrder) {
				// this.isFromConfirmOrder = false;
				uni.$emit("selectAddress",item)
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
};
</script>

<style scoped>
.add-address {
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 20rpx;
}
.add-address-btn {
	border-radius: 30rpx;
	padding: 10rpx 20rpx;
	color: #fff;
	width: 200rpx;
	text-align: center;
}

.list-item {
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 20rpx;
	border-bottom: 2rpx solid #f3f2f3;
}

.person-detail {
	display: flex;
	align-items: center;
	justify-content: flex-start;
	padding-bottom: 10rpx;
}

.recipient {
	padding-right: 10rpx;
}

.defalut {
	width: 80rpx;
	display: inline-block;
	text-align: center;
	color: #fff;
	border-radius: 40rpx;
	margin-right: 10rpx;
	padding: 5rpx;
}
</style>
