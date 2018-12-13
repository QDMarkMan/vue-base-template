<template>
  <div class="container-fluid" :class="[contentClass]">
      <el-row>
          <el-col :span="24">
              <!-- box with #fff bg -->
              <div class="box">
                  <div class="box-body">
                      <slot></slot>
                  </div>
              </div>
          </el-col>
      </el-row>
  </div>
</template>

<script>
export default {
  name: "box-content",
  props: {
    noTitle: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    contentClass () {
      return this.noTitle ? 'content-notitle' : 'content'
    }
  }
}
</script>

