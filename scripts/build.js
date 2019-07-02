/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @Version: 
 * @Date: 2019-06-12 18:06:24
 * @LastEditors: etongfu
 * @LastEditTime: 2019-07-02 09:45:24
 * @Description: 进行打包相关操作
 * @youWant: add you want info here
 */

'use strict'
process.env.NODE_ENV = process.env.NODE_ENV == 'beta' ? 'beta' : 'production'
const ora = require('ora')
const { sh } = require('tasksfile')
// const shell = require('shelljs') 
const builtHooks = require('./build-hooks')
const rawArgv = process.argv.slice(2)
const args = rawArgv.join(' ')

const spinner = ora(`building for ${process.env.NODE_ENV}...\n`)
spinner.start()
// real pack command
sh(`vue-cli-service build ${args}`, {
  silent: false
})
// build success
spinner.succeed("打包完成, 进行下一步操作")
// delay 2s
setTimeout(() =>{
  // run hooks
  builtHooks()
},2000)
