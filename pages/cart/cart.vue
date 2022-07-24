<template>
	<view class="cart">
		<!-- 自定义导航栏 -->
		<uniNaviBar title="购物车" :right-text="isEditOrConfirm ? '完成' : '编辑'" statusBar="true" @clickRight="isEditOrConfirm = !isEditOrConfirm"></uniNaviBar>

		<!-- 商品内容 -->
		<view class="cart-list" v-for="item,index in itemList" :key="item.id">
			<view class="cart-item">
				<label class="radio">
					<radio value="" color="#42B7FB" :checked="item.checked"/>
					<text></text>
				</label>
				<image class="item-img" :src="item.imgUrl" mode=""></image>
				<view class=" item-right f-color">
					<view class="item-name">{{item.name}}</view>
					<view class="">颜色：{{item.color}} </view>
					<view class="item-price-num">
						<view class="">${{item.price}}</view>
						<view class="">x{{item.count}}</view>
					</view>
				</view>
			</view>
			
			<!-- 底部 -->
			<view class="cart-footer f-color">
			
					<label class="radio select-all" >
						<radio value="" color="#42B7FB" /><text>全选</text>
					</label>
			
				<view class="cart-total">
					<view class="cart-count">合计$0</view>
					<view class="cart-checkout">结算(0)</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import uniNaviBar from '@/components/uni/uni-nav-bar/uni-nav-bar.vue';
export default {
	components: {
		uniNaviBar
	},
	data() {
		return {
			isEditOrConfirm: false,
			itemList:[
				{
					id:	1,
					name:'大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了',
					color:'黑色',
					imgUrl:'../../static/img/Children1.jpg',
					price:'212',
					count:'1',
					checked:false
				},
				{
					id:	2,
					name:'大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了',
					color:'黑色',
					imgUrl:'../../static/img/Children2.jpg',
					price:'212',
					count:'1',
					checked:true
				},
				{
					id:	3,
					name:'大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了',
					color:'黑色',
					imgUrl:'../../static/img/Children3.jpg',
					price:'212',
					count:'1',
					checked:true 
				}
			]
		};
	},
	methods: {}
};
</script>

<style scoped>
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
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 100rpx;
	margin-bottom: 100rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	
	border-top: 2rpx solid #F7F7F7 ;
}

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
	background-color: #42B7FB;
	color: #FFFFFF;
	padding: 0 60rpx;
	line-height: 100rpx;
}
</style>
