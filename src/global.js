/**
 * share common with main point
 * 主要是为了分享main.js的入口压力
 */
import Util from './utils'
import Vue from 'vue'
import './styles/theme.less'

/*  // 按需加载iview
["import", {
    "libraryName": "iview",
    "libraryDirectory": "src/components"
}],

import {Input, Button, Checkbox, Icon} from 'iview'
Vue.component('Button', Button)
Vue.component('Checkbox', Checkbox)
Vue.component('Input',Input)
Vue.component('Icon',Icon) */
import iview from 'iview'
Vue.use(iview, {
  transfer: true,
  size: 'large'
})
/**
 * 工具类对象没有选择使用混入，直接注入原型
 */
Vue.prototype.$util = Util
