/*
* 集中管理后台api
*/
const api = {
  BASE_URL: 'http://localhost:8081',
  INDEX: '/articles',
  ARTICLE: '/articles/',
  MAIL_SIGN_UP: '/mail/signup',
  USER_SIGN_UP: '/users',
  USER_SIGN_IN: '/users/signin',
  USER_PUBLIC: '/users/public',
  GET_ARTICLE_OWN: '/articles/users/own',
  COMMENT: '/comments',
}

export default api
