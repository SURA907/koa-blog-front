/**
 * vuex 核心管理模块
 */
import Vue from 'vue'
import vuex from 'vuex'

import state from './state'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'


Vue.use(vuex)

export default new vuex.Store({
  state,
  actions,
  mutations,
  getters
})
