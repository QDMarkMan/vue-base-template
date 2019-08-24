import { deleteToken } from '@/utils/cookie'
const user = {
  // 状态
  state: {
    userId: '',
    userToken: '',
    userName: '',
    loginStatus: false
  },
  // 修改方法
  mutations: {
    Set_userId: (state, userId) => {
      state.userId = userId
    },
    Set_userToken: (state, userToken) => {
      state.userToken = userToken
    },
    Set_userName: (state, userName) => {
      state.userName = userName
    },
    Set_loginStatus: (state, loginStatus) => {
      state.loginStatus = loginStatus
    }
  },
  // user about actions
  actions: {
    // 通过vuex登陆
    loginByStore({ commit }, loginPara) {
      console.log(loginPara)
      return new Promise((resolve, reject) => {
        commit('Login')
        // 执行完异步的ajax之后resovle(data)
        try {
          resolve()
        } catch (error) {
          reject(error)
        }
      })
    },
    // 退出登录
    logout() {
      return new Promise((resolve, reject) => {
        try {
          deleteToken()
          resolve()
        } catch (error) {
          reject(error)
        }
      })
    }
  }
}

export default user
