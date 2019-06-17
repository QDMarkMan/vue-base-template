/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @Version: 
 * @Date: 2019-06-03 17:39:27
 * @LastEditors: etongfu
 * @LastEditTime: 2019-06-17 16:11:36
 * @Description: 脚本工具文件
 * @youWant: add you want info here
 */
const chalk = require('chalk')
const path = require('path')
const dotenv = require('dotenv')
const fs = require('fs')
// local配置
module.exports.LOCAL = class  {
  /**
   * env path
   */
  static get envPath () {
    return path.resolve(__dirname, './.env.local')
  }
  /**
   * 配置文件
   */
  static get config () {
    // ENV 文件查找优先查找./env.local
    const ENV = fs.readFileSync(path.resolve(__dirname, './.env.local')) || fs.readFileSync(path.resolve(__dirname, '../.env.development.local'))
    // 转为config
    const envConfig = dotenv.parse(ENV)
    return envConfig
  }
  /**
   * 创建.env配置文件文件
   * @param {*} config 
   * @description 创建的env文件会保存在scripts文件夹中
   */
  static buildEnvFile (config = {AUTHOR: ''}) {
    if (!fs.existsSync(this.envPath)) {
      console.log(this.envPath)
      // create a open file
      fs.openSync(this.envPath, 'w')
    }
    let content = ''
    // 判断配置文件是否合法
    if (Object.keys(config).length > 0) {
      // 拼接内容
      for (const key in config) {
        let temp = `${key} = ${config[key]}\n`
        content += temp
      }
    }
    // write content to file
    fs.writeFileSync(this.envPath, content, 'utf8')
    Log.success(`local env file ${this.envPath} create success`)
  }
  /**
   * 检测env.loacl文件是否存在
   */
  static hasEnvFile () {
    return fs.existsSync(path.resolve(__dirname, './.env.local')) || fs.existsSync(path.resolve(__dirname, '../.env.development.local'))
  }
}

/**
 * @author: etongfu
 * @description: 日志帮助文件
 */
class Log {
  static logger (msg) {
    console.log(chalk.blue(`${msg}`))
  }

  static success (msg) {
    console.log(chalk.green(`${msg}`))
  }

  static warning (msg) {
    console.log(chalk.yellow(`${msg}`))
  }

  static error (msg) {
    console.log(chalk.red(`${msg}`))
  }
}
module.exports.Log = Log

/**
 * 字符串Util
 */
module.exports.StringUtil = class {
  /**
   * 全局替换字符串
   * @param {*} targetStr 
   * @param {*} oldStr 
   * @param {*} newStr 
   */
  static replaceAll (str, AFindText, ARepText) {
    let raRegExp = new RegExp(AFindText, "g")
    return str.replace(raRegExp, ARepText)
  }
  /**
  * 去除空格(字符串,要去除空格的类型)
  * type 1-所有空格  2-前后空格  3-前空格 4-后空格
  */
  static trim (str, type) {
  switch (type) {
    case 1:
      return str.replace(/\s+/g, "");
    case 2:
      return str.replace(/(^\s*)|(\s*$)/g, "");
    case 3:
      return str.replace(/(^\s*)/g, "");
    case 4:
      return str.replace(/(\s*$)/g, "");
    default:
      return str;
    }
  };
}
/**
 * 文件操作Util
 */
module.exports.FileUtil = class {
  /**
   * get directory bt target path
   * @param {*} path
   */
  static getExistsDirsByPath (targetPath) {
    const _files = fs.readdirSync(targetPath)
    const _temp = _files.filter(el => {
      let currentPath = path.join(targetPath, `./${el}`)
      const fileStats = fs.statSync(currentPath)
      if (fileStats.isDirectory()) {
        return el
      }
    })
    return _temp
  }
  /**
   * Check file is alredy in dir  true/fasle  => yes/no
   * @param {*string} dir  文件夹名称
   * @param {*string} existsPath  制定文件夹路径
   */
  static isPathInDir (dir, existsPath) {
    let files = []
    if (!existsPath) {
      // views dir
      files = existsFilesInViews
    } else {
      // get dirs by path
      files = this.getExistsDirsByPath(existsPath)
    }
    return (files.indexOf(dir) !== -1)
  }
  /**
   * If module is Empty then create dir and file
   * @param {*} filePath .vue/.js 文件路径
   * @param {*} content 内容
   * @param {*} dirPath 文件夹目录
   */
  static createDirAndFile (filePath, content, dirPath = '') {
    try {
      // create dic if file not exit
      if (dirPath !== '' && ! fs.existsSync(dirPath)) {
        // mkdir new dolder
        fs.mkdirSync(dirPath)
        Log.success(`created ${dirPath}`)
      }
      if (!fs.existsSync(filePath)) {
        // create a open file
        fs.openSync(filePath, 'w')
        Log.success(`created ${filePath}`)
      }
      // write content to file
      fs.writeFileSync(filePath, content, 'utf8')
    } catch (error) {
      Log.error(error)
    }
  }
  /**
   * create dir
   * @param {*} dirPath
   */
  static createDir (dirPath) {
    fs.mkdirSync(dirPath)
    // Log.success(`created ${dirPath}`)
  }
}
const initDateStr = str => (str >= 0 && str <= 9) ? `0${str}` : str 
module.exports.DateUtil = class {
  /**
   * @author: etongfu
   * @description: 获取当前时间
   * @param {format}  {*} 格式 date:YYYY-MM-DD time: hh:mm:ss full:YYYY-MM-DD hh:mm:ss
   * @param {useCN} 使用中文
   * @returns: {*String}
   */
  static getCurrentDate (format = "YYYY-MM-DD hh:mm:ss", useCN = false) {
    const types = ["YYYY-MM-DD", "YYYY-MM-DD hh:mm:ss", "hh:mm:ss"]
    // 在null或者不传的情况下进行默认值传递
    if (types.indexOf(format) === -1) format = types[0]
    const date = new Date() ,seperator1 = "-" , seperator2 = ":"
    let month = initDateStr(date.getMonth() + 1) , strDate = initDateStr(date.getDate()), hours = initDateStr(date.getHours()), minutes = initDateStr(date.getMinutes()) , seconds = initDateStr(date.getSeconds())
    let currentdate = ""
    switch (types.indexOf(format)) {
      case 0:
        currentdate = useCN ? date.getFullYear() + "年" + month + "月" + strDate + "日" : date.getFullYear() + seperator1 + month + seperator1 + strDate
        break;
      case 1:
        currentdate =
          useCN ? 
          date.getFullYear() +
          "年" +
          month +
          "月" +
          strDate +
          "日 " +
          hours +
          seperator2 +
          minutes +
          seperator2 +
          seconds
          : date.getFullYear() +
          seperator1 +
          month +
          seperator1 +
          strDate +
          " " +
          hours +
          seperator2 +
          minutes +
          seperator2 +
          seconds
        break;
      case 2:
        currentdate = hours + seperator2 + minutes + seperator2 + date.getSeconds()
        break;
      default:
        currentdate = useCN ? date.getFullYear() + "年" + month + "月" + strDate + "日" : date.getFullYear() + seperator1 + month + seperator1 + strDate
        break;
    }
    return currentdate
  }
}
// root path
const reslove = (file = '.') => path.resolve(__dirname, '../src', file)
const ROOTPATH = Object.freeze({
  srcPath: reslove(),
  routerPath: reslove('router/modules'),
  apiPath: reslove('api'),
  viewsPath: reslove('views')
})
module.exports.ROOTPATH = ROOTPATH