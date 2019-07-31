/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @Date: 2019-07-31 13:53:47
 * @LastEditors: etongfu
 * @LastEditTime: 2019-07-31 13:54:06
 * @Description: 点击外部区域
 * @YouWant: add you want info here
 */
const clickoutsideContext = '@@clickoutsideContext'

export default {
  name: 'click-outside',
  bind (el, binding, vnode) {
    const documentHandler = function (e) {
      if (!vnode.context || el.contains(e.target)) return
      if (binding.expression) {
        vnode.context[el[clickoutsideContext].methodName](e)
      } else {
        el[clickoutsideContext].bindingFn(e)
      }
    }
    el[clickoutsideContext] = {
      documentHandler,
      methodName: binding.expression,
      bindingFn: binding.value
    }
    setTimeout(() => {
      document.addEventListener('click', documentHandler)
    }, 0)
  },

  update (el, binding) {
    el[clickoutsideContext].methodName = binding.expression
    el[clickoutsideContext].bindingFn = binding.value
  },

  unbind (el) {
    document.removeEventListener('click', el[clickoutsideContext].documentHandler)
  }
}