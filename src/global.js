/**
 * share common with main point
 * 主要是为了分享main.js的入口压力
 */
import Util from './utils'
import Vue from 'vue'
import './styles/theme.less'
import {Input, Button, Checkbox} from 'iview'
Vue.component('Button', Button);
Vue.component('Checkbox', Checkbox)
Vue.component('Input',Input)
/**
 * 工具类对象没有选择使用混入，直接注入原型
 */
Vue.prototype.$util = Util
