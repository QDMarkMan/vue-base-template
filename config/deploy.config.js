/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @Version: 
 * @Date: 2019-05-25 13:46:29
 * @LastEditors: etongfu
 * @LastEditTime: 2019-05-25 14:48:57
 * @Description: ssh 配置文件
 * @youWant: add you want info here
 */
/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @LastEditors: etongfu
 * @Description: SSH服务器配置文件夹
 * @youWant: add you want info here
 * @Date: 2019-04-10 14:47:17
 * @LastEditTime: 2019-04-18 14:00:05
 */
module.exports = Object.freeze({
  // 测试
  development: {
    SERVER_PATH: "xxx.xxx.xxx.xx", // ssh地址
    SSH_USER: "root", // ssh 用户
    SSH_KEY: "xxx", // ssh 密码
    PATH: '/usr/local' // 操作开始文件夹
  },
  // stage
  stage: {
    SERVER_PATH: "",
    SSH_USER: "",
    SSH_KEY: "",
    PATH: ''
  },
  // 正式
  production: {
    SERVER_PATH: "",
    SSH_USER: "",
    SSH_KEY: "",
    PATH: ''
  }
})