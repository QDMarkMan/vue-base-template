/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @LastEditors: etongfu
 * @Description: 项目模块文件生成助手  ⭐Beta版本：使用中出现问题请提交issue并提交
 * @youWant: add you want info here
 * @Date: 2019-02-25 15:18:58
 * @LastEditTime: 2019-03-12 09:27:30
 * @todo:  1: vue单独模块文件生成
 * @issue: add you issues here
 */
// current process argumengts
const argumentsList = process.argv
const readline = require('readline')
const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const os = require('os')
const { vueFile, routerFile, apiFile } = require('./files')

const reslove = file => path.resolve(__dirname, '../src', file)
// symbol const
const RouterSymbol = Symbol('router')
const ApiSymbol = Symbol('api')
const ViewsSymbol = Symbol('views')
// root path
const rootPath = {
  [RouterSymbol]: reslove('router/modules'),
  [ApiSymbol]: reslove('api'),
  [ViewsSymbol]: reslove('views')
}
// loggs
const errorLog = error => console.log(chalk.red(`${error}`))
const defaultLog = log => console.log(chalk.green(`${log}`))
// create file options
let extractArgFromProcess = function () {
  const _tempArr = argumentsList.splice(2);
  return _tempArr.map(
    el => el.substring(2)
  )
}
// 创建选项
let createOptions = extractArgFromProcess()
/**
 * tools for dir
 */
