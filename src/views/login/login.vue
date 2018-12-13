<template>
  <div class="login-layer">
      <canvas id="login-canvas"></canvas>
      <div class="login-content animated">
        <div class="logo-group">
          <img height="120" width="120" src="../../assets/logo.png" alt="">
        </div>
        <div class="login-form">
          <div class="form-title logo-font">
            FASTER-VUE
          </div>
          <div>
            <el-input
              v-model="loginPara.userName"
              placeholder="请输入用户名"
            ></el-input>
          </div>
          <div class="login-item">
            <el-input
              v-model="loginPara.password"
              type="password"
              placeholder="请输入密码"
            ></el-input>
          </div>
          <div class="login-item">
            <el-button :loading="loading" style="width: 100%;" round @click="doLogin">登陆</el-button>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { writeToken } from '@/utils/cookie'
export default {
  name: 'login',
  data () {
    return {
      name: '',
      loading: false,
      loginPara: {
        userName: 'vue',
        password: '123456',
        remember: true
      }
    }
  },
  methods: {
    doLogin () {
      this.loading = true
      // token 虚拟登陆
      writeToken(new Date().getDate())
      setTimeout(() => {
        this.loading = false
        // redirect
        this.$router.push({ path: '/' })
      }, 2000)
    }
  },
  created () {
    console.log('welcome');
  }
}
</script>

<style lang="less">
.login-layer{
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .login-content{
    position: absolute;
    padding: 0 15px 20px;
    z-index: 2;
    min-width: 302px;
    // min-height: 324px;
    background-color: rgba(1, 1, 1, 0.1);
    border-radius: 10px;
    .logo-group{
      width: 100%;
      text-align: center;
      position: relative;
      top:-30px;
    }
    .login-form{
      position: relative;
      top: -20px;
    }
    .form-title{
      margin-bottom: 10px;
    }
  }
}
#login-canvas{
  display: block;
  width: 100%;
  position: absolute;
  height: 100%;
  z-index: 1;
}
.btn-login{
  margin-top: 20px;
}
.login-item{
  margin-top: 15px;
}
.remember{
  margin-left: 3px;
}
</style>

