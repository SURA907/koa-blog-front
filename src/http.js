import axios from 'axios'
import state from './store/state'
import {MessageBox} from "element-ui";
import API from '../api'

/* axios 默认超时设置 */
axios.defaults.timeout = 5000
/* axios 默认域名地址 */
axios.defaults.baseURL = API.BASE_URL

/* http request 拦截器 */
axios.interceptors.request.use(
  config => {
    // 如果token存在则在发起请求时带上token
    if (state.user_status.token) {
      config.headers.Authorization = `Bearer ${state.user_status.token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

/* http response 拦截器 */
axios.interceptors.response.use(
  response => {
    return response
  },
  // 出现错误时弹出警告
  error => {
    MessageBox.alert('通信失败', '失败', {
      type: 'error',
      confirmButtonText: '确定'
    })
    return Promise.reject(error)
  }
)

export default axios
