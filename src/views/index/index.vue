<template>
  <div class="index">
    <button class="btn btn-logout" @click="logout">退出登陆</button>
  </div>
</template>

<script>
import { deleteToken } from '@/utils/cookie'
export default {
  name: 'index',
  data () {
    return {

    }
  },
  methods: {
    logout () {
      deleteToken()
      this.$router.push({path: '/login'})
    }
  }
}
</script>

<style>

</style>
