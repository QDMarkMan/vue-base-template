/**
 * share common with main point
 */
import Util from './utils'
import Vue from 'vue'
import Element from 'element-ui'
import '@/styles/index.less'
import '@/styles/element.var.scss'
import '@/components/global'
// Element 引入
Vue.use(Element, {
  size: 'small'
})
/**
 * 工具类对象没有选择使用混入，直接注入原型
 */
Vue.prototype.$util = Util
