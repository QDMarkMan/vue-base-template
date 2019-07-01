const http = require('http')
const fs = require('fs')
const path = require('path')
const { Log } = require('./util')
const httpPort = 8088
const filePath = path.resolve(__dirname, '../dist/index.html')
const open = require('open')


http.createServer((req, res) => {
  Log.logger(req.url)
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    // deal resource
    // if (req.url.startsWith('/static/css') || req.url.startsWith('/static/js') || req.url.startsWith('/static/img') || req.rl === '/favicon.ico') {
    if (req.url.indexOf('static') !== -1 || req.url.indexOf('vendor') !== -1 || req.url == "/favicon.ico") {
      const data = fs.readFileSync(path.resolve(__dirname, `../dist${req.url}`))
      return res.end(data)
    }
    // 
    res.setHeader('Content-Type','text/html;charset=utf-8')
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    })
  res.end(content)
  } catch (error) {
    Log.error('We cannot open "index.htm" file.')
  }
}).listen(httpPort, async () => {
  const location = `http://localhost:${httpPort}`
  Log.success(`Server listening on: ${location}, Open in the browser after 3 seconds`)
  // open default browser
  setTimeout(async ()=> {
    await open(location)
  }, 3000)
})