class GenerateTools {
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
  static isFileInDir (dir, existsPath) {
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
   * @param {*} filePath
   * @param {*} content
   * @param {*} dirPath
   */
  static async createDirAndFile (filePath, content, dirPath = '') {
    try {
      // create file if file not exit
      if (dirPath !== '' && !await fs.existsSync(dirPath)) {
        await fs.mkdirSync(dirPath)
        defaultLog(`created ${dirPath}`)
      }
      if (!await fs.existsSync(filePath)) {
        // create file
        await fs.openSync(filePath, 'w')
        defaultLog(`created ${filePath}`)
      }
      await fs.writeFileSync(filePath, content, 'utf8')
    } catch (error) {
      errorLog(error)
    }
  }
  /**
   * create dir
   * @param {*} dirPath
   */
  static createDir (dirPath) {
    fs.mkdirSync(dirPath)
    defaultLog(`created ${dirPath}`)
  }
  /**
   * Call create files method
   * @param {*string} moduleName name for module
   * @param {*string} dirName  dir name
   * @param {*boolean} isSub Is this module is a sub module
   */
  static callCreateFiles (moduleName, isSub = false) {
    files.forEach(async (el, index) => {
      // await generates.get(`${el}`).call(null, moduleName, isSub)
      await generates.get(`${el}`)(moduleName, isSub)
      if (index === files.length - 1) {
        process.stdin.emit('end')
      }
    })
  }
}
/**
 * 处理不同类型的模块创建
 * @param {*} isSimpleModule
 * @param {*} stringChunk
 */
const dealFileType = function (isSimpleModule, chunkString) {
  /* console.log(isSimpleModule)
  console.log(isNewDir) */
  // 如果是简单模块的创建 那么就是创建新模块
  if (isSimpleModule) {
    isNewDir = true
  }
  if (!moduleName) {
    moduleName = chunkString
    // 扫描的路径
    // const scanPath = path.join(rootDirPath, isSimpleModule ? '' : dirName)
    const scanPath = path.join(rootDirPath)

    // console.log(scanPath);
    // check file module
    if (GenerateTools.isFileInDir(moduleName, scanPath)) {
      defaultLog(`检测到已经存在${chunkString}文件夹，是否进行覆盖操作？(y/n：n退出程序)`)
    } else {
      defaultLog(`即将开始创建新模块${moduleName}`)
      // create new Module
      GenerateTools.callCreateFiles(moduleName, dirName)
    }
    // 已经存在模块名称了
  } else {
    // 判断当前是否需要需要覆盖操作
    if (!chunkString) {
      return defaultLog(`检测到已经存在${chunkString}模块，是否进行覆盖操作？(y/n：n退出程序)`)
    } else {
      continueCreateSub = chunkString.toUpperCase()
      // 判断覆盖操作类型
      if (continueCreateSub === 'Y') {
        // const createPath = path.join(rootDirPath, dirName ? dirName : '' )
        defaultLog(`即将覆盖创建新模块${moduleName}`)
        GenerateTools.callCreateFiles(moduleName, dirName)
      } else {
        // end current create
        return process.stdin.emit('end')
      }
    }
  }
}
/**
 * Create dir and file
 * @param {*} filePath
 * @param {*} content
 * @param {*} dirPath
 */
const createDirAndFile = async (filePath, content, dirPath = '') => {
  try {
    // create file if file not exit
    if (dirPath !== '' && !await fs.existsSync(dirPath)) {
      await fs.mkdirSync(dirPath)
      defaultLog(`created ${dirPath}`)
    }
    if (!await fs.existsSync(filePath)) {
      // create file
      await fs.openSync(filePath, 'w')
      defaultLog(`created ${filePath}`)
    }
    await fs.writeFileSync(filePath, content, 'utf8')
  } catch (error) {
    errorLog(error)
  }
}
// 是否有注入路由操作， 因为这个操作是异步的所以要加上标记
let injectRouteSuccess = true
/**
 * router file generate
 */
class RouteFile {
  constructor (moduleName, dirName) {
    // the dir path for router file
    this.dirName = dirName
    // the path for router file
    this.moduleName = moduleName
    // route absolute path
    this.modulePath = path.join(rootPath[RouterSymbol], `${dirName}.js`)
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
      `      {`,
      `        path: "/${this.dirName}/${routeName}",`,
      `        component: () => import("@/views/${filePath}"),`,
      `        name: ""`,
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
      const _root = path.join(rootPath[RouterSymbol], `_${this.dirName}.js`)
      // temp file content
      let temp = []
      // file read or write
      let readStream = fs.createReadStream(root)
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
          injectRouteSuccess = true
          defaultLog(`路由/${this.dirName}/${this.moduleName}注入成功`)
          process.stdin.emit('end')
        })
      // next step：remove old demo.js and rename _module.js to module.js
      })
    } catch (error) {
      errorLog('路由注入失败')
      errorLog(error)
    }
  }
}
// create module methods
const generates = new Map([
  /**
   * 增加页面和路由
   * @param {*} releativePath 相对views的路径
   * @param {*} dir
   * @param {*} fileName
   */
  ['pageAndRouter', async (releativePath, dir, fileName) => {
    // 1：先生成vue文件

    // 2：再注入路由

    const targetDir = isSimpleModule ? `./${dir}` : `./${dir}/${module}`
    const filePath = path.join(rootPath[ViewsSymbol], targetDir)
    const vuePath = path.join(filePath, `/${fileName}.vue`)
    await createDirAndFile(vuePath, vueFile(moduleName), filePath)
  }],
  // views部分
  ['view', async (module, dir) => {
    // simple module 表示着在子目录下直接创建vue文件
    const targetDir = isSimpleModule ? `./${dir}` : `./${dir}/${module}`
    const filePath = path.join(rootPath[ViewsSymbol], targetDir)
    const vuePath = path.join(filePath, '/index.vue')
    await createDirAndFile(vuePath, vueFile(module), filePath)
  }],
  // router is not need new folder
  ['router', async (module, dir) => {
    if (isNewDir) {
      const routerPath = path.join(rootPath[RouterSymbol], `/${dir}.js`)
      await createDirAndFile(routerPath, routerFile(module, dir, isSimpleModule))
    } else {
      injectRouteSuccess = false
      const route = new RouteFile(module, dir)
      route.injectRoute()
    }
  }],
  ['api', async (module, dir) => {
    // inner module will not add new folder
    // 如果当前的模块已经存在的话那么就在当前模块的文件夹下生成对应的模块js
    const targetFile = isNewDir ? `/index.js` : `/${module}.js`
    // 存在上级目录就使用上级目录  不存在上级目录的话就是使用当前模块的名称进行创建
    const filePath = path.join(rootPath[ApiSymbol], dir || module)
    const apiPath = path.join(filePath, targetFile)
    await createDirAndFile(apiPath, apiFile(module), filePath)
  }]
])
// moduleName: global module name / continueCreateSub: is continue create sub module  y/n  / coverCheck ==> already need check  / rootDirPath: 自定义目录
let dirName, moduleName, continueCreateSub, rootDirPath
// 是否是新的文件夹
let isNewDir = false
// 是否是无上层目录的模块
let isSimpleModule = false
// get dirs in views
let existsFilesInViews = GenerateTools.getExistsDirsByPath(rootPath[ViewsSymbol]) // already exists module
// files
const files = ['view', 'router', 'api']

