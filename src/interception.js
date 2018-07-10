/**
 * router intercept
 */
import router from './router'
import { readToken } from './utils/cookie'
const whiteList = ['/login']
router.beforeEach((to, from, next) => {
  // user login permission
  if (readToken()) {
    if (to.path === '/login') { 
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    if(whiteList.indexOf(to.path) !== -1){
      next()
    }else{
      next({ path: '/login' })
    }
  }
})

router.afterEach(() => {

})