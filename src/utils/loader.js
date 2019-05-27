/**
 * 加载远程script
 * @param {*Array} scripts 
 */
const loadScript = function (scripts) {
  return new Promise((resolve, reject) => {
    const scriptsCount = scripts.length
    let loaded = 0 // 已加载个数
    // 查询已有选项进行去重
    const oldScripts = [...document.getElementsByTagName('script')]
    // 去除已存在scripts
    oldScripts.forEach((script) => {
      const url = script.getAttribute('src') 
      if (scripts.indexOf(url) !== -1) {
        scripts.splice(indexOf(url), 1)
      }
    })
    // 创建结束
    const loadFinished = () => {
      if (loaded < scriptsCount) {
        createscript()
      } else {
        resolve()
      }
    }
    // 创建script
    const createscript = () => {
      const script = document.createElement('script')
      script.type = "text/javascript"
      script.src = scripts[loaded]
      if (script.readyState){ // IE
        script.onreadystatechange = function(){
          if (script.readyState === "loaded" || script.readyState === "complete"){
            script.onreadystatechange = null;
            loadFinished()
          }
        };
      } else { // Others
        script.onload = () =>{
          loadFinished()
        }
      }
      script.onerror = function(error) {
        console.error("The script " + error.target.src + " is not accessible.");
      }
      document.body.appendChild(script)
      loaded ++ 
    }
    createscript()   
  })
}

export default loadScript