import Draw from './src/draw'

Draw.install = function (Vue) {
  Vue.component(Polygon.name, Polygon)
}
export default Draw
