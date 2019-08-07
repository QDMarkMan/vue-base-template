/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @Date: 2019-07-31 13:54:22
 * @LastEditors: etongfu
 * @LastEditTime: 2019-08-07 09:42:42
 * @Description: 鼠标长按指令, 绑定value需要是个function
 * @YouWant: add you want info here
 */
const listeners = (timer, binding) => {
  let { arg } = binding
  const start = function (e) {
    if (e.type === 'click') {
      return
    }
    if (timer === null) {
      timer = setTimeout(() => {
        binding.value(true) // 告诉宿主鼠标已经开始执行
      }, parseInt(arg))
    }
  }
  const cancel = function () {
    if (timer !== null) {
      clearTimeout(timer)
      timer = null
    }
  }
  const stop = function () {
    binding.value(false) // 告诉宿主鼠标已经离开
    if (timer !== null) {
      clearTimeout(timer)
      timer = null
    }
  }
  return {
    start,
    cancel,
    stop
  }
}
export default MousePress = {
  name: 'mousepress',
  inserted: function (el, binding) {
    let timer = null
    let { start, cancel, stop } = listeners(timer, binding)
    // 添加事件监听器
    el.addEventListener('mousedown', start)
    // 取消计时器
    el.addEventListener('click', cancel)
    // 告诉宿主结束长按
    el.addEventListener('mouseup', stop)
  },
  unbind: function (el, binding) {
    // 添加事件监听器
    binding.value(false)
  }
}
