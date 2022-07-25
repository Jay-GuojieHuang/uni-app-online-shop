import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

// 引入各个modules
//for cart page state
import cart from './modules/cart.js'

export default new Vuex.Store({
	modules:{
		cart
	}
})