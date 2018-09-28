/**
 * vuex 主文件
 */
import Vue from 'vue'
import Vuex from 'vuex'
// vuex日志 使用dev-tools可能不需要这个东西
// import createLogger from 'vuex/dist/logger'
import getters from './getters'
import user from './modules/user'

Vue.use(Vuex)
// 创建store
const store = new Vuex.Store({
  modules: {
    user
  },
  getters,
  strict: process.env.NODE_ENV !== 'production'
})

export default store
