<template>
  <main class="frame-content">
    <transition enter-active-class="fadeIn" leave-active-class="fadeOut" mode="out-in" class="animated">
      <router-view/>
    </transition>
  </main>
</template>

<script>
export default {
  name: 'FrameContent'
}
</script>

<style>

</style>
