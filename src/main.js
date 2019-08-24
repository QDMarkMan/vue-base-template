/**
 * The entry file
 * 整合router,store, UI等等公共组件
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
  beforeCreate() {
    // 为了优雅的过渡，我们要先把页面的Fade动画进行完再去删除skeleton
    const ieVersion = this.$util.getIeVersion()
    const skeleton = document.querySelector('.skeleton')
    // app加载完成之后隐藏或者删除dom
    skeleton.style.opacity = '0'
    let flag = true
    if (ieVersion !== 0 && ieVersion <= 9) {
      console.log('this is IE9');
      skeleton.style.displpay = 'none'
      document.body.removeChild(skeleton)
    } else {
      // TODO: 为什么有时候 addEvent 会不生效？
      this.$util.addEvent(skeleton, 'transitionend', (e) => {
        if (e.target === skeleton && flag ) {
          skeleton.style.displpay = 'none'
          flag = false
          document.body.removeChild(skeleton)
        }
      })
    }
    // fix: addEvent 不生效
    setTimeout(() => {
      if (skeleton && flag ) {
        skeleton.style.displpay = 'none'
        flag = false
        document.body.removeChild(skeleton)
      }
    },0)
  }
})
