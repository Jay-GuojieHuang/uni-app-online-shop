<template>
	<view class="cart">
		<template v-if="cartList.length > 0">
			<!-- 自定义导航栏 -->
			<uniNaviBar title="购物车" :right-text="isEditOrConfirm ? '完成' : '编辑'" statusBar="true" @clickRight="isEditOrConfirm = !isEditOrConfirm"></uniNaviBar>

			<!-- 商品内容 -->
			<view class="cart-list"  :style="`height: ${viewHomeHeight + 400}px;`">
				<view class="cart-item" v-for="(item, index) in cartList" :key="item.id">
					<label class="radio" @tap="CHANGESELECT(item.id)">
						<radio value="" color="#42B7FB" :checked="item.checked" />
						<text></text>
					</label>
					<image class="item-img" :src="item.imgUrl" mode=""></image>
					<view class=" item-right f-color">
						<view class="item-name">{{ item.name }}</view>
						<view class="">颜色：{{ item.color }}</view>
						<view class="item-price-num">
							<view class="">${{ item.price }}</view>
							<template v-if="!isEditOrConfirm">
								<view class="">x{{ item.count }}</view>
							</template>
							<template v-else>
								<uniNumberBox @change="changeNum($event, index, item)" :min="1" :value="item.count"></uniNumberBox>
							</template>
						</view>
					</view>
				</view>
			</view>
		</template>
		<template v-else>
			<!-- 自定义导航栏 -->
			<uniNaviBar title="购物车" statusBar="true" height="120px"></uniNaviBar>
			<view class="cart-empty f-color">购物车空空如也～</view>
		</template>

		<!-- 底部 -->
		<view class="cart-footer f-color">
			<label class="radio select-all" @tap="CHECKEDALL">
				<radio value="" color="#42B7FB" :checked="checkedAll" />
				<text>全选</text>
			</label>

			
			<template v-if="!isEditOrConfirm">
				<view class="cart-total">
					<view class="cart-count">
						合计
						<text class="f-active-color count-text">${{ totalCount.pprice }}</text>
					</view>
					<view class="cart-checkout" @tap="goConfirmOrder">结算({{ totalCount.num }})</view>
				</view>
			</template>
			<template v-else>
				<view class="cart-total">
					<view class="cart-count" style="background-color: #000000;">
						<text class="count-text " style="color: #fff;">移入收藏夹</text>
					</view>
					<view class="cart-checkout" @tap="DELGOODS">删除({{ totalCount.num }})</view>
				</view>
			</template>
		</view>
		<TabBar currentPage="cart"></TabBar>
	</view>
</template>

<script>
import $http from '@/common/api/request.js'
import TabBar from '@/components/common/Tabbar.vue'
import uniNumberBox from '@/components/uni/uni-number-box/uni-number-box.vue';
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
import uniNaviBar from '@/components/uni/uni-nav-bar/uni-nav-bar.vue';
export default {
	components: {
		uniNaviBar,
		uniNumberBox,
		TabBar
	},
	onShow() {
		this.getData();
		console.log('shiow');
	this.initCheckedList();
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
	data() {
		return {
			isEditOrConfirm: false,
			viewHomeHeight:0
		
		};
	},
	mounted() {
		this.initCheckedList();
	},
	methods: {
		...mapActions(['initCheckedList', 'CHECKEDALL', 'CHANGESELECT','DELGOODS',"INITGETDATAFROMDB"]),
		...mapMutations(['initOrder']),
		changeNum(e, index, item) {
			console.log(index);
			$http.request({
					header: {
						token: true
					},
					url: '/updateNumberCart',
					method: 'post',
					data:{
						goodsId: item.goods_id,
						count: e
					}
				})
				.then(res => {
					console.log(res);

				this.cartList[index].count = e;
					
				})
				.catch(() => {
					uni.showToast({
						title: '请求失败',
						icon: 'error'
					});
					return;
				});
			
			
		},
		goConfirmOrder(){
			//跳转付款前先检查是否选中商品
			if(this.checkedList.length>0){
				// console.log(this.checkedList);
				let orderItemList =[];
				this.cartList.forEach(item=>{
					this.checkedList.filter(i=>{
						if(i === item.id){
							orderItemList.push(item)
						}
					})
				})
				// console.log(newList);
				$http.request({
						header: {
							token: true
						},
						url: '/addOrder',
						method: 'post',
						data:{
							orderItemList
						}
					})
					.then(res => {
						this.initOrder(res.data[0].order_id)
						if(res.success){
							uni.navigateTo({
								url:`/pages/confirm-order/confirm-order?detail=${JSON.stringify(this.checkedList)}`
							})
						}
						
						// console.log(res.data[0]);
				
			
					})
					.catch(() => {
						uni.showToast({
							title: '请求失败',
							icon: 'error'
						});
						return;
					});
				
				
				
				
				
			}else{
				return uni.showToast({
					title:'请选择商品',
					icon:'error'
				})
			}
			
		},
		getData(){
			$http.request({
					header: {
						token: true
					},
					url: '/getcart',
					method: 'post',
				})
				.then(res => {
					console.log(res);
					// if(res) res = []
					this.INITGETDATAFROMDB(res);
					
				})
				.catch(() => {
					uni.showToast({
						title: '请求失败',
						icon: 'error'
					});
					return;
				});
		}
	},
	computed: {
		...mapState({
			cartList: state => state.cart.cartList,
			checkedList: state=>state.cart.checkedList
		}),
		...mapGetters(['checkedAll', 'totalCount'])
	}
};
</script>

<style scoped>
.cart-list {
	padding-bottom: 100rpx;
}
.cart-item {
	display: flex;
	padding: 20rpx;
	align-items: center;
	background-color: #f7f7f7;
	/* flex-wrap: wrap; */
	margin-bottom: 10rpx;
}

.item-img {
	width: 200rpx;
	height: 200rpx;
}

.item-name {
	height: 90rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	color: #333333;
	word-break: break-all;
	/* padding: 5rpx 20rpx; */
}

.item-price-num {
	display: flex;
	justify-content: space-between;
}

.item-right {
	flex: 1;
	padding: 0 10rpx;
}

.cart-footer {
	z-index: 9999;
	position: fixed;
	bottom: 125rpx;
	left: 0;
	width: 100%;
	height: 100rpx;
	/* margin-bottom: 200rpx; */
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 32rpx;
	border-top: 2rpx solid #f7f7f7;
	background-color: #fff;
}

/* #ifdef MP-WEIXIN || APP-PLUS*/
.cart-footer {
	margin-bottom: 0rpx;
}
/* #endif */

.cart-total {
	display: flex;

	/* 	padding-right: 20rpx; */
}

.select-all {
	padding-left: 20rpx;
}

.cart-count {
	height: 100%;
	border: ;
	line-height: 100rpx;
	padding: 0 60rpx;
}

.cart-checkout {
	background-color: #42b7fb;
	color: #ffffff;
	padding: 0 60rpx;
	line-height: 100rpx;
}

.count-text {
	margin-left: 10rpx;
}

.cart-empty {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 900rpx;
}
</style>
