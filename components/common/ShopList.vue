<template>
	<view class="">
		<view class="shop_title f-color">
			<view class="shop-item" v-for="item,index in sortList.data" :key="index" @tap="changeTab(index)">
				<view :class=" sortList.currIndex === index?'f-active-color':''">{{item.name}}</view>
				<view class="shop-icon">
					<view class="iconfont icon-shangjiantou up" :class="item.status ===1? 'f-active-color' : ''"></view>
					<view class="iconfont icon-xiajiantou down"  :class="item.status ===2? 'f-active-color' : ''"></view>
				</view>
			</view>

		</view> 
		
		<Lines />
		<Commodity v-if="dataList.length >0" :commodityList="dataList"></Commodity>
		<view v-else class="no-data">
			<text class="no-data-text f-color">暂无数据</text>
		</view>
	</view>
</template>

<script>

	import $http from "@/common/api/request.js"
	import Lines from "@/components/common/Line.vue"
	import Commodity from "@/components/common/Commodity.vue"
	export default {
		components:{
			Lines,
			Commodity
		},
		props:{
			keyword:{
				type:String
			}
		},
		data(){
			return {
				sortList:{
					currIndex:0,
					data:[
						{name:'价格',status:1, key:'pprice'},
						{name:'折扣',status:0, key:'discount'},
						{name:'品牌',status:0},
					]
				},
				
				dataList:[],
				
			}
		},
		computed:{
				orderBy(){
					//拿到排序的是谁
					let obj = this.sortList.data[this.sortList.currIndex];
					let val = obj.status === 1 ? "desc" : "asc";
					return {
						[obj.key]:val
					}
				}
		},
		mounted() {
			console.log('mounted');
			this.getData();
		},
		methods:{
			getData(){
				$http.request({
						url: `/goods/search`,
						data:{
							name:this.keyword,
							// pprice:'desc'
							...this.orderBy
						}
					}).then(res => {
						console.log(res);
						this.dataList = res;
						// this.topBar = res.topBar;
						// this.newTopBar = this.initData(res);
					}).catch(() => {
						// console.log('请求失败！');
						uni.showToast({
							title: '请求失败',
							icon: 'none'
						});
					});
			},
			
			
			changeTab(index){
					this.getData();
				// this.sortList.data[this.sortList.currIndex].status = 0;
				//相同的排列种类
				if( this.sortList.currIndex === index){

					this.sortList.data[this.sortList.currIndex].status = this.sortList.data[this.sortList.currIndex].status == 1 ? 2 : 1;

				}else{
					//不相同的排列种类
					this.sortList.data[this.sortList.currIndex].status = 0;
					this.sortList.currIndex = index;
					this.sortList.data[index].status = this.sortList.data[index].status == 0 ? 1 :0;
				}

			// console.log(this.sortList.data[index].status );
					// this.getData();
			
			}
		}
	}
</script>

<style scoped>
	.shop_title {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 60rpx;
		/* justify-content: space-between; */
		
	}
	
	.shop-item {
		flex:1;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.shop-icon {
		/* flex:0; */
/* 		height: 60rpx;
		line-height: 60rpx; */
		/* position: relative; */
		margin-left: 10rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content:space-between;
		
	}
	.iconfont{
		width: 16rpx;
		height: 8rpx;
		margin-left: 10rpx;
		/* position: absolute; */
		left: 0;
	}
	.up {
		margin-top: -20rpx;
		margin-bottom: 10rpx;
	}
	
/* 	.down {
		top: -5rpx;
	} */
	.no-data{
		display: flex;
		justify-content: center;
		align-items: center;
		height: 700rpx;
	}
	.no-data-text {
		
		font-size: 30rpx;
	}
</style>
