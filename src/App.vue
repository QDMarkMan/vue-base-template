<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {}
  },
  beforeCreate () {
    const ieVersion = this.$util.getIeVersion()
    const skeleton = document.querySelector('.skeleton')
    // app加载完成之后隐藏或者删除dom
    skeleton.style.opacity = '0'
    let flag = true
    if (ieVersion !== 0 && ieVersion <= 9) {
      console.log('this is IE9');
      document.body.removeChild(skeleton)
    } else {
      this.$util.addEvent(skeleton, 'transitionend', (e) => {
        if (e.target === skeleton && flag) {
          flag = false
          skeleton.style.displpay = 'none'
          document.body.removeChild(skeleton)
        }
      })
    }
  }
}
</script>

<style>
#app {
  height: 100%;
  width: 100%;
  min-height: 100vh;
}
</style>
