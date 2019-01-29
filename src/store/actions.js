/**
 * vuex 的actions模块
 * */
import axios from '../http'
import API from '../api'
import {MessageBox, Notification} from 'element-ui'
import {
  USER_SIGN_IN_SUCCESS,
  GET_USER_PUBLIC_SUCCESS,
  SIGN_OUT
} from './types'

const actions = {
  /* 用户登录相关 */
  // 初始化登录状态
  initialization_user_statue({commit}) {
    let token = localStorage.getItem('token')
    if (token) {
      // 本地存储中有token
      commit(USER_SIGN_IN_SUCCESS, {token: token})
    }
  },
  // 用户登录
  user_sign_in({commit}, data) {
    let url = API.USER_SIGN_IN
    axios.post(url, data).then(res => {
      let result = res.data
      if (result.code === 0) {
        // 登录成功
        localStorage.setItem('token', result.token)
        commit(USER_SIGN_IN_SUCCESS, {token: result.token})
        Notification({
          title: '成功',
          message: '登陆成功',
          type: 'success',
          position: 'bottom-left'
        })
        window.history.back()
      } else {
        // 登陆失败
        MessageBox.alert(result.message, '失败', {
          type: 'error',
          confirmButtonText: '确定'
        })
      }
    })
  },
  // 获取用户公开信息
  get_user_public({commit}) {
    let url = API.USER_PUBLIC
    axios.get(url).then(res => {
      let result = res.data
      if (result.code === 0) {
        // 获取信息成功
        commit(GET_USER_PUBLIC_SUCCESS, {
          id: result.data.id,
          type: result.data.type,
          username: result.data.username,
          avatar: result.data.avatar
        })
      } else {
        // 获取信息失败 - token失效
        localStorage.removeItem('token')
        commit(SIGN_OUT)
      }
    })
  },
  // 用户登出
  user_sign_out({commit}) {
    localStorage.removeItem('token')
    commit(SIGN_OUT)
    Notification({
      title: '成功',
      message: '登出成功',
      type: 'success',
      position: 'bottom-left'
    })
  }
}

export default actions
