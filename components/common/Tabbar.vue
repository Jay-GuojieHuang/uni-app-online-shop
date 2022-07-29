<template>
	<view class="tabbar">
		<view class="tabbar-content">
			<view class="tabbar-item"
			@tap="changeTab(item.pagePath)"
			 v-for="item,index in TabBarList" 
			 :key="index">
				<view class="icon">
					<image class="item-img" 
					:src="currentPage === item.pagePath ? item.selectedIconPath : item.iconPath" 
					mode=""></image>
				</view>
				<view class="text" :class="currentPage === item.pagePath ? 'f-active-color' : ''">
					{{item.text}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			currentPage:{
				type: String,
				default: 'index'
			}
		},
		data(){
			return {
					TabBarList: [{
						"pagePath": "index",
						"iconPath": "/static/tabbar/index.png",
						"selectedIconPath": "/static/tabbar/indexSelected.png",
						"text": "主页"
					}, {
						"pagePath": "list",
						"iconPath": "/static/tabbar/catergory.png",
						"selectedIconPath": "/static/tabbar/catergorySelected.png",
						"text": "分类"
					}, {
						"pagePath": "cart",
						"iconPath": "/static/tabbar/cart.png",
						"selectedIconPath": "/static/tabbar/cartSelected.png",
						"text": "购物车"
					}, {
						"pagePath": "me",
						"iconPath": "/static/tabbar/me.png",
						"selectedIconPath": "/static/tabbar/meSelected.png",
						"text": "我的"
					}]
			}
		},
		methods:{
			changeTab(pagePath) {
				// console.log(pagePath);
				// uni.redirectTo({
				// 	url:`../../pages/${pagePath}/${pagePath}`
				// })
				
				if( pagePath == "cart"){
					//需要验证是否登陆账号
					this.navigateTo({
						url:`../../pages/${pagePath}/${pagePath}`,
						animationType:"slide-in-right",
						animationDuration:0
						
					})
				}else{
					uni.navigateTo({
						url:`../../pages/${pagePath}/${pagePath}`,
						animationType:"slide-in-right",
						animationDuration:0
					})
				}
			}
		}
	}
</script>

<style scoped>
	.tabbar {
		z-index: 9999;
		width: 100%;
		height: 120rpx;
		padding-bottom: 20rpx;
		background-color: #fff;
		position: fixed;
		left: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: space-around;
		font-size: 18rpx;
		/* border-top: 1rpx solid #636263; */
	}
	
	.tabbar-content {
		flex: 1;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	
	.tabbar-item{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	
	.item-img {
		width: 40rpx;
		height: 40rpx;
	}
</style>