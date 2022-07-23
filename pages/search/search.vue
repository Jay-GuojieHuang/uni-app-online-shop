<template>
	<view class="search">
		<Lines></Lines>
		<view class="search-item" v-if="searchedKeywords.length > 0">
			<view class="search-title">
				<view class="f-color">最近搜索</view>
				<view class="iconfont icon-lajitong" @tap="clearHistory"></view>
			</view>
			<view class="">
				<view v-for="(item, index) in searchedKeywords" :key="index" class="searched-word f-color" @tap="toSearchList(item)">{{ item }}</view>
			</view>
		</view>
		<view v-else class="none-searched-words"><text class="f-color">暂无搜索记录</text></view>

		<view class="search-item">
			<view class="search-title"><view class="f-color">热门搜索</view></view>
			<view class="">
				<view class="searched-word f-color">四件套</view>
				<view class="searched-word f-color">面膜</view>
			</view>
		</view>
	</view>
</template>

<script>
import Lines from '@/components/common/Line.vue';
export default {
	components: {
		Lines
	},
	data() {
		return {
			keyword: '',
			searchedKeywords: [] //搜索过的关键词
		};
	},
	onLoad() {
		//	页面加载时
		uni.getStorage({
			key: 'SEARCHEDWORDS',
			success: res => {
				this.searchedKeywords = JSON.parse(res.data);
			}
		});
	},
	onNavigationBarSearchInputChanged(e) {
		// console.log(e);
		this.keyword = e.text;
	},
	onNavigationBarButtonTap(e) {
		// console.log(e);
		// if(e.index == 0){
		// 	uni.navigateTo({
		// 		url:'../search-list/search-list'
		// 	})
		// }
		this.search();
	},

	//监听app软键盘的搜索
	onNavigationBarSearchInputConfirmed() {
		this.search();
	},
	methods: {
		//判断搜索是否为空和跳钻页面
		search() {
			if (this.keyword === '') {
				return uni.showToast({
					title: '搜索关键词不能为空！',
					icon: 'none'
				});
			} else {
				uni.navigateTo({
					url: `../search-list/search-list?keyword=${this.keyword}`
				});
			}
			uni.hideKeyboard(); //隐藏app的软键盘
			this.addSearchedWord();

			// #ifdef APP-PLUS
			const currentWebview = this.$scope.$getAppWebview();
			currentWebview.setTitleNViewSearchInputText('');
			// #endif
			// #ifdef H5
			let inputSearch = document.querySelector('.uni-input-input[type=search]');
			console.log(inputSearch);
			inputSearch.value = '';
			// #endif
		},
		//记录最近的搜索词
		addSearchedWord() {
			let index = this.searchedKeywords.indexOf(this.keyword);
			if (index < 0) {
				this.searchedKeywords.unshift(this.keyword);
			} else {
				if (index == 0) {
					return;
				} else {
					this.searchedKeywords.splice(index, 1);
					this.searchedKeywords.unshift(this.keyword);
				}
			}

			//数据持久化
			uni.setStorage({
				key: 'SEARCHEDWORDS',
				data: JSON.stringify(this.searchedKeywords)
			});
		},
		//	清除搜索记录
		clearHistory() {
			uni.showModal({
				title: '清除搜索记录',
				content: '是否要清除搜索记录？',
				cancelText: '取消',
				confirmText: '确定',
				success: res => {
					if (res.confirm) {
						// console.log('ok');
						uni.removeStorage({
							key: 'SEARCHEDWORDS'
						});

						this.searchedKeywords = [];
					} else {
						return;
					}
				}
			});
		},
		//点击历史搜索词进入页面
		toSearchList(item) {
			uni.navigateTo({
				url: `../search-list/search-list?keyword=${item}`
			});
		}
	}
};
</script>

<style scoped>
.search-item {
	padding: 20rpx;
}
.search-title {
	display: flex;
	justify-content: space-between;
	font-weight: bold;
}
.searched-word {
	padding: 4rpx 24rpx;
	background-color: #e1e1e1;
	display: inline-block;
	margin: 10rpx;
	border-radius: 20rpx;
}
.icon-lajitong {
	font-size: 50rpx;
}
.none-searched-words {
	text-align: center;
	padding: 20rpx;
}
</style>
