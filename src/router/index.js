import Vue from 'vue'
import VueRouter from 'vue-router'
import RouterConfig from './modules'
import ToppingRouter from './topping'
import CommonRouters from './common'
Vue.use(VueRouter)
export default new VueRouter({
  // mode: 'history', // 需要服务端支持
  // base: '/',
  scrollBehavior: () => ({ y: 0 }),
  // the real routers
  routes: [...ToppingRouter, ...RouterConfig, ...CommonRouters]
})
