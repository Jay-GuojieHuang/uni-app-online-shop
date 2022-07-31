//封装request
import store from '@/store/index.js'

export default {
	common:{
		baseUrl: "http://192.168.0.73:3000/api",
		data:{},
		header:{
			"Content-Type":"application/json",
			"content-Type":"application/x-www-urlencoded"
		},
		method:"GET",
		dataType:"json"
	},
	request(options={}){
		uni.showLoading({
			title:'加载中'
		});
		options.url= this.common.baseUrl + options.url;
		options.data = options.data || this.common.data;
		options.header = options.header || this.common.header;
		options.method = options.method || this.common.method; 
		options.dataType = options.dataType || this.common.dataType; 
		
		//判断header里是否传入了token
		if(options.header.token) {
			// console.log(store.state);
			options.header.token = store.state.user.token;
			// console.log('header',store.state.user.userInfo.token);
			if(!options.header.token) {
				// 默认是null
				uni.showToast({
					title:'请先登陆！',
					icon:'none'
				})
				return uni.navigateTo({
					url:'/pages/login/login'
				})
			}
		}
		
		
	return new Promise((res,rej)=>{
		
		uni.request({
			...options,
			success:(result)=>{
				
				if(result.statusCode != 200) {
					
					setTimeout(function(){
						uni.hideLoading();
					},300)
					return rej();
					
				}
				setTimeout(function(){
					uni.hideLoading();
				},300)
				let data= result.data.data;
				res(data);
				
			},
			fail: () => {
				setTimeout(function(){
					uni.hideLoading();
				},300)
			}
		})
	})
	}
}