/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @Version: V2.0
 * @Date: 2019-06-03 17:35:48
 * @LastEditors: etongfu
 * @LastEditTime: 2019-06-13 15:53:50
 * @Description: 快速创建新模块/页面2.0 版本 基于问答模式的创建模块
 * 新建模块流程
 *  ==> 选择创建的类型 模块/页面
 *  ==> 请输入模块所属目录名称(英文 如果检测不到已输入目录将会默认新建，跳过此步骤将在Views文件夹下创建新模块)：
 *  ==> 没有找到目录的情况下创建目录
 *  ==> 找到目录的情况下输入输入模块名称(英文: )：
 * 
 * @youWant: add you want info here
 */
const inquirer = require('inquirer')
const path = require('path')
const { Log, FileUtil, LOCAL , ROOTPATH} = require('./util')
const { buildVueFile, buildRouteFile, buildApiFile, RouteFile } = require('./template')
const EventEmitter = require('events');
// 询问项
const questions = [
  {
    type: 'input',
    name: 'folder',
    message: "请输入所属目录名称(英文，如果检测不到已输入目录将会默认新建，跳过此步骤将在Views文件夹下创建新模块)："
  },
  {
    type: 'input',
    name: 'module',
    message: "请输入模块名称（英文）",
    // 格式验证
    validate: str => ( str !== '' && /^[A-Za-z0-9_-]+$/.test(str))
  },
  // 单一模块创建的时候才询问
  {
    type: 'confirm',
    message: `是否强制覆盖已存在同名文件夹?`,
    name: 'cover',
    when: function(answers) { // 当folder为空且module名称已经存在的时候才会提问当前问题
      return (answers.folder == '' && FileUtil.isPathInDir(answers.module, ROOTPATH.viewsPath))
    }
  }
]
// 配置项相关问题
const configQuestion = [
  {
    type: 'input',
    name: 'AUTHOR',
    message: "请输入作者（推荐使用拼音或者英文）",
    // 格式验证
    validate: str => ( str !== '' && /^[\u4E00-\u9FA5A-Za-z]+$/.test(str)),
    when: () => !Boolean(process.env.AUTHOR)
  },
  {
    type: 'input',
    name: 'Email',
    message: "请输入联系邮箱",
    // 格式验证
    /* validate: str => ( str !== '' && /^[\u4E00-\u9FA5A-Za-z]+$/.test(str)),
    when: () => !Boolean(process.env.AUTHOR) */
  }
]
// 判断本地配置环境
if (!LOCAL.hasEnvFile()) {
  questions.unshift(...configQuestion)
}
// 获取已经完成的大难
inquirer.prompt(questions).then(answers => {
  // 日志打印
  Log.logger(answers.folder == '' ? '即将为您' : `即将为您在${answers.folder}文件夹下` + `创建${answers.module}模块`)
  const {
    folder,
    module
  } = answers
  // 1: 配置文件的相关设置
  if (!LOCAL.hasEnvFile()) {
    LOCAL.buildEnvFile({
      AUTHOR: answers.AUTHOR,
      Email: answers.Email
    })
  }
  // 2: 执行目录和文件的创造
  buildDirAndFiles(folder, module)
})
// 注册事件处理中心
class RouteEmitter extends EventEmitter {}
const routeEmitter = new RouteEmitter() // 事件处理中心
routeEmitter.on('success', value => {
  // 创建成功
  if (value) {
    process.exit(1)
  }
})
// module-method map
// create module methods
const generates = new Map([
  // views部分
  // 2019年6月12日17:39:29 完成
  ['view',async (folder, module) => {
    // 目录和文件的生成路径
    const folderPath = path.join(ROOTPATH.viewsPath,folder,module)
    const vuePath = path.join(folderPath, '/index.vue')
    // vue文件生成
    await FileUtil.createDirAndFile(vuePath, buildVueFile(module), folderPath)
  }],
  // router is not need new folder
  ['router', async (folder, module, isNewDir) => {
    /**
     * @des 路由文件和其他的文件生成都不一样， 如果是新的目录那么生成新的文件。
     * 但是如果module所在的folder 已经存在了那么就对路由文件进行注入。
     * @reason 因为我们当前项目的目录分层结构是按照大模块来划分， 即src下一个文件夹对应一个router/modules中的一个文件夹
     * 这样做使得我们的目录结构和模块划分都更加的清晰。
     */
    if (isNewDir) {
      // 如果folder不存在 那么直接使用module命名 folder不存在的情况是直接在src根目录下创建模块
      const routerPath = path.join(ROOTPATH.routerPath, `/${folder || module}.js`)
      await FileUtil.createDirAndFile(routerPath, buildRouteFile(folder, module))
    } else {
      const route = new RouteFile(folder, module, routeEmitter)
      route.injectRoute()
    }
  }],
  ['api', async (folder, module, isNewDir) => {
    // inner module will not add new folder
    // 如果当前的模块已经存在的话那么就在当前模块的文件夹下生成对应的模块js
    const targetFile = isNewDir ? `/index.js` : `/${module}.js`
    // 存在上级目录就使用上级目录  不存在上级目录的话就是使用当前模块的名称进行创建
    const filePath = path.join(ROOTPATH.apiPath, folder || module)
    const apiPath = path.join(filePath, targetFile)
    await FileUtil.createDirAndFile(apiPath, buildApiFile(), filePath)
  }]
])
/**
 * 通过我们询问的答案来创建文件/文件夹
 * @param {*} folder 
 * @param {*} module 
 */
function buildDirAndFiles (folder, module) {
  let _tempFloder = folder || module // 临时文件夹 如果当前的文件是
  let isNewDir
  // 如果没有这个目录那么就新建这个目录
  if (!FileUtil.isPathInDir(_tempFloder, ROOTPATH.viewsPath)) {
    rootDirPath = path.join(ROOTPATH.viewsPath, _tempFloder)
    // create dir for path
    FileUtil.createDir(rootDirPath)
    Log.success(`已创建${folder ? '目录' : "模块"}${_tempFloder}`)
    isNewDir = true
  } else {
    isNewDir = false
  }

  // 循环操作进行
  let _arrays = [...generates]
  _arrays.forEach((el, i) => {
    if (i < _arrays.length) {
      el[1](folder, module, isNewDir)
    } else {
      Log.success("模块创建成功!")
      process.exit(1)
    }
  })
}