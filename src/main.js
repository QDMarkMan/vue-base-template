/**
 * The entry file
 * 入口文件  主要整合router和store
 */
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './interception'
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
