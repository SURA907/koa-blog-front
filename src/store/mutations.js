/*
 * vuex 的mutations模块
 */
import {
  INITIALIZATION_TIME,
  UPDATE_PAGE,
  UPDATE_INDEX,
  REQUESTING,
  REQUEST_ERROR,
  UPDATE_ARTICLE,
  UPDATE_ARTICLE_ERROR,
  INITIALIZATION_ARTICLE_STATUS,
  UPDATE_ARTICLE_STATUS,
  USER_SIGN_IN_SUCCESS,
  GET_USER_PUBLIC_SUCCESS,
  SIGN_OUT
} from './types'

const mutations = {
  /* 首页相关 */
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
  [REQUEST_ERROR] (state, {message}) {
    state.loading = false
    state.err_message = message
  },

  /* 文章相关 */
  // 更新文章数据
  [UPDATE_ARTICLE] (state, {data}) {
    state.articles.article_data = data
  },
  // 更新文章请求状态
  [UPDATE_ARTICLE_STATUS] (state, {message}) {
    state.articles.article_status = message
  },
  // 文章请求失败
  [UPDATE_ARTICLE_ERROR] (state, {message}) {
    state.articles.request_error = true
    state.articles.error_message = message
  },
  // 初始化文章状态
  [INITIALIZATION_ARTICLE_STATUS] (state) {
    state.articles.request_error = false
    state.articles.error_message = null
    state.articles.article_status = null
    state.articles.article_data = null
  },

  /* 用户登录相关 */
  // 登录成功
  [USER_SIGN_IN_SUCCESS] (state, {token}) {
    state.user_status.sign_in_status = 'sign_in'
    state.user_status.token = token
  },
  // 获取当前用户公开信息成功
  [GET_USER_PUBLIC_SUCCESS] (state, {username, avatar}) {
    state.user_status.username = username
    state.user_status.avatar = avatar
    state.user_status.sign_in_status = 'sign_in'
  },
  // 用户登出
  [SIGN_OUT] (state) {
    state.user_status.username = null
    state.user_status.avatar = null
    state.user_status.sign_in_status = 'sign_out'
  },
}

export default mutations
