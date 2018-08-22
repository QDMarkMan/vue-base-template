import Vue from 'vue'
import VueRouter from 'vue-router'
console.log(VueRouter)
import Login from './login'
import Welcome from './welcome'
Vue.use(VueRouter)
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
export default new VueRouter({
  // mode: 'history',// 发布正式需要服务器支持
  // base: '/base/',
  routes: routerMap
})
