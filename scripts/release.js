/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @LastEditors: etongfu
 * @Description: auto publish by SSH scripts
 * @youWant: add you want info here
 * @Date: 2019-04-10 14:45:17
 * @LastEditTime: 2019-04-18 14:02:39
 */
const fs = require('fs')
const path = require('path')
const ora = require('ora')
const zipper = require('zip-local')
const shell = require('shelljs')
const chalk = require('chalk')
const CONFIG = require('../config/release.confg')
let config
const inquirer = require('inquirer')
const node_ssh = require('node-ssh')
let SSH = new node_ssh()
// loggs
const errorLog = error => console.log(chalk.red(`*********${error}*********`))
const defaultLog = log => console.log(chalk.blue(`*********${log}*********`))
const successLog = log => console.log(chalk.green(`*********${log}*********`))
// 文件夹位置
const distDir = path.resolve(__dirname, '../dist')
const distZipPath = path.resolve(__dirname, '../dist.zip')
// ********* 打包代码 *********
const compileDist = async () => {
  // 进入本地文件夹
  shell.cd(path.resolve(__dirname, '../'))
  shell.exec(`npm run build`)
  successLog('编译完成')
}
// ********* 压缩dist 文件夹 *********
const zipDist =  async () => {
  try {
    if(fs.existsSync(distZipPath)) {
      defaultLog('dist.zip已经存在, 即将删除压缩包')
      fs.unlinkSync(distZipPath)
    } else {
      defaultLog('即将开始压缩zip文件')
    }
    await zipper.sync.zip(distDir).compress().save(distZipPath);
    successLog('文件夹压缩成功')
  } catch (error) {
    errorLog(error)
    errorLog('压缩dist文件夹失败')
  }
}
// ********* 连接ssh *********
const connectSSh = async () =>{
  defaultLog(`尝试连接服务： ${config.SERVER_PATH}`)
  let spinner = ora('正在连接')
  spinner.start()
  try {
    await SSH.connect({
      host: config.SERVER_PATH,
      username: config.SSH_USER,
      password: config.SSH_KEY
    })
    spinner.stop()
    successLog('SSH 连接成功')
  } catch (error) {
    errorLog(err)
    errorLog('SSH 连接失败');
  }
}
// ********* 执行清空线上文件夹指令 *********
const runCommond = async (commond) => {
  const result = await SSH.exec(commond,[], {cwd: config.PATH})
  defaultLog(result)
}
const commonds = [`ls`, `rm -rf *`]
// ********* 执行清空线上文件夹指令 *********
const runBeforeCommand = async () =>{
  for (let i = 0; i < commonds.length; i++) {
    await runCommond(commonds[i])
  }
}
// ********* 通过ssh 上传文件到服务器 *********
const uploadZipBySSH = async () => {
  // 连接ssh
  await connectSSh()
  // 执行前置命令行
  await runBeforeCommand()
  // 上传文件
  let spinner = ora('准备上传文件').start()
  try {
    await SSH.putFile(distZipPath, config.PATH + '/dist.zip')
    successLog('完成上传')
    spinner.text = "完成上传, 开始解压"
    await runCommond('unzip ./dist.zip')
  } catch (error) {
    errorLog(error)
    errorLog('上传失败')
  }
  spinner.stop()
}
// ********* 发布程序 *********
/**
 * 通过配置文件检查必要部分
 * @param {*dev/prod} env 
 * @param {*} config 
 */
const checkByConfig = (env, config = {}) => {
  const errors = new Map([
    ['SERVER_PATH',  () => {
      // 预留其他校验
      return config.SERVER_PATH == '' ? false : true
    }],
    ['SSH_USER',  () => {
      // 预留其他校验
      return config.SSH_USER == '' ? false : true
    }],
    ['SSH_KEY',  () => {
      // 预留其他校验
      return config.SSH_KEY == '' ? false : true
    }],
    ['SSH_KEY',  () => {
      // 预留其他校验
      return config.SSH_KEY == '' ? false : true
    }]
  ])
  if (Object.keys(config).length === 0) {
    errorLog('配置文件为空， 请检查配置文件')
    process.exit(0)
  } else {
    Object.keys(config).forEach((key) => {
      let result = errors.get(key) ? errors.get(key)() : true
      if (!result) {
        errorLog(`配置文件中配置项${key}设置异常，请检查配置文件`)
        process.exit(0)
      }
    })
  }
  
}
// ********* 发布程序 *********
const runTask = async () => {
  // await compileDist()
  await zipDist()
  await uploadZipBySSH()
  successLog('发布完成!')
  SSH.dispose()
}
// ********* 执行交互 *********
inquirer.prompt([
  {
    type: 'list',
    message: '请选择发布环境',
    name: 'env',
    choices: [
      {
        name: '测试环境',
        value: 'dev'
      },
      {
        name: '正式环境',
        value: 'prod'
      }
    ]
  }
]).then(answers => {
  config = CONFIG[answers.env]
  console.log(config)
  // 检查配置文件
  checkByConfig(answers.env, config)
  // runTask()
})