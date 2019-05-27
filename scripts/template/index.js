/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @Version: 
 * @Date: 2019-05-25 15:13:51
 * @LastEditors: etongfu
 * @LastEditTime: 2019-05-25 15:24:18
 * @Description: 文件生成模块重构==> 进行中
 * @youWant: add you want info here
 */

const fs = require('fs')
const path = require('path')

const VueTemplate = fs.readFileSync(path.resolve(__dirname, './template.vue'))

const myTemplaye = VueTemplate.toString().replace("$template", "aaa")

console.log(myTemplaye)