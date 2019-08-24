/**
 * router intercept
 */
import router from './router'
import { readToken } from './utils/cookie'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'

const whiteList = ['/login'] // noredirect list
router.beforeEach((to, from, next) => {
  // open bar
  NProgress.start()
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
      next({ path: `/login?redirect=${to.path}` })
      // NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  // Only close process bar
  NProgress.done()
})