/*
 * vuex 的mutations模块
 */
import {
  USER_SIGN_IN_SUCCESS,
  GET_USER_PUBLIC_SUCCESS,
  SIGN_OUT
} from './types'

const mutations = {
  /* 用户登录相关 */
  // 登录成功
  [USER_SIGN_IN_SUCCESS] (state, {token}) {
    state.user_status.sign_in_status = 'sign_in'
    state.user_status.token = token
  },
  // 获取当前用户公开信息成功
  [GET_USER_PUBLIC_SUCCESS] (state, {id, type, username, avatar}) {
    state.user_status.id = id
    state.user_status.type = type
    state.user_status.username = username
    state.user_status.avatar = avatar
    state.user_status.sign_in_status = 'sign_in'
  },
  // 用户登出
  [SIGN_OUT] (state) {
    state.user_status.username = null
    state.user_status.avatar = null
    state.user_status.type = null
    state.user_status.token = null
    state.user_status.sign_in_status = 'sign_out'
  },
}

export default mutations
