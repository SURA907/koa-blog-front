/**
 * vuex 的state模块
 */
const state = {
  time: null,
  page: 0,
  loading: false,
  full_load: false,
  err_message: null,
  index_data: [],
  // 文章相关
  articles: {
    request_error: false,
    error_message: null,
    article_status: null,
    article_data: null,
  },
  // 用户状态相关
  user_status: {
    // 登陆状态
    sign_in_status: 'sign_out',
    // token
    token: null,
    // 用户名
    username: null,
    // 头像
    avatar: null
  },
}

export default state
