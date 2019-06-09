/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @Version: V2.0
 * @Date: 2019-06-03 17:35:48
 * @LastEditors: etongfu
 * @LastEditTime: 2019-06-09 13:41:24
 * @Description: 快速创建新模块/页面2.0 版本 基于问答模式的创建模块
 * 新建模块流程
 *  ==> 选择创建的类型 模块/页面
 *  ==> 请输入模块所属目录名称(英文 如果检测不到已输入目录将会默认新建，跳过此步骤将在Views文件夹下创建新模块)：
 *  ==> 没有找到目录的情况下创建目录
 *  ==> 找到目录的情况下输入输入模块名称(英文: )：
 *  ==> 打印生成文件日志（End）
 * 
 * @youWant: add you want info here
 */
const inquirer = require('inquirer')
const path = require('path')
const { Log } = require('./util')
const reslove = file => path.resolve(__dirname, '../src', file)
// root path
const ROOTPATH = Object.freeze({
  routerPath: reslove('router/modules'),
  apiPath: reslove('api'),
  viewsPath: reslove('views')
})
// 询问项
const questions = [
  {
    type: 'list',
    message: '请选择创建类型',
    name: 'isModule',
    choices: [
      {
        name: '模块',
        value: true
      },
      {
        name: '页面',
        value: false
      }
    ]
  },
  {
    type: 'input',
    name: 'folder',
    message: "请输入所属目录名称(英文，如果检测不到已输入目录将会默认新建，跳过此步骤将在Views文件夹下创建新模块)：",
    when: function(answers) { // 当watch为true的时候才会提问当前问题
      return answers.isModule
    }
  },
  {
    type: 'input',
    name: 'module',
    message: "请输入模块名称（英文）"
  },
  
  /* {
    type: "input",
    message: "您输入的文件夹不存在请重新输入",
    name: "filter",
    suffix: "后缀",
    when: function(answers) { // 当watch为true的时候才会提问当前问题
      return answers.isModule
    }
  },
  {
    type: 'confirm',
    message: '是否强制覆盖已存在同名文件夹?',
    name: 'cover'
  }*/
]
// 获取已经完成的大难
inquirer.prompt(questions).then(answers => {
  Log.logger(JSON.stringify(answers, null, '  '))
  const {
    isModule,
    folder,
    module
  } = questions
  
  buildDirAndFiles(folder, module)
})
/**
 * 通过我们询问的答案来创建文件/文件夹
 * @param {*} isModule 
 * @param {*} folder 
 * @param {*} module 
 */
function buildDirAndFiles (isModule, folder, module) {
  // 第一步 先判断目录是否存在
  
}
/** 
 * 生成文件/文件夹
 * @param {*} filePath 
 * @param {*} content 
 * @param {*} dirPath 
 */
const generateFile = async (filePath, content, dirPath = '') => {
  try {
    // create file if file not exit
    if (dirPath !== '' && ! await fs.existsSync(dirPath)) {
      await fs.mkdirSync(dirPath)
      Log.success(`created ${dirPath}`)
    }
    if (!await fs.existsSync(filePath)) {
      // create file
      await fs.openSync(filePath, 'w')
      Log.success(`created ${filePath}`)
    }
    await fs.writeFileSync(filePath, content, 'utf8')
  } catch (error) {
    errorLog(error)
  }
}