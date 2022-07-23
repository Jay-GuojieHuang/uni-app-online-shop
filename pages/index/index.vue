<template>
	<view class="index">
		
		<!-- #ifdef MP-WEIXIN -->

		<view class="wx-nav">
			<view class="iconfont icon-Magnifier" @tap="navigateToSearch"></view>
			<text class="wx-text">百年奥莱1</text>
			<view class="space"></view>
		</view>
		<!-- #endif -->

		<scroll-view scroll-x="true" class="topbar-content" :scroll-into-view="scrollIntoIndex">
			<view class="topbar-item" v-for="(item, index) in topBar" :key="index">
				<text :id="`top${index}`" @tap="changeTap(index)" :class="topBarIndex === index ? 'f-active-color' : 'f-color'">{{ item.name }}</text>
			</view>
		</scroll-view>

		<swiper @change="onChangeTab" :current="topBarIndex" :style="`height: ${viewHomeHeight}px;`">
			<swiper-item v-for="(item, index) in newTopBar" :key="index">
				<!-- 	<view>{{item.name}}</view> -->
				<!-- 推荐模版 -->
				<scroll-view scroll-y="true" :style="`height: ${viewHomeHeight}px; overflow: scroll;`" @scrolltolower="loadMore(index)">
					<block v-if="item.data.length > 0">
						<block v-for="(k, i) in item.data" :key="i">
							<IndexSwiper v-if="k.type === 'swiperList'" :dataList="k.data"></IndexSwiper>
							<template v-if="k.type === 'recommendList'">
								<Recommand :dataList="k.data"></Recommand>
								<card cardTitle="猜你喜欢"></card>
							</template>

							<!-- 其他模版 -->
							<Banner v-if="k.type === 'bannerList'" :dataList="k.imgUrl"></Banner>

							<template v-if="k.type === 'iconsList'">
								<icons :dataList="k.data"></icons>
								<card cardTitle="热销爆品"></card>
							</template>

							<template v-if="k.type === 'hotList'">
								<Hot :dataList="k.data"></Hot>
								<card cardTitle="推荐店铺"></card>
							</template>

							<template v-if="k.type === 'shopList'">
								<Shop :dataList="k.data"></Shop>
								<card cardTitle="为您推荐"></card>
							</template>

							<CommodityList v-if="k.type === 'commodityList'" :dataList="k.data"></CommodityList>
						</block>
					</block>
					<view v-else>暂无数据</view>
					<view class="load-text">{{ item.loadText }}</view>
				</scroll-view>
				<!-- <view class="view-home"> -->

				<!-- </view> -->
			</swiper-item>
		</swiper>

		<!-- 推荐模版 -->
		<!-- 		<IndexSwiper></IndexSwiper>
		<Recommand></Recommand>
		<card cardTitle="猜你喜欢"></card>
		<CommodityList></CommodityList>
		<card cardTitle="商品店铺"></card>
		<card cardTitle="运动户外"></card>
		<card cardTitle="猜你喜欢"></card> -->

		<!-- 其他模版 -->
		<!-- 		<Banner></Banner>
		<icons></icons>
		<card cardTitle="热销爆品"></card>
		<Hot></Hot>
		<card cardTitle="推荐店铺"></card>
		<Shop></Shop>
		<card cardTitle="为您推荐"></card>
		<CommodityList></CommodityList> -->
	</view>
</template>

<script>
import IndexSwiper from '@/components/index/indexSwiper.vue';
import Recommand from '@/components/index/Recommand.vue';
import Card from '@/components/common/Card.vue';
import CommodityList from '@/components/common/CommodityList.vue';
import Banner from '@/components/index/Banner.vue';
import Icons from '@/components/index/Icons.vue';
import Hot from '@/components/index/Hot.vue';
import Shop from '@/components/index/Shop.vue';

