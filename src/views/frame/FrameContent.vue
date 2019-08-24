<template>
  <main class="frame-content">
    <section class="content-fluid">
      <transition
        enter-active-class="fadeIn"
        leave-active-class="fadeOut"
        mode="out-in"
        class="animated">
        <!-- target content -->
        <template>
          <!-- 最多缓存一个组件 你可以按照需求自己设置 -->
          <keep-alive :max="1" v-if="$route.meta.keepAlive">
            <router-view></router-view>
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive"></router-view>
        </template>
      </transition>
    </section>
  </main>
</template>

<script>
export default {
  name: 'frame-content'
}
</script>

<style lang="less">
.frame-content {
  height: 100%;
  width: 100%;
  padding-top: @header-height;
  padding-left: @side-width !important; // 覆盖之前的样式
}
.content-fluid {
  width: 100%;
  padding: 10px;
  margin-right: auto;
  margin-left: auto;
}
</style>
