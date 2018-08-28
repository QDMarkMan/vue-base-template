'use strict'

process.env.NODE_ENV = 'production'

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const shell = require('shelljs')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')

const spinner = ora('building for production...')
spinner.start()
// shell dll.js
const asasetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
console.log(chalk.yellow('\n shell dll begin'))
shell.rm('-rf', asasetsPath)
shell.mkdir('-p', asasetsPath)
shell.config.silent = true
shell.cp('-R', 'static/js/*', asasetsPath)
shell.cp('-R', 'static/tinymce/*', asasetsPath)
shell.config.silent = false
console.log(chalk.cyan('shell dll complete.\n'))


rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
