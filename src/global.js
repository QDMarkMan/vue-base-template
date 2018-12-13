/**
 * share common with main point
 * 主要是为了分享main.js的入口压力
 */
import Util from './utils'
import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import './styles/index.less'
import './components/global'
// 示例表格用的
Vue.use(Element)
/**
 * 工具类对象没有选择使用混入，直接注入原型
 */
Vue.prototype.$util = Util
