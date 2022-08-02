import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

// 引入各个modules
//for cart page state
import cart from './modules/cart.js'
import address from './modules/address.js'
import user from './modules/user.js'
import order from './modules/order.js'


export default new Vuex.Store({
	modules:{
		cart,
		address,
		user,
		order
	}
})