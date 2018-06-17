/**
 * router intercept
 */
import router from './router'
import { readToken } from './utils/cookie'
router.beforeEach((to, from, next) => {
  console.log(readToken())
  // already get token
  /* if(readToken()){

  }else{
    next()
  } */

  next()
})