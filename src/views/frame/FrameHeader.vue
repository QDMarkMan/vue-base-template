<template>
  <header class="frame-header">
    <!-- <img :class="{'center-logo': center}" src="../../assets/logo.png" alt="" height="50px"> -->
    <div class="header-logo">
      <span class="logo-font">
        FASTER-VUE
      </span>
    </div>
    <!-- 下拉按钮 -->
    <ul v-if="!center" class="user-panel">
      <li class="panel-item">
        <el-button
          type="danger"
          icon="el-icon-arrow-right"
          circle
          @click="logout"
        ></el-button>
      </li>
    </ul>
  </header>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'frame-header',
  props: {
    // logo居中
    center: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    ...mapActions({
      doLogout: 'logout'
    }),
    logout() {
      this.doLogout()
        .then(() => {
          this.$router.push({ path: '/login' })
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 触发退出
    dropOut(data) {
      this[data]()
    }
  }
}
</script>

<style lang="scss">
.frame-header {
  height: 54px;
  background-color: #2979ff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  .header-logo {
    display: inline-block;
    width: $side-width;
    height: 100%;
    line-height: 53px;
    padding-left: 10px;
    .logo-font {
      color: #ffffff;
    }
  }
  .user-panel {
    margin-right: 20px;
    float: right;
    height: 100%;
    li {
      display: inline-block;
      height: 100%;
      line-height: 54px;
      .ivu-dropdown a {
        color: #ffffff;
      }
      &:hover {
        .ivu-dropdown a {
          color: #f1f1f1;
        }
      }
    }
  }
}
// logo居中显示
.center-logo {
  display: block;
  margin: 0 auto;
}
</style>
