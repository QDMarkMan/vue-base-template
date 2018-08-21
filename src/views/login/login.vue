<template>
  <div class="login-layer">
      <canvas id="login-canvas"></canvas>
      <div class="login-content animated">
        <div class="logo-group">
          <img height="120" width="120" src="../../assets/logo.png" alt="">
        </div>
        <div class="login-form">
          <div>
            <Input v-model="loginPara.userName" size="default" icon="person" placeholder="请输入用户名"/>
          </div>
          <div class="login-item">
            <Input v-model="loginPara.password" size="default" type="password" icon="key" placeholder="请输入密码"/>
          </div>
          <div class="login-item">
            <!-- <Checkbox class="remember" v-model="loginPara.remember">记住我</Checkbox> -->
          </div>
          <Button class="btn-login" type="success" long @click="doLogin">登陆</Button>
        </div>
      </div>
  </div>
</template>

<script>
import { writeToken } from '@/utils/cookie'
import openCanvas from './canvas'
export default {
  name: 'login',
  data () {
    return {
      loginPara:{
        userName: 'admin',
        password: '123456',
        remember: true
      }
    }
  },
  methods: {
    doLogin () {
      // token 虚拟登陆
      writeToken(new Date().getDate())
      // redirect
      this.$router.push({path: '/welcome'})
    }
  },
  created (){
    console.log('welcome');
  },
  mounted () {
    // 开启登陆动画canvas
    // openCanvas('login-canvas')
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

