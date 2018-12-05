/**
 * vuex 的actions模块
 * */
import axios from 'axios'
import moment from 'moment'
import API from './api'
import {UPDATE_INDEX, REQUESTING, INITIALIZATION_TIME, REQUEST_ERROR} from './types'

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
      // 更新状态：请求结束
      if (res.data.code === 0) {
        // 没有新的文章
        if (res.data.data.length === 0) {
          state.full_load = true
        }
        // 格式化数据
        let data = res.data.data.map(item => ({
          article_address: '/articles/'+item._id,
          _id: item._id,
          article_title: item.article_title,
          article_description: item.article_description,
          article_release_time: moment(item.article_release_time).format('YYYY-MM-DD HH:mm:ss'),
          article_last_update_time: moment(item.article_last_update_time).format('YYYY-MM-DD HH:mm:ss'),
          article_author: item.article_author,
          article_author_id: item.article_author_id
        }))
        commit(UPDATE_INDEX, {data})
      }
    }).catch(() => {
      commit(REQUEST_ERROR, {msg: 'request failed'})
    })
  },

}

export default actions
