/**
 * router intercept
 */
import router from './router'
import { readToken } from './utils/cookie'
import iView from 'iview'
// config loadingbar
iView.LoadingBar.config({
  color: '#5cb85c',
  failedColor: '#f0ad4e',
  height: 2
});
const whiteList = ['/login'] // noredirect list
router.beforeEach((to, from, next) => {
  // open bar
  iView.LoadingBar.start();
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
  iView.LoadingBar.finish();
})