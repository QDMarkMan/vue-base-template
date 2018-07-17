<template>
  <div class="frame">
    <FrameHeader></FrameHeader>
    <section class="frame-container">
      <FrameSide></FrameSide>
			<FrameContent id="content"></FrameContent>
      <FrameFooter></FrameFooter>
    </section>
  </div>
</template>

<script>
import { FrameHeader, FrameSide, FrameContent, FrameFooter } from "./index"
export default {
  name: 'Frame',
  components: {
    FrameHeader,
    FrameSide,
    FrameContent,
    FrameFooter
  }
}
</script>

<style lang="less">
.frame{
  height: 100%;
  width: 100%;
  .frame-container{
    height: 100%;
    width: 100%;
  }
}
</style>