import $http from '@/common/api/request.js';
export default {
	components: {
		IndexSwiper,
		Recommand,
		Card,
		CommodityList,
		Banner,
		Icons,
		Hot,
		Shop
	},
	data() {
		return {
			// 选中的索引
			topBarIndex: 0,
			//跟随的topbar标签的索引值,
			scrollIntoIndex: 'top0',
			topBar: [],
			newTopBar: [], //用来装新数据
			//内容块的高度值
			viewHomeHeight: 0
		};
	},
	onLoad() {
		this.__init();
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
			}
		});
	},
	// 标题栏按钮点击
	onNavigationBarButtonTap(e) {
		if (e.index == 0) {
			//左边
			uni.navigateTo({
				url: '../search/search'
			});
		}
	},
	methods: {
		__init() {
			//请求后端数据
			// uni.request({
			// 	url: 'http://127.0.0.1:3000/api/index_list/data',
			// 	method: 'GET',
			// 	success: res => {
			// 		// console.log(res.data.data);
			// 		let data = res.data.data;
			// 		this.topBar = data.topBar;
			// 		this.newTopBar = this.initData(data);
			// 		// console.log(JSON.stringify(this.initData(data)));
			// 	}
			// });

			$http.request({
					url: '/index_list/data'
				})
				.then(res => {
					// console.log(res);
					this.topBar = res.topBar;
					this.newTopBar = this.initData(res);
				})
				.catch(() => {
					// console.log('请求失败！');
					uni.showToast({
						title: '请求失败',
						icon: 'none'
					});
				});
		},
		initData(data) {
			let arr = [];
			// let obj = {
			// 	data:[]
			// }
			for (let i = 0; i < this.topBar.length; i++) {
				let obj = {
					data: [],
					load: 'first',
					loadText: '上拉加载更多。。。',
					page: 0
				};
				if (i == 0) {
					// 首次获取数据
					obj.data = data.data;
					// console.log(obj.data);
				}
				arr.push(obj);
				console.log(arr);
			}
			return arr;
		},
		changeTap(index) {
			if (this.topBarIndex === index) {
				return;
			} else {
				this.topBarIndex = index;
				this.scrollIntoIndex = `top${index}`;

				if (this.newTopBar[this.topBarIndex].load === 'first') {
					this.addData();
				}
			}
		},
		onChangeTab(e) {
			// console.log(detail.source);
			this.topBarIndex = e.detail.current;
			this.scrollIntoIndex = `top${e.detail.current}`;
			// this.addData();
		},
		//获取可视区域的高度兼容
		getClientHeight() {
			const res = uni.getSystemInfoSync();
			console.log(res.statusBarHeight);
			const system = res.platform;
			if (system === 'ios') {
				return 44 + res.statusBarHeight;
			} else if (system === 'android') {
				return 48 + res.statusBarHeight;
			} else {
				return 0;
			}
		},
		addData(callback) {
			let index = this.topBarIndex;
			let id = this.topBar[index].id;

			// console.log(this.newTopBar[index].data.length/5);
			// let page =Math.ceil(this.newTopBar[index].data.length/5)+1
			let page = this.newTopBar[index].page + 1;
			this.newTopBar[index].page++;
			// 请求不同的数据
			console.log(page);
			// uni.request({
			// 	url: `http://127.0.0.1:3000/api/index_list/${id}/data/${page}`,
			// 	success: res => {
			// 		if (res.statusCode !== 200) {
			// 			this.newTopBar[index].loadText = '已触底';
			// 			return;
			// 		} else {
			// 			let data = res.data.data;
			// 			// console.log(data);
			// 			this.newTopBar[index].data = [...this.newTopBar[index].data, ...data];
			// 		}
			// 	}
			// });
			$http.request({
					url: `/index_list/${id}/data/${page}`
				})
				.then(res => {
					this.newTopBar[index].data = [...this.newTopBar[index].data, ...res];
					console.log(res);
				})
				.catch(() => {
					this.newTopBar[index].loadText = '已触底';
				});

			this.newTopBar[index].load = 'last'; //标记已经浏览过
			if (typeof callback === 'function') {
				callback();
			}
			// console.log(this.newTopBar[index].load);
		},
		//上拉加载回调
		loadMore(index) {
			// console.log(index);
			this.newTopBar[index].loadText = '加载中。。。';
			this.addData(() => {
				this.newTopBar[index].loadText = '上拉加载更多。。。';
			});
		},
		navigateToSearch(){
			// console.log(123);
			uni.navigateTo({
				url: '../search/search'
			});
		}
	}
};
</script>

<style>
/* #ifdef MP-WEIXIN */
.wx-nav {
	height: 150rpx;
	width: 100%;
	/* line-height: 200rpx; */
	text-align: center;
	display: flex;
	/* align-items: center; */
	justify-content: space-between;
	align-items: flex-end;
}
.wx-text {
	flex-grow: 1;
}
.iconfont {
	/* float: left; */
	flex-grow: 0;
	font-size: 18px;
}
.space {
	flex-grow: 0;
	width: 18px;
}
/* #endif */

/* #ifdef MP-WEIXIN || APP-PLUS */
::-webkit-scrollbar {
	display: none;
	width: 0 !important;
	height: 0 !important;
	-webkit-appearance: none;
	background: transparent;
}
/* #endif */

.topbar-content {
	width: 100%;
	height: 80rpx;
	white-space: nowrap;
	/* background-color: grey; */
}

.topbar-item {
	display: inline-block;
	margin: 10rpx 30rpx;
	font-size: 30rpx;
	text-align: center;
	line-height: 80rpx;
}

.f-active-color {
	/* padding:  10rpx 0; */
	border-bottom: 5rpx solid #49bdfb;
}

.load-text {
	/* border-top: 2rpx solid #636263; */
	line-height: 60rpx;
	text-align: center;
	color: #49bdfb;
}
</style>
