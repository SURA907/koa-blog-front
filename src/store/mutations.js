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
  SEND_MAIL_SIGN_UP_ERROR,
  SEND_MAIL_SIGN_UP_SUCCESS,
  USER_SIGN_UP_ERROR,
  USER_SIGN_UP_SUCCESS
} from './types'
import {MessageBox} from 'element-ui'

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

  /*用户注册相关*/
  // 用户注册邮件发送失败
  [SEND_MAIL_SIGN_UP_ERROR] (state, {error_message}) {
    MessageBox.alert(error_message, '错误', {
      type: 'error',
      confirmButtonText: '确定',
    })
  },
  // 用户注册邮件成功发送
  [SEND_MAIL_SIGN_UP_SUCCESS] () {
    MessageBox.alert(`注册邮件发送成功；不出意外的话，SURA发送的邮件会出现在 '垃圾箱'中，请注意查收::>_<::`, '成功', {
      type: 'success',
      confirmButtonText: '确定',
    })
  },
  // 注册成功
  [USER_SIGN_UP_SUCCESS] () {
    MessageBox.alert('注册成功', '成功', {
      type: 'success',
      confirmButtonText: '确定',
      callback: () => {
        history.back()
      }
    })
  },
  // 注册失败
  [USER_SIGN_UP_ERROR] (state, {error_message}) {
    MessageBox.alert(error_message, '失败', {
      type: 'error',
      confirmButtonText: '确定',
    })
  },
}

export default mutations
