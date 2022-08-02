import $http from '@/common/api/request.js'
export default {
	state: {
		cartList: [
			// {
			// 	id: 1,
			// 	name: '大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了',
			// 	color: '黑色',
			// 	imgUrl: '../../static/img/Children1.jpg',
			// 	price: '212',
			// 	count: 1,
			// 	checked: false
			// },
			// {
			// 	id: 2,
			// 	name: '大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了',
			// 	color: '黑色',
			// 	imgUrl: '../../static/img/Children2.jpg',
			// 	price: '212',
			// 	count: 1,
			// 	checked: true
			// },
			// {
			// 	id: 3,
			// 	name: '大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了',
			// 	color: '黑色',
			// 	imgUrl: '../../static/img/Children3.jpg',
			// 	price: '212',
			// 	count: 1,
			// 	checked: true
			// },
			// {
			// 	id: 4,
			// 	name: '大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了',
			// 	color: '黑色',
			// 	imgUrl: '../../static/img/Children2.jpg',
			// 	price: '212',
			// 	count: 1,
			// 	checked: true
			// },
			// {
			// 	id: 5,
			// 	name: '大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了',
			// 	color: '黑色',
			// 	imgUrl: '../../static/img/Children3.jpg',
			// 	price: '212',
			// 	count: 1,
			// 	checked: true
			// },
			// {
			// 	id: 6,
			// 	name: '大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了',
			// 	color: '黑色',
			// 	imgUrl: '../../static/img/Children2.jpg',
			// 	price: '212',
			// 	count: 1,
			// 	checked: true
			// },
			// {
			// 	id: 7,
			// 	name: '大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了',
			// 	color: '黑色',
			// 	imgUrl: '../../static/img/Children3.jpg',
			// 	price: '212',
			// 	count: 1,
			// 	checked: true
			// },
			// {
			// 	id: 8,
			// 	name: '大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了',
			// 	color: '黑色',
			// 	imgUrl: '../../static/img/Children2.jpg',
			// 	price: '212',
			// 	count: 1,
			// 	checked: true
			// },
			// {
			// 	id: 9,
			// 	name: '大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了',
			// 	color: '黑色',
			// 	imgUrl: '../../static/img/Children3.jpg',
			// 	price: '212',
			// 	count: 1,
			// 	checked: true
			// }
		],
		checkedList: []
	},
	mutations: {
		//从数据库中获取数据
		initGetDataFromDB(state, list) {
			state.cartList = list;
			state.checkedList = []
		},

		INIT(state) {
			state.checkedList = [];
			state.cartList.forEach(item => {
				if (item.checked === true) {
					state.checkedList.push(item.id)
				}
			})
		},
		//select all
		checkAll(state) {
			state.checkedList = state.cartList.map(item => {
				item.checked = true;
				return item.id
			})
		},
		//unselect all
		uncheckAll(state) {
			state.checkedList = []
			state.cartList.forEach(item => {
				item.checked = false;
			})
		},

		changeSelect(state, id) {
			console.log(id);
			state.cartList.some(item => {
				if (item.id === id) {
					if (item.checked) {
						// 改为不选
						item.checked = !item.checked
						state.checkedList.forEach((id, index) => {
							if (id === item.id) {
								state.checkedList.splice(index, 1)
							}
						})
						return true;
					} else {
						state.cartList.forEach(j => {
							if (j.checked === true) {
								let res = state.checkedList.indexOf(j.id)
								if (res == -1) {
									state.checkedList.push(j.id);
								}

							}
						})
						// 改为选中
						item.checked = !item.checked
						let res = state.checkedList.find(i => {
							i === item.id
						});
						if (!res) {
							state.checkedList.push(item.id)
						}
					}

				}
			})
		},

		delGoods(state) {
			state.cartList = state.cartList.filter(item => {
				let el = state.checkedList.indexOf(item.id)
				if (el === -1) {
					return true
				} else {
					state.checkedList.forEach((i, idx) => {
						if (i === item.id) {
							state.checkedList.splice(idx, 1);
						}
					})
					return false
				}

			})
		},

		addToCart(state, goodsInfo) {
			let exit = false;
			state.cartList.forEach(item => {
				if (item.id === goodsInfo.id) {
					item.count = Number(item.count) + Number(goodsInfo.count);
					exit = true;
				}

			})
			if (!exit) {
				state.cartList.push(goodsInfo);
			}
			// let res = state.cartList.indexOf(goodsInfo.id)
			// if(res>-1){
			// 	state.cartList[res].count += goodsInfo.count;
			// }else{
			// 	state.cartList.push(goodsInfo);
			// }
		}

	},
	getters: {
		//判断是否全选
		checkedAll(state) {
			return state.cartList.length === state.checkedList.length
		},
		//合计+结算数量
		totalCount(state) {
			let total = {
				pprice: 0,
				num: 0
			}
			state.cartList.forEach(item => {
				if (state.checkedList.indexOf(item.id) > -1) {
					total.pprice += item.price * item.count
					total.num = state.checkedList.length
				}
			});
			return total;
		}
	},
	actions: {
		INITGETDATAFROMDB({
			commit
		}, list) {
			commit('initGetDataFromDB', list)
		},
		initCheckedList({
			commit
		}) {
			console.log('init');
			commit("INIT")
		},
		CHECKEDALL({
			commit,
			getters
		}) {
			// console.log(123);
			getters.checkedAll ? commit("uncheckAll") : commit("checkAll")
		},
		CHANGESELECT({
			commit
		}, id) {
			commit('changeSelect', id);
		},
		DELGOODS({
			commit,
			state
		}) {
			// console.log(state.checkedList);
			uni.showModal({
				content: '确定删除吗？',
				success: (res) => {
					
					if(res.confirm){
							$http.request({
						header: {
							token: true
						},
						url: '/deleteCart',
						method: 'post',
						data: {
							goods_id: state.checkedList
						}
					}).then(result => {

						if(result.success){
								commit("delGoods");
						uni.showToast({
							title: '删除成功',
							icon: "none"
						})
						}else{
						uni.showToast({
							title: '操作失败',
							icon: "error"
						})	
						return;
						}

					

					}).catch(() => {
						uni.showToast({
							title: '请求失败',
							icon: 'error'
						})
						return
					})
					}else if(res.cancel){
						return
					}
				
				},
				

			})



		},
		ADDTOCART({
			commit
		}, goodsInfo) {
			commit("addToCart", goodsInfo)
		}
	}

}
