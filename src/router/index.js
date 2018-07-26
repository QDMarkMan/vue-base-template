import Vue from 'vue'
import Router from 'vue-router'
import Login from './login'
import Welcome from './welcome'
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
  ...Login,
  // 欢迎页
  ...Welcome
]
export default new Router({
  // mode: 'history',// 发布正式需要服务器支持
  // base: '/base/',
  routes: routerMap
})
