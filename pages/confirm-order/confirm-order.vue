<template>
	<view class="wrap" :style="`height: ${viewHomeHeight+50}px;`">
		<view class="confirm_order">
			<Lines></Lines>
			<!-- 收件人和地址栏 -->
			<view @tap="goAddressList">
				<view v-if="address" class="address-content f-color">
					<view class="recipient">
						<view class="name">收件人：{{ address.name }}</view>
						<view class="phone">{{ address.phone }}</view>
					</view>
					<view class="address">{{address.province}}{{ address.city }}{{address.district}}{{ address.address }}</view>
				</view>
				<view v-else class="address-content f-color">请点击设置默认地址</view>
				<Lines></Lines>
			</view>

			<!-- 商品 -->
			<view class="order-item">
				<view class="item-header f-color">
					<view class="shop-name">小可爱商店</view>
					<!-- <view class="item-status f-active-color">{{ order.status }}</view> -->
				</view>
				<view class="item-content" v-for="(good, idx) in goodsList" :key="idx">
					<image class="item-img" :src="good.imgUrl" mode=""></image>
					<view class="item-detail f-color">
						<view class="item-name">
							<view class="name-text">{{ good.name }}</view>
							<view class="color">颜色分类：黑色</view>
							<view class="f-active-color">七天无理由退换</view>
						</view>
						<view class="item-price-num">
							<view class="price">${{ good.price }}</view>
							<view class="num">x{{ good.count }}</view>
						</view>
					</view>
				</view>
				<!-- 运费 -->
				<view class="">
					<view class="shipmentFee f-color">
						<text>运费</text>
						<text>$0.00</text>
					</view>
				</view>
				<Lines></Lines>

				<view class="note">
					<text>留言：</text>
					<textarea value="" placeholder="给卖家留言,140字以内" class="f-color" auto-height="" />
				</view>
				<Lines></Lines>
				<!-- 合计 -->

				<view class="goods-total">
					<text>共{{ goodsList.length }}件商品</text>
					<text>小计：</text>
					<text class="f-active-color">$ {{totalCount.pprice}}</text>
				</view>
			</view>
		</view>

		<view class="confirm-order-footer">
			<view class="total-amount">
				<text>合计：</text>
				<text class="f-active-color">$ {{totalCount.pprice}}</text>
			</view>
			<view class="submit-btn" @tap="goPayment">提交订单</view>
		</view>
	</view>
</template>

