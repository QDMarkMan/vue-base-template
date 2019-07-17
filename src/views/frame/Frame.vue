<template>
  <div class="frame">
    <frame-header />
    <section class="frame-container">
      <frame-side />
      <frame-content id="content"></frame-content>
      <frame-footer />
    </section>
  </div>
</template>

<script>
import { FrameHeader, FrameSide, FrameContent, FrameFooter } from './index'
export default {
  name: 'frame',
  components: {
    [FrameHeader.name]: FrameHeader,
    [FrameSide.name]: FrameSide,
    [FrameContent.name]: FrameContent,
    [FrameFooter.name]: FrameFooter
  }
}
</script>

<style lang="less">
.frame {
  height: 100%;
  width: 100%;
  .frame-container {
    height: 100%;
    width: 100%;
  }
}
</style>
