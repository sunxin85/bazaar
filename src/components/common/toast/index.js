import Toast from './Toast'

const obj = {}
obj.install = function(Vue) {
  // document.body.appendChild(Toast.$el)
  // Vue.prototype.$toast = Toast
  // 1.创建组件构造器
  const toastContrustor = Vue.extend(Toast)
  // 2.通过new，根据组件构造器创建一个组件对象
  const toast = new toastContrustor()
  // 3.将组件对象，手动挂载到某个元素上
  toast.$mount(document.createElement('div'))
  // 4.此时toast.$el对应是div
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast
}
export default obj