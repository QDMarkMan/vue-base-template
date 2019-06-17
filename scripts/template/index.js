/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @Version: 2.0
 * @Date: 2019-05-25 15:13:51
 * @LastEditors: etongfu
 * @LastEditTime: 2019-06-17 13:43:01
 * @Description: 文件模板管理模块
 * @youWant: add you want info here
 */
const fs = require('fs')
const path = require('path')
const os = require('os')
const readline = require('readline')
const {Log, DateUtil, StringUtil , LOCAL, ROOTPATH} = require('../util')
/**
 * 替换作者/时间/日期等等通用注释
 * @param {*string} content 内容
 * @param {*string} comment 注释
 * @todo 这个方法还有很大的优化空间
 */
const _replaceCommonContent = (content, comment) => {
  if (content === '') return ''
  // 注释对应列表 comments =  [ [文件中埋下的锚点, 将替换锚点的目标值] ]
  const comments = [
    ['_author_', LOCAL.config.AUTHOR],
    ['_email_', LOCAL.config.Email],
    ['_comment_', comment],
    ['_date_', DateUtil.getCurrentDate()]
  ]
  comments.forEach(item => {
    content = content.replace(item[0], item[1])
  })
  return content
}
/**
 * 生成Vue template文件
 * @param {*} moduleName 模块名称
 * @returns {*string}
 */
module.exports.buildVueFile = (moduleName, comment) => {
  const VueTemplate = fs.readFileSync(path.resolve(__dirname, './template.vue'))
  const builtTemplate = StringUtil.replaceAll(VueTemplate.toString(), "_module_", moduleName)
  return _replaceCommonContent(builtTemplate, comment)
}
/**
 * @author: etongfu
 * @description: 生成路由文件
 * @param {string} folder 文件夹名称 
 * @param {string} moduleName 模块名称
 * @returns  {*string}
 */
module.exports.buildRouteFile = (folder,moduleName, comment) => {
  const RouteTemplate = fs.readFileSync(path.resolve(__dirname, './route.template.js')).toString()
  // 因为路由比较特殊。路由模块需要指定的路径。所以在这里重新生成路由文件所需要的参数。
  const _mainPath = folder || moduleName
  const _filePath = folder == '' ? `${moduleName}` : `${folder}/${moduleName}`
  // 进行替换
  let builtTemplate = StringUtil.replaceAll(RouteTemplate, "_mainPath", _mainPath) // 替换模块主名称
  builtTemplate = StringUtil.replaceAll(builtTemplate, "_filePath", _filePath) // 替换具体路由路由名称
  builtTemplate = StringUtil.replaceAll(builtTemplate, "_module", moduleName) // 替换模块中的name
  return _replaceCommonContent(builtTemplate, comment)
}

/**
 * @author: etongfu
 * @description: 生成API文件
 * @param {string}  comment 注释
 * @returns:  {*}
 */
module.exports.buildApiFile = comment => {
  const ApiTemplate = fs.readFileSync(path.resolve(__dirname, './api.template.js')).toString()
  return _replaceCommonContent(ApiTemplate, comment)
}

/**
 * @author: etongfu
 * @description: 路由注入器
 * @param {string}  dirName
 * @param {string}  moduleName
 * @param {event}  event
 * @returns:  {*}
 */
module.exports.RouteHelper = class {
  constructor (dirName, moduleName, event) {
    // the dir path for router file
    this.dirName = dirName
    // the path for router file
    this.moduleName = moduleName
    // 事件中心
    this.event = event
    // route absolute path
    this.modulePath = path.join(ROOTPATH.routerPath, `${dirName}.js`)
  }
  /**
   * Generate a router for module
   * The vue file path is @/name/name/index
   * The default full url is http:xxxxx/name/name
   * @param {*} routeName url default is router name
   * @param {*string} filePath vue file path default is ${this.dirName}/${this.moduleName}/index
   * @returns {*Array} A string array for write line
   */
  generateRouter (routeName = this.moduleName, filePath = `${this.dirName}/${this.moduleName}/index`) {
    let temp = [
      `      // @Author: ${LOCAL.config.AUTHOR}`,
      `      // @Date: ${DateUtil.getCurrentDate()}`,
      `      {`,
      `        path: "/${this.dirName}/${routeName}",`,
      `        component: () => import("@/views/${filePath}"),`,
      `        name: "${routeName}"`,
      `      },`
    ]
    return temp
  }
  /**
   * add router to file
   */
  injectRoute () {
    try {
      const root = this.modulePath
      const _root = path.join(ROOTPATH.routerPath, `_${this.dirName}.js`)
      // temp file content
      let temp = []
      // file read or write
      let readStream = fs.createReadStream(root)
      // temp file
      let writeStream = fs.createWriteStream(_root)
      let readInterface = readline.createInterface(
        {
          input: readStream
        // output: writeStream
        }
      )
      // collect old data in file
      readInterface.on('line', (line) => {
        temp.push(line)
      })
      // After read file and we begin write new router to this file
      readInterface.on('close', async () => {
        let _index
        temp.forEach((line, index) => {
          if (line.indexOf('children') !== -1) {
            _index = index + 1
          }
        })
        temp = temp.slice(0, _index).concat(this.generateRouter(), temp.slice(_index))
        // write file
        temp.forEach((el, index) => {
          writeStream.write(el + os.EOL)
        })
        writeStream.end('\n')
        // 流文件读写完毕
        writeStream.on('finish', () => {
          fs.unlinkSync(root)
          fs.renameSync(_root, root)
          Log.success(`路由/${this.dirName}/${this.moduleName}注入成功`)
          //emit 成功事件
          this.event.emit('success', true)
        })
      })
    } catch (error) {
      Log.error('路由注入失败')
      Log.error(error)
    }
  }
}