import Vue from 'vue'
import Router from 'vue-router'
import Index from './../components/Index'
import Article from './../components/Article'
import Home from './../components/Home'
import SignIn from '../components/SignIn'
import SignUp from '../components/SignUp'

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
        {
          path: '/articles/:article_id',
          component: Article
        }
      ]
    },
    {
      path: '/signin',
      component: SignIn
    },
    {
      path: '/signup',
      component: SignUp
    },
  ]
})
