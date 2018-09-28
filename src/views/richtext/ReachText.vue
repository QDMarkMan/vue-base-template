<template>
  <div class="editor">
      <Editor id="demo" v-model ="value" :height="200" :setting="{}" show-immediate></Editor>
    </div>
</template>

<script>
import Editor from '@/components/Editor'
const str = `<h1><span style="background-color: #ffffff; color: #0000ff;">Vue-base-template</span></h1>
<p style="word-spacing: 0.05em; line-height: 1.6em; margin: 1.2em 0px -1.2em; padding-bottom: 1.2em; position: relative; z-index: 1; color: #34495e; font-family: 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif; font-size: 15px;">Vue (读音 /vjuː/，类似于&nbsp;<span style="font-weight: 600; color: #2c3e50;">view</span>) 是一套用于构建用户界面的<span style="font-weight: 600; color: #2c3e50;">渐进式框架</span>。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与<a style="text-decoration-line: none; color: #42b983; font-weight: 600;" href="https://cn.vuejs.org/v2/guide/single-file-components.html">现代化的工具链</a>以及各种<a style="text-decoration-line: none; color: #42b983; font-weight: 600;" href="https://github.com/vuejs/awesome-vue#libraries--plugins" target="_blank" rel="noopener">支持类库</a>结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。</p>
<p style="word-spacing: 0.05em; line-height: 1.6em; margin: 1.2em 0px -1.2em; padding-bottom: 1.2em; position: relative; z-index: 1; color: #34495e; font-family: 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif; font-size: 15px;">如果你想在深入学习 Vue 之前对它有更多了解，我们<a id="modal-player" style="text-decoration-line: none; color: #42b983; font-weight: 600;" href="https://cn.vuejs.org/v2/guide/">制作了一个视频</a>，带您了解其核心概念和一个示例工程。</p>
<p style="word-spacing: 0.05em; line-height: 1.6em; margin: 1.2em 0px -1.2em; padding-bottom: 1.2em; position: relative; z-index: 1; color: #34495e; font-family: 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif; font-size: 15px;">如果你已经是有经验的前端开发者，想知道 Vue 与其它库/框架有哪些区别，请查看<a style="text-decoration-line: none; color: #42b983; font-weight: 600;" href="https://cn.vuejs.org/v2/guide/comparison.html">对比其它框架</a>。</p>
<p>&nbsp;</p>`
export default {
  components: {
    Editor
  },
  name: 'RichText',
  data: () => ({
    value: str
  }),
  watch: {
    value (val) {
      console.log(val)
    }
  }
}
</script>

<style lang="less">
.editor{
  height: 100%;
  width: 50%;
  margin: 0 auto;
}
</style>
