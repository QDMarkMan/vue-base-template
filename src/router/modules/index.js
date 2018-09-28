const files = require.context('.', true, /\.js$/)
let configRouters = []
files.keys().forEach(key => {
  if (key === './index.js') return
  configRouters = configRouters.concat(files(key).default)
})
export default configRouters
