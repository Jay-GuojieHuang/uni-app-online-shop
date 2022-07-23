//封装request

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