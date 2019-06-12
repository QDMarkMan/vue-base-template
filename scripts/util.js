/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @Version: 
 * @Date: 2019-06-03 17:39:27
 * @LastEditors: etongfu
 * @LastEditTime: 2019-06-12 17:23:21
 * @Description: 脚本工具文件
 * @youWant: add you want info here
 */
const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
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
  static async createDirAndFile (filePath, content, dirPath = '') {
    try {
      // create dic if file not exit
      if (dirPath !== '' && !await fs.existsSync(dirPath)) {
        // mkdir new dolder
        await fs.mkdirSync(dirPath)
        Log.success(`created ${dirPath}`)
      }
      if (!await fs.existsSync(filePath)) {
        // create a open file
        await fs.openSync(filePath, 'w')
        Log.success(`created ${filePath}`)
      }
      // write content to file
      await fs.writeFileSync(filePath, content, 'utf8')
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
