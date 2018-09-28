/**
 * The entry file
 * 入口文件  主要整合router和store
 */
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './global'
import './interception'
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  beforeCreate () {
    const ieVersion = this.$util.getIeVersion()
    // get skeleton dom
    const skeleton = document.querySelector('.skeleton')
    // app加载完成之后隐藏或者删除dom
    skeleton.style.opacity = '0'
    let flag = true
    if (ieVersion !== 0 && ieVersion <= 9) {
      console.log('this is IE9');
      setTimeout(() => {
        document.body.removeChild(skeleton)
      }, 0)
    } else {
      this.$util.addEvent(skeleton, 'transitionend', (e) => {
        if (e.target === skeleton && flag) {
          flag = false
          skeleton.style.displpay = 'none'
          setTimeout(() => {
            document.body.removeChild(skeleton)
          }, 0)
        }
      })
    }
    // 定时任务 确保删除
    setTimeout(() => {
      if (skeleton) document.body.removeChild(skeleton)
    }, 200)
  }
})
