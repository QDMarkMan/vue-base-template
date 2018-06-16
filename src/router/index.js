import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from './login'
Vue.use(Router)
const routerMap = [
  {
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld
  },
  // 登陆
  ...Login
]
console.log(routerMap)
export default new Router({
  mode: 'history',
  base: '/base/',
  routes: routerMap
})
