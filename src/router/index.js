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
export default new Router({
  mode: 'history',// 发布正式需要服务器支持
  base: '/base/',
  routes: routerMap
})
