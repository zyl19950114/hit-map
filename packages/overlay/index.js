import Overlay from './src/overlay'

Overlay.install = function (Vue) {
  Vue.component(Overlay.name, Overlay)
}

export default Overlay
