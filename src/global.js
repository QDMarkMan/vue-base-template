/**
 * share common with main point
 * 主要是为了分享main.js的入口压力
 */
import Util from './utils'
import Vue from 'vue'
import Vuetify from 'vuetify'
import './styles/theme.less'
// Material design
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
// 即将废弃
import iview from 'iview'
Vue.use(iview, {
  transfer: true,
  size: 'large'
})
Vue.use(Vuetify)
/**
 * 工具类对象没有选择使用混入，直接注入原型
 */
Vue.prototype.$util = Util
