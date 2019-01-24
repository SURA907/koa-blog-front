/**
 * vuex 的actions模块
 * */
import axios from './../http'
import moment from 'moment'
import marked from 'marked'
import API from './api'
import {
  UPDATE_INDEX,
  REQUESTING,
  INITIALIZATION_TIME,
  UPDATE_ARTICLE,
  INITIALIZATION_ARTICLE_STATUS,
  UPDATE_ARTICLE_STATUS,
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
}

export default actions
