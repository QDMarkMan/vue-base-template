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
  beforeCreate () {}
}
</script>

<style>
#app {
  height: 100%;
  width: 100%;
  min-height: 100vh;
}
</style>
