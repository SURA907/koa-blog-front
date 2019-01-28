import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/store'
import 'element-ui/lib/theme-chalk/display.css'
import 'element-ui/lib/theme-chalk/index.css'
import './../public/css/markdown.css'
import './../public/css/clear_style.css'
import {Input, Button, Tooltip} from 'element-ui'


Vue.config.productionTip = false

Vue.use(Input)
Vue.use(Button)
Vue.use(Tooltip)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
