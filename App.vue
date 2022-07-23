<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */	
	@import url(./common/uni.css);
	@import url(@/common/iconfont.css);
	@import url(@/common/common.css);

/* ::-webkit-scrollbar{
  display: none;
  width: 0 !important;
  height: 0 !important;
  -webkit-appearance: none;
  background: transparent;
} */

scroll-view ::-webkit-scrollbar {
width: 0;
height: 0;
background-color: transparent;
}
</style>
