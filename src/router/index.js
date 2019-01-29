import Vue from 'vue'
import Router from 'vue-router'
import Index from './../components/Index'
import Article from './../components/Article'
import Home from './../components/Home'
import SignIn from '../components/SignIn'
import SignUp from '../components/SignUp'
import AdminArticles from '../components/AdminArticles'
import CreateArticles from '../components/CreateArticles'
import EditArticles from '../components/EditArticles'

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
          path: '/articles/new',
          component: CreateArticles
        },
        {
          path: '/articles/users/admin',
          component: AdminArticles
        },
        {
          path: '/articles/:id',
          component: Article
        },
        {
          path: '/articles/edit/:id',
          component: EditArticles
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
