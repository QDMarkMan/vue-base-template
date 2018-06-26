<template>
  <div class="login-wrap">
    <div class="login-content">
      Yes I am login
      <button class="btn btn-login" @click="doLogin">点击登陆</button>
    </div>
  </div>
</template>

<script>
import { writeToken } from '@/utils/cookie'
export default {
  name: 'login',
  data () {
    return {
      loginPara:{
        userName: '',
        password: ''
      }
    }
  },
  methods: {
    doLogin () {
      // token
      writeToken(new Date().getDate())
      // redirect
      this.$router.push({path: '/'})
    }
  }
}
</script>

<style>

</style>
