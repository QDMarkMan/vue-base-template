<template>
  <div class="index">
    <div class="editor">
      <Editor id="demo" v-model ="value" :height="200" :setting="{}" show-immediate></Editor>
    </div>
    <button class="btn btn-logout" @click="logout">退出登陆</button>
  </div>
</template>

<script>
import { deleteToken } from '@/utils/cookie'
import Editor from '@/components/Editor'
export default {
  name: 'index',
  components:{
    Editor
  },
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
.editor{
  height: 100%;
  width: 50%;
  margin: 0 auto;
}
</style>
