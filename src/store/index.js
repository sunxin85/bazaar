import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'

import getters from './getters'

// 安装插件
Vue.use(Vuex)

// 创建store对象
const state = {
  cartList: []
}
const strore = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

// 挂载到vue实例上
export default strore