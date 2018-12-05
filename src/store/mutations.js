/*
 * vuex 的mutations模块
 */
import {INITIALIZATION_TIME, UPDATE_PAGE, UPDATE_INDEX, REQUESTING, REQUEST_ERROR} from './types'
const mutations = {
  // 初始化时间戳
  [INITIALIZATION_TIME] (state) {
    state.time = new Date().getTime()
  },
  // 首页页数更新
  [UPDATE_PAGE] (state) {
    state.page++
  },
  // 数据请求状态更新
  [REQUESTING] (state) {
    state.loading = true
  },
  // 首页数据更新
  [UPDATE_INDEX] (state, {data}) {
    state.loading = false
    for (let item of data) {
      state.index_data.push(item)
    }
    state.page++
  },
  // 请求失败
  [REQUEST_ERROR] (state, {meg}) {
    state.loading = false
    state.err_message = meg
  }

}

export default mutations
