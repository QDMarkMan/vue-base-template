/**
 * router intercept
 */
import router from './router'
import { readToken } from './utils/cookie'
const whiteList = ['/login'] // noredirect list
router.beforeEach((to, from, next) => {
  // open bar
  // user login permission
  if (readToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next({ path: '/login' })
    }
  }
})

