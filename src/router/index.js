import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from './login'
Vue.use(Router)
const routerMap = [
  // router nesting
  {
    path: '/',
    name: 'index',
    redirect: '/index',
    component: () => import('@/views/frame/Frame'),
    children: [
      {
        path: '',
        component: () => import('@/views/index/index'),
      }
    ]
  },
  // 登陆
  ...Login
]
export default new Router({
  // mode: 'history',// 发布正式需要服务器支持
  // base: '/base/',
  routes: routerMap
})
