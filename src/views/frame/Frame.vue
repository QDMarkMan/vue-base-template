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

<style>

</style>
