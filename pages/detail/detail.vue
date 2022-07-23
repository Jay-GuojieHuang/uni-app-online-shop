<template>
	<view class="detail">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item, index) in swiperList" :key="index">
				<view class="swiper-item"><image class="swiper-img" :src="item.imgUrl" mode=""></image></view>
			</swiper-item>
		</swiper>

		<!-- 价格和名称 -->
		<view class="detail_goods f-color">
			<view class="price">
				<view class="pprice">$399.00</view>
				<view class="oprice">$599.00</view>
			</view>
			<view class="goods_name">大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008</view>
		</view>
		
		<!-- 商品详情图 -->
		<view class="">
			<view class="">
				<image class="detail-img" src="../../static/img/detail1.jpg" mode=""></image>
			</view>
			<view class="">
				<image class="detail-img" src="../../static/img/detail2.jpg" mode=""></image>
			</view>
			<view class="">
				<image class="detail-img" src="../../static/img/detail3.jpg" mode=""></image>
			</view>
			<view class="">
				<image class="detail-img" src="../../static/img/detail4.jpg" mode=""></image>
			</view>
			<view class="">
				<image class="detail-img" src="../../static/img/detail5.jpg" mode=""></image>
			</view>
		</view>
		
		<!-- 商品列表 -->
		<Card cardTitle="看了又看"></Card>
		<CommodityList :dataList = "dataList"></CommodityList>
		
		<!-- 底部 -->
		<view class="detail-foot">
			<view class="iconfont icon-xiaoxi">
				
			</view>
			<view class="iconfont icon-gouwuche">
				
			</view>
			<view class="add-cart">
				加入购物车
			</view>
			<view class="buy-now bg-color">
				立即购买
			</view>
		</view>
	</view>
</template>

<script>
	import Card from '@/components/common/Card.vue'
	import CommodityList from '@/components/common/CommodityList.vue'
export default {
	components:{
	   Card,
	   CommodityList
	},
	data() {
		return {
			swiperList: [{ imgUrl: '../../static/img/details1.jpeg' }, { imgUrl: '../../static/img/details2.jpeg' }, { imgUrl: '../../static/img/details3.jpeg' }],
			dataList:[{
							id: 1,
							imgUrl: "../../static/img/commodity1.jpg",
							name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
							pprice: "299",
							oprice: "659",
							discount: "5.2"
						},
						{
							id: 2,
							imgUrl: "../../static/img/commodity2.jpg",
							name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
							pprice: "299",
							oprice: "659",
							discount: "5.2"
						},
						{
							id: 3,
							imgUrl: "../../static/img/commodity3.jpg",
							name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
							pprice: "299",
							oprice: "659",
							discount: "5.2"
						},
						{
							id: 4,
							imgUrl: "../../static/img/commodity4.jpg",
							name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
							pprice: "299",
							oprice: "659",
							discount: "5.2"
						}
					]
		
		};
	},
	methods: {}
};
</script>

<style scoped>
swiper {
	width: 100%;
	height: 700rpx;
}

.swiper-img {
	width: 100%;
	height: 700rpx;
}

.detail {
	padding-bottom: 100rpx;
}

.detail_goods {
	text-align: center;
	font-weight: bold;
	font-weight: 36rpx;
	padding: 10rpx 10rpx;
	border-radius: 18rpx;
	margin: 50rpx 20rpx;
	box-shadow: 1px 1px 14px 4px rgb(0 0 0 /10%);
	
}
.price {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.pprice {
	font-weight: bold;
}

.oprice {
	text-decoration: line-through;
	margin-left: 10rpx;
	color: grey;
	
}

.goods_name {
	text-align: left;
	padding: 10rpx 10rpx;
}

.detail-img {
	height: 600rpx;
	width: 100%;
}

.detail-foot {
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 100rpx;
	background-color: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
}

.detail-foot .iconfont {
	width: 50rpx;
	height: 50rpx;
	border-radius: 100%;
	background-color: #000000;
	color:#fff;
	text-align: center;
	line-height: 50rpx;
	margin: 0 20rpx;
	font-size: 80%;
}


.add-cart {
	margin: 0 40rpx;
	padding: 6rpx 30rpx;
	background-color: #000000;
	color: #fff;
	border-radius: 40rpx;
		height: 40rpx;
}

.buy-now {
	/* margin: 0 40rpx; */
	padding: 6rpx 30rpx;
	/* background-color: #000000; */
	color: #fff;
	border-radius: 40rpx;
		height: 40rpx;
}
</style>
