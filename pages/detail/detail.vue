<template>
	<view class="detail">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item>
				<view class="swiper-item"><image class="swiper-img" :src="goodsInfo.imgUrl" mode=""></image></view>
			</swiper-item>
		</swiper>

		<!-- 价格和名称 -->
		<view class="detail_goods f-color">
			<view class="price">
				<view class="pprice">${{ goodsInfo.pprice }}</view>
				<view class="oprice">${{ goodsInfo.oprice }}</view>
			</view>
			<view class="goods_name">{{ goodsInfo.name }}</view>
		</view>

		<!-- 商品详情图 -->
		<view class="">
			<view class=""><image class="detail-img" src="../../static/img/detail1.jpg" mode=""></image></view>
			<view class=""><image class="detail-img" src="../../static/img/detail2.jpg" mode=""></image></view>
			<view class=""><image class="detail-img" src="../../static/img/detail3.jpg" mode=""></image></view>
			<view class=""><image class="detail-img" src="../../static/img/detail4.jpg" mode=""></image></view>
			<view class=""><image class="detail-img" src="../../static/img/detail5.jpg" mode=""></image></view>
		</view>

		<!-- 商品列表 -->
		<Card cardTitle="看了又看"></Card>
		<CommodityList :dataList="dataList"></CommodityList>

		<!-- 底部 -->
		<view class="detail-foot">
			<view class="iconfont icon-xiaoxi"></view>
			<view class="iconfont icon-gouwuche" @tap="goCart"></view>
			<view class="add-cart" @tap="showPop">加入购物车</view>
			<view class="buy-now bg-color" @tap="buyNow">立即购买</view>
		</view>

		<!-- 底部弹出层 -->
		<view class="pop" v-show="isShow" @touchmove.stop.prevent="">
			<view class="pop-mask" @tap="hidePop"></view>
			<view class="pop-box" :animation="animationData">
				<view class=""><image class="pop-img" :src="goodsInfo.imgUrl" mode=""></image></view>
				<view class="">
					<view class="pop-number">
						<view class="">购买数量</view>
						<UniNumberBox :min="1" :value="count" @change="changeNumber"></UniNumberBox>
					</view>

					<view class="pop-sub" @tap="addToCart">确定</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>

import $http from '@/common/api/request.js';
import UniNumberBox from '@/components/uni/uni-number-box/uni-number-box.vue';
import Card from '@/components/common/Card.vue';
import CommodityList from '@/components/common/CommodityList.vue';
export default {
	components: {
		Card,
		CommodityList,
		UniNumberBox
	},
	onBackPress() {
		//返回键回调
		console.log(123);
	},
	onLoad(e) {
		// console.log(e);
		this.getData(e.id);
	},
	onNavigationBarButtonTap(e) {
		// console.log(e);
		let oldImgAdd = this.goodsInfo.imgUrl;
		let  newImgAdd = oldImgAdd.replace('../../','http://192.168.0.73:3000/');
		console.log(newImgAdd);
		if (e.type === 'share') {
			uni.share({
				"provider":"weixin",
				"type":0,
				"scene":"WXSceneSession",
				"title":this.goodsInfo.name,
				"href":`http://192.168.0.73:3000/#/pages/detail/detail?id=${this.goodsInfo.id}`,
				"imageUrl":newImgAdd,
				success:function(res){
					uni.showTabBar({
						title:'分享成功！'
					})
				},
				fail:function(){
					
				}
				
			});
		}
	},
	data() {
		return {
			swiperList: [{ imgUrl: '../../static/img/details1.jpeg' }, { imgUrl: '../../static/img/details2.jpeg' }, { imgUrl: '../../static/img/details3.jpeg' }],
			goodsInfo: {},
			dataList: [
				{
					id: 1,
					imgUrl: '../../static/img/commodity1.jpg',
					name: '大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008',
					pprice: '299',
					oprice: '659',
					discount: '5.2'
				},
				{
					id: 2,
					imgUrl: '../../static/img/commodity2.jpg',
					name: '大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008',
					pprice: '299',
					oprice: '659',
					discount: '5.2'
				},
				{
					id: 3,
					imgUrl: '../../static/img/commodity3.jpg',
					name: '大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008',
					pprice: '299',
					oprice: '659',
					discount: '5.2'
				},
				{
					id: 4,
					imgUrl: '../../static/img/commodity4.jpg',
					name: '大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008',
					pprice: '299',
					oprice: '659',
					discount: '5.2'
				}
			],
			isShow: false,
			animationData: {},
			count:1,
		};
	},
	methods: {
		getData(id) {
			$http
				.request({
					url: `/goods/id`,
					data: {
						id: id
					}
				})
				.then(res => {
					// console.log(res);
					this.goodsInfo = res[0];
				})
				.catch(() => {
					// console.log('请求失败！');
					uni.showToast({
						title: '请求失败',
						icon: 'none'
					});
				});
		},
		showPop() {
			var animation = uni.createAnimation({
				// 动画时间
				duration: 200,
				// 动画速度
				timingFunction: 'linear'
			});
			animation.translateY(1000).step();
			this.animationData = animation.export();

			setTimeout(() => {
				animation.translateY(0).step();
				this.animationData = animation.export();
				this.isShow = true;
			}, 200);
		},
		hidePop() {
			var animation = uni.createAnimation({
				// 动画时间
				duration: 1000,
				// 动画速度
				timingFunction: 'linear'
			});
			animation.translateY(1000).step();
			this.animationData = animation.export();

			setTimeout(() => {
				animation.translateY(0).step();
				this.animationData = animation.export();
				this.isShow = false;
			}, 200);
		},
		// addToCart() {
		// 	this.showPop();
		// },
		buyNow() {
			this.showPop();
		},
		// changeNumber
		changeNumber(e){
			this.count = e;
		},
		goCart(){
			uni.redirectTo({
				url:'../cart/cart'
			})
		},
		addToCart(){
				// console.log(this.goodsInfo);
				
				$http.request({
					header: {
						'token': true
					},
					url:'/addToCart',
					method:'POST',
					data:{
						goods_id:this.goodsInfo.id,
						count: this.count
					},
					
				}).then(res=>{
					// this.goodsInfo = res[0]
					if(res.success){
						uni.showToast({
							title: '操作成功',
							icon: 'success'
						})
						this.hidePop();
					}
				}).catch(()=>{
					uni.showToast({
						title: '请求失败',
						icon: 'error'
					})
					this.hidePop();
					return
				})
				
	
	
			// this.$set(this.goodsInfo,"checked",false);
			// this.$set(this.goodsInfo,"count",this.count);
			// this.$store.dispatch("ADDTOCART",this.goodsInfo);
			// this.hidePop();
			// uni.showToast({
			// 	title:"成功加入购物车！"
			// })
			
		}
	}
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
	height: 150rpx;
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
	color: #fff;
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

.pop {
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	z-index: 9999;
}

.pop-mask {
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.3);
}

.pop-box {
	position: absolute;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 50%;
	background-color: #fff;
}

.pop-img {
	height: 260rpx;
	width: 260rpx;
}

.pop-sub {
	line-height: 80rpx;
	background-color: #49bdfb;
	color: #fff;
	height: 80rpx;
	width: 600prx;
	border-radius: 2px;
	text-align: center;
	margin: 10rpx 20rpx;
}

.pop-number {
	padding: 50rpx;
	display: flex;
	justify-content: space-between;
}
</style>
