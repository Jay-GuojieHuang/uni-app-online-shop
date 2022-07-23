<template>
	<view>
		<ShopList :keyword="keyword"></ShopList>
	
	</view>
</template>

<script>
	// import Lines from "@/components/common/Line.vue"
	import ShopList from '@/components/common/ShopList.vue'
	export default {
		components:{
			ShopList,
			// Lines
		},
		onLoad(e){
			// console.log(e);
			this.keyword = e.keyword

		},
		onReady(){
			
// 动态设置导航栏搜索框内容

	// #ifdef APP-PLUS
	let webView = this.$mp.page.$getAppWebview();
	webView.setTitleNViewSearchInputText(this.keyword);
	// #endif
	
	// #ifdef H5
	let inputSearch=document.querySelector('.uni-input-input[type=search]');
	// console.log(this.keyword);
	var evt = new InputEvent('input', {
		inputType: 'insertText',
		data: this.keyword,
		dataTransfer: null,
		isComposing: false
	});
	// console.log(evt,inputSearch);
	if(inputSearch){
		inputSearch.value = this.keyword;
		inputSearch.dispatchEvent(evt);
	}
	// #endif

		},
		data() {
			return {
				keyword:''
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
