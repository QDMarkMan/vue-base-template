/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @Version: 
 * @Date: 2019-05-25 13:46:29
 * @LastEditors: etongfu
 * @LastEditTime: 2019-07-12 10:38:09
 * @Description: ssh 配置文件
 * @youWant: add you want info here
 */
module.exports = Object.freeze({
  // development
  development: {
    SERVER_PATH: "xxx.xxx.xxx.xx", // ssh地址
    SSH_USER: "root", // ssh 用户
    SSH_KEY: "xxx", // ssh 密码 / private key文件地址
    PATH: '/usr/local' // 操作开始文件夹
  },
  // staging
  staging: {
    SERVER_PATH: "",
    SSH_USER: "",
    SSH_KEY: "",
    PATH: ''
  },
  // production
  production: {
    SERVER_PATH: "",
    SSH_USER: "",
    SSH_KEY: "",
    PATH: ''
  }
})