// 在没有输入参数的时候 进行文件和模块的监听
if (createOptions.length === 0) {
  // 增加模块listener
  addDirAndModuleListener()
} else {
  addPageListener()
}
// 页面存放位置
let vueFileSavePath
function addPageListener () {
  console.log(createOptions)

  defaultLog(`即将创建vue ${createOptions[1]}页面文件，请输入页面文件相对于views目录的存放位置(将根据位置生成路由文件)：`)

  process.stdin.on('data', async (chunk) => {
    // slice /n
    chunk = chunk.slice(0, -2)
    // buffer to string
    const chunkString = chunk.toString()
    if (chunkString) {
      vueFileSavePath = chunkString
      const absolutePath = path.join(rootPath[ViewsSymbol], vueFileSavePath)
      const vueFilesArr = vueFileSavePath.split('/')
      console.log(vueFilesArr)
      if (fs.existsSync(absolutePath)) {
        defaultLog(`即将在${absolutePath}下创建文件`)
      } else {
        vueFileSavePath = ''
        return defaultLog(`输入位置不存在请重新输入：`)
      }
    } else {
      if (!vueFileSavePath) {
        return defaultLog(`请输入保存位置：`)
      }
    }
  })
}
/**
 * 创建模块交互器
 */
function addDirAndModuleListener () {
  // ask module name
  defaultLog(`请输入模块所属目录名称(英文 如果检测不到已输入目录将会默认新建，跳过此步骤将在Views文件夹下创建新模块)：`)
  // get new moduule name
  process.stdin.on('data', async (chunk) => {
    try {
      // slice /n
      chunk = chunk.slice(0, -2)
      // buffer to string
      const chunkString = chunk.toString()
      // 检测用户当前是否有输入
      if (chunkString) {
        // 有输入的情况
        if (!dirName) {
          dirName = chunkString
          // 如果是没有上级目录的简单模块
          if (!isSimpleModule) {
            // 如果没有这个目录 那么新建一个新的目录
            if (!GenerateTools.isFileInDir(dirName)) {
              rootDirPath = path.join(rootPath[ViewsSymbol], dirName)
              // create dir for path
              GenerateTools.createDir(rootDirPath)
              defaultLog(`已创建目录${dirName}`)
              isNewDir = true
            } else {
              isNewDir = false
              rootDirPath = path.join(rootPath[ViewsSymbol])
            }
            defaultLog(`模块目录为${dirName}, 请输入模块名称(英文: )：`)
          } else {
            // 简单模式下创建模块
            defaultLog(`开始创建简单模块${chunkString}`);
            dealFileType(isSimpleModule, chunkString)
          }
        } else {
          dealFileType(isSimpleModule, chunkString)
        }
      } else {
        // 用户没有输入的情况
        if (!dirName) {
          // 上层目录为空的时候 使用module name 作为当前的模块名称
          rootDirPath = path.join(rootPath[ViewsSymbol])
          isSimpleModule = true
          defaultLog(`即将在views目录下创建模块, 请输入模块名称(英文)：`)
          // return defaultLog(`请输入模块所属目录名称(英文: 如果没有将会默认新建)：`)
        } else {
          if (!moduleName) {
            return defaultLog(`请输入模块名称(英文: )：`)
          }
        }
      }
    } catch (error) {
      errorLog(error)
    }
  })
}

process.stdin.on('end', () => {
  if (injectRouteSuccess) {
    // 判断
    defaultLog('Created')
    process.exit(0)
  }
})