<script>
import $http from '@/common/api/request.js'
import { mapGetters, mapState,mapMutations} from 'vuex';
import Lines from '@/components/common/Line.vue';
export default {
	components: {
		Lines
	},
	onReady() {
		//获取盒子高度

		uni.getSystemInfo({
			success: res => {
				// console.log(res);
				// this.viewHomeHeight = res.windowHeight - this.getClientHeight();
				this.viewHomeHeight = res.windowHeight;

				// this.statusBarHeight = res.statusBarHeight;
			}
		});
	},
	onLoad(e){
		this.__initAddress()
		
		 this.itemList = JSON.parse(e.detail)
		// console.log(this.cartList,e.detail);
		
		
		if(this.defaultAddress.length>0){
			this.address = this.defaultAddress[0]
		}
		
		uni.$on("selectAddress",res=>{
			this.address = res;
		})
	},
	onUnload(){
		uni.$off("selectAddress",()=>{
			console.log(事件已移除);
		})
	},
	data() {
		return {
			itemList:[],
			viewHomeHeight: 0,
			address:"",
			tabList: [
				{
					name: '全部',
					list: [
						{
							status: '待付款',
							totalPrice: '3999.00',
							goods_item: [
								{
									imgUrl: '../../static/img/Children3.jpg',
									name: '大姨绒毛大款2020年必须买,不买你就不行了必须买',
									attrs: '黑色',
									pprice: '299.00',
									num: '1'
								},
								{
									imgUrl: '../../static/img/Children3.jpg',
									name: '大姨绒毛大款2020年必须买,不买你就不行了必须买',
									attrs: '黑色',
									pprice: '299.00',
									num: '5'
								}
							]
						},
						{
							status: '待付款',
							totalPrice: '3999.00',
							goods_item: [
								{
									imgUrl: '../../static/img/Children3.jpg',
									name: '大姨绒毛大款2020年必须买,不买你就不行了必须买',
									attrs: '黑色',
									pprice: '299.00',
									num: '1'
								},
								{
									imgUrl: '../../static/img/Children3.jpg',
									name: '大姨绒毛大款2020年必须买,不买你就不行了必须买',
									attrs: '黑色',
									pprice: '299.00',
									num: '5'
								}
							]
						}
					]
				},
				{
					name: '待付款',
					list: []
				},
				{
					name: '待发货',
					list: []
				},
				{
					name: '待收货',
					list: []
				},
				{
					name: '待评价',
					list: []
				}
			]
		};
	},
	methods: {
		...mapMutations(['__init']),
		__initAddress(){
			$http.request({
				header:{
					token: true
				},
				url:'/getAddress',
				method:'post',
			}).then(res=>{
			
				console.log(res);
				this.__init(res)
				
			}).catch(()=>{
				uni.showToast({
					title: '请求失败',
					icon: 'error'
				})
				return
			})
		},
		goAddressList(){
			uni.navigateTo({
				url:'../user-address/user-address?type=selectAddress'
			})
		},
		goPayment(){
			if(this.address==''){
				return uni.showToast({
					title:'请选择收货地址',
					icon:'none'
				})
			}else{
				uni.navigateTo({
				url:"/pages/payment/payment"
			})
			}
			
			
		}
	},
	computed: {
		...mapState({
			cartList: state=>state.cart.cartList
		}),
		...mapGetters(['defaultAddress','totalCount']),
		goodsList(){
			return this.itemList.map(id=>{
				return this.cartList.find(i=>i.id==id);
			})
		}
	}
};
</script>

<style scoped>
.wrap {
	background-color: #f7f7f7;
}

.confirm_order {
	/* background-color: #f7f7f7; */
	/* width: 100%; */
	padding-bottom: 100rpx;
}

.address-content {
	display: flex;
	flex-direction: column;
	padding: 20rpx;
	background-color: #fff;
}

.recipient {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.address {
	padding-top: 20rpx;
}

.order-item {
	background-color: #fff;
	margin-bottom: 30rpx;
}

.item-header {
	width: 100%;
	height: 80rpx;
	padding: 20rpx 0;
	display: flex;
	justify-content: flex-start;
	align-items: center;
}

.shop-name {
	padding-left: 20rpx;
}

.item-content {
	padding: 20rpx;
	display: flex;
	background-color: #f7f7f7;
	margin-bottom: 20rpx;
}
.item-detail {
	display: flex;
	flex: 1;
	justify-content: space-between;
}
.item-name {
	display: flex;
	flex-direction: column;
	padding: 0 10rpx;
}
.name-text {
	height: 80rpx;
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
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
}
.item-img {
	width: 200rpx;
	height: 200rpx;
}

.shipmentFee {
	height: 80rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 20rpx;
}

.note {
	display: flex;
	min-height: 80rpx;
	padding: 20rpx 20rpx;
}

.goods-total {
	display: flex;
	justify-content: flex-end;
	align-items: center;
	height: 80rpx;
	padding: 0 20rpx;
}

.confirm-order-footer {
	position: fixed;
	/* z-index: 9999; */
	left: 0;
	bottom: 0;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	height: 125rpx;
	width: 100%;
	background-color: #fff;
}
.submit-btn {
	width: 200rpx;
	background-color: #49bdfb;
	height: 125rpx;
	text-align: center;
	line-height: 125rpx;
	margin-left: 20rpx;
	color: #fff;
}
</style>
