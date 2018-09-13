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
    /* const ieVersion = this.$util.getIeVersion()
    // get skeleton dom
    const skeleton = document.querySelector('.skeleton')
    // app加载完成之后隐藏或者删除dom
    skeleton.style.opacity = '0'
    let flag = true
    if (ieVersion !== 0 && ieVersion <= 9) {
      console.log('this is IE9');
      setTimeout(() => {
        document.body.removeChild(skeleton)
      },0)
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
    } */
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
