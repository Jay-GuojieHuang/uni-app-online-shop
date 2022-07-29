export default {
	state:{
		//登陆状态
		loginStatus: false,
		//token
		token:null,
		// 用户信息
		userInfo :{
			
		}
	},
	getters:{
		
	},
	mutations:{ 
		initUser(state){
			 let userData = uni.getStorageSync("userInfo");
			 if(userData){
				 console.log(userData);
				 state.userInfo = JSON.parse(userData);
				 state.loginStatus = true;
				 state.token = userData.token;
				 console.log(state.userInfo);
			 }
		
		},
		//登陆后要保存的用户信息
		login(state,userInfo){
			state.userInfo = userInfo;
			state.loginStatus = true;
			state.token = userInfo.token;
			// 持久化存储
			uni.setStorageSync('userInfo',JSON.stringify(userInfo));
		},
		
		//退出登陆清空localstorage
		logout(state){
			state.loginStatus = false;
			state.token = null;
			state.userInfo ={};
			uni.removeStorageSync('userInfo');
			uni.navigateBack({
				delta:1
			})
		}
	},
	actions:{
		
	}
}