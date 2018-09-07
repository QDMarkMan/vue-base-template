<template>
  <div class="editor">
      <Editor id="demo" v-model ="value" :height="200" :setting="{}" show-immediate></Editor>
    </div>
</template>

<script>
import Editor from '@/components/Editor'
export default {
  components:{
    Editor
  },
  name: 'RichText',
  data: () => ({
    value: ''
  })
}
</script>

<style lang="less">
.editor{
  height: 100%;
  width: 50%;
  margin: 0 auto;
}
</style>
