export default {
	
	actions :{
		ADDADDRESS({commit},addObj){
			commit("addAddress",addObj);
		},
		EDITADDRESS({commit},addObj){
			commit("editAddress",addObj);
		}
	},
	mutations: {
		addAddress(state, addObj){
			
				if(addObj.isDefault){
					state.list.forEach(item=>{
					item.isDefault = false;
		     		})
				}
			state.list.unshift(addObj);
			uni.showToast({
				title:'保存成功！'
			})
		},
		editAddress(state, addObj){
			
			// if(addObj.index>-1){
			// 	state.list[addObj.index] = addObj.item;
			// }
			let {index, item} = addObj;
			if(item.isDefault){
				state.list.forEach(el=>{
					el.isDefault = false;
				})
			}
			for(let key in item){
				state.list[index][key] = item[key];
			}
			uni.showToast({
				title:'保存成功！'
			})
		}
	},
	state:{
		list:[
			{
				name:'张三',
				tel:'13700000000',
				city:'广东省江门市开平市',
				address:'xxx路，xxx房',
				isDefault:false
			},
			{
				name:'李四',
				tel:'13700000000',
				city:'广东省江门市开平市',
				address:'xxx路，xxx房',
				isDefault:true
			},
		]
	},
	getters:{
		isDefault(){
			return 
		}
	}
	
}



