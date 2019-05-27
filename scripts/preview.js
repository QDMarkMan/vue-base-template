/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @Version: 
 * @Date: 2019-05-27 16:09:35
 * @LastEditors: etongfu
 * @LastEditTime: 2019-05-27 16:15:28
 * @Description: 本地预览打包后网站
 * @youWant: add you want info here
 */

const connect = require('connect')
const serveStatic = require('serve-static')
const chalk = require('chalk')
const port = 3000
const publicPath = '/'
const app = connect()

app.use(
  publicPath,
  serveStatic('./dist', {
    index: ['index.html', '/']
  })
)

app.listen(port, function () {
  console.log(chalk.green(`>You can preview at  http://localhost:${port}${publicPath}`))
  /* if (report) {
    console.log(chalk.green(`> Report at  http://localhost:${port}${publicPath}report.html`))
  } */
})