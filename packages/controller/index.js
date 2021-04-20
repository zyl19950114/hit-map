import Controller from './src/controller'

Controller.install = function (Vue) {
  Vue.component(Controller.name, Controller)
}
export default Controller
