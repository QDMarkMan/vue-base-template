/**
 * preview page
 */
const express = require("express")
const chalk =  require('chalk')
const history = require('connect-history-api-fallback')
const app = express()
// 前端路由去哈希
app.use(history(
  /* {
    htmlAcceptHeaders: ['text/html', 'application/xhtml+xml']
  } */
))
app.use("/",express.static(__dirname + "/dist"))
app.listen(3000, () => {
  console.log(chalk.blue.bold('open local server for preview build on http:127.0.0.1:3000'))
})