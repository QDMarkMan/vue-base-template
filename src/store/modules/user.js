import { deleteToken } from '@/utils/cookie'
const user = {
  // 状态
  state: {
    userId: '',
    userToken: '',
    userName: ''
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
    }
  },
  // 异步修改方式
  actions: {
    // 通过vuex登陆
    loginByStore ({ commit }, loginPara) {
      return new Promise((resolve, reject) => {
        // 执行完异步的ajax之后resovle(data)
        resolve()
      })
    },
    // 退出登录
    logout ({ commit }) {
      return new Promise((resolve, reject) => {
        deleteToken()
        resolve()
      })
    }
  }

}

export default user
