/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @Version: 
 * @Date: 2019-05-24 17:46:15
 * @LastEditors: etongfu
 * @LastEditTime: 2019-05-25 13:26:07
 * @Description: 打包hooks
 * @youWant: add you want info here
 */
const inquirer = require('inquirer')
// hooks after build
const builtHooks = () => {
  inquirer.prompt([
    {
      type: 'list',
      message: `检测到${config.dev.runDev || 'admin'}平台 production环境打包完成，是否马上进行发布？`,
      name: 'doNext',
      choices: [
        {
          name: 'Yes',
          value: true
        },
        {
          name: 'NO',
          value: false
        }
      ]
    }
  ]).then(answers => {
    if(answers.doNext) {
      // 选择YES 执行打包
      // require('../scripts/release')
    } else {
      process.exit(0)
    }
  })
}
module.exports = builtHooks
