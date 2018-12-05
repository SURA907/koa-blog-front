import Vue from 'vue'
import Router from 'vue-router'
import Index from './../components/Index'
import Home from './../components/Home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Index,
      children: [
        {
          path: '/',
          redirect: '/home'
        },
        {
          path: '/home',
          component: Home
        },
      ]
    }
  ]
})
