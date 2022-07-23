<template>
	<view>
		<Lines></Lines>
		<view class="list">
			<!-- 左侧滑动 -->
			<scroll-view scroll-y="true" class="list-left" :style="`height: ${viewHomeHeight}px;`">
				<view v-for="item in leftdata" :key="item.id" class="left-item" @tap="changeTab(item.id)">
					<view class="left-name" :class="currLeftIndex === item.id ? 'left-name-active' : ''">{{ item.name }}</view>
				</view>
			</scroll-view>
			<!-- 右侧滑动 -->
			<scroll-view scroll-y="true" class="list-right" :style="`height: ${viewHomeHeight}px;`">
				<view class="right-list" v-for="(item, index) in rightData" :key="index">
					<block v-for="k,i in item" :key="i">
						<view class="list-title">{{k.name}}</view>
						<view class="right-content">
							<view class="right-item" v-for="(j,idx) in k.list" :key="idx">
								<image class="right-item-img" :src="j.imgUrl" mode=""></image>
								<view class="right-item-name">{{j.name}}</view>
							</view>
						</view>
					</block>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import $http from '@/common/api/request.js';
import Lines from '@/components/common/Line.vue';
export default {
	components: {
		Lines
	},
	onNavigationBarSearchInputClicked() {
		uni.navigateTo({
			url: '../search/search'
		});
	},
	onLoad() {
		this.getData();
	},
	onReady() {
		uni.getSystemInfo({
			success: res => {
				// console.log(res);
				// this.viewHomeHeight = res.windowHeight - this.getClientHeight();
				this.viewHomeHeight = res.windowHeight;
			}
		});
	},
	data() {
		return {
			viewHomeHeight: 0,
			currLeftIndex: 1,
			leftdata: [],
			rightData: []
		};
	},
	methods: {
		changeTab(i) {
			this.currLeftIndex = i;
			this.getData(i);
		},
		getData(i) {
			if (i === this.currLeftIndex + 1) {
				return;
			}
			$http
				.request({
					url: `/goods/list`
				})
				.then(res => {
					// console.log(res);
					let leftData = [];
					let rightData = [];
					res.forEach(item => {
						leftData.push({
							id: item.id,
							name: item.name
						});
						if (item.id === this.currLeftIndex + 1) {
							// alert(123)
							rightData.push(item.data);
						}
					});

					this.leftdata = leftData;
					this.rightData = rightData;
					// console.log(this.rightData);
				})
				.catch(() => {
					// console.log('请求失败！');
					uni.showToast({
						title: '请求失败',
						icon: 'none'
					});
				});
		}
	}
};
</script>

<style scoped>
.list {
	display: flex;
}

.list-left {
	width: 200rpx;
}

.list-right {
	flex: 1;
	padding-left: 30rpx;
}

.left-item {
	border-bottom: 2rpx solid #ffffff;
	font-size: 28rpx;
	background-color: #f7f7f7;
	font-weight: bold;
}

.left-name {
	padding: 30rpx 6rpx;
	text-align: center;
}

.left-name-active {
	border-left: 15rpx solid #42b7fb;
	background-color: #ffffff;
}

.list-title {
	font-weight: bold;
	padding: 30rpx 0;
}

.right-content {
	display: flex;
	flex-wrap: wrap;
}

.right-item-img {
	width: 150rpx;
	height: 150rpx;
}

.right-item-name {
	padding: 15rpx 0;
	text-align: center;
}
.right-item {
	width: 150rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 10rpx;
}
</style>
