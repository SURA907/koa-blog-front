/**
 * vuex 的actions模块
 * */
import axios from './../http'
import moment from 'moment'
import marked from 'marked'
import API from './api'
import {MessageBox, Notification} from 'element-ui'
import {
  UPDATE_INDEX,
  REQUESTING,
  INITIALIZATION_TIME,
  UPDATE_ARTICLE,
  INITIALIZATION_ARTICLE_STATUS,
  UPDATE_ARTICLE_STATUS,
  USER_SIGN_IN_SUCCESS,
  GET_USER_PUBLIC_SUCCESS,
  SIGN_OUT
} from './types'

const actions = {
  // 初始化时间戳
  initialization_time ({commit}) {
    commit(INITIALIZATION_TIME)
  },

  // 请求首页数据
  request_index ({commit, state}) {
    let time = state.time
    let page = state.page
    let url = API.INDEX+`?time=${time}&page=${page}`
    // 更新状态：请求中
    commit(REQUESTING)
    axios.get(url).then(res => {
      if (res.data.code === 0) {
        // 没有新的文章
        if (res.data.data.length === 0) {
          state.full_load = true
        }
        // 格式化数据
        let data = res.data.data.map(item => ({
          article_address: '/articles/'+item._id,
          _id: item._id,
          title: item.title,
          description: item.description,
          img: item.img,
          create_at: moment(item.create_at).format('YYYY-MM-DD HH:mm:ss'),
          update_at: moment(item.update_at).format('YYYY-MM-DD HH:mm:ss'),
          user: item.user,
          user_id: item.user_id
        }))
        commit(UPDATE_INDEX, {data})
      }
    })
  },

  // 请求文章数据
  request_article ({commit}, article_id) {
    // 初始化文章状态
    commit(INITIALIZATION_ARTICLE_STATUS)
    let url = API.ARTICLE+article_id
    axios.get(url).then(res => {
      // 请求成功
      commit(UPDATE_ARTICLE_STATUS, {message: 'ready'})
      let data = res.data.data
      data.create_at = moment(data.create_at).format('YYYY-MM-DD HH:mm:ss')
      data.update_at = moment(data.update_at).format('YYYY-MM-DD HH:mm:ss')
      data.content = decodeURIComponent(data.content)
      if (data.type === 'markdown' && res.data.code === 0) {
        // 文章格式为markdown
        data.content = marked(data.content)
      }
      // 数据准备完成，触发mutation
      commit(UPDATE_ARTICLE, {data})
    })
  },

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
          username: result.data.username,
          avatar: result.data.avatar,
          type: result.data.type
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
