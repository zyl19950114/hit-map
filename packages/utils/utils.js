/**
* 根据传入图层名称获取对应图层
* @param {object} layer - new Map实例
* @param {string} name - 图层名称
*/
function getLayer (layer, name) {
  var result = undefined
  if (layer) {
    if (layer.get('name') == name) {
      return layer
    } else if ('getLayers' in layer) {
      var layers = layer.getLayers()
      for (var i = 0; i < layers.getLength(); i++) {
        var tempLayer = layers.item(i)
        result = getLayer(tempLayer, name)
        if (result != undefined) {
          return result
        }
      }
    }
  }
}

/**
 * 地图初始化完成回调
 * @param callback
 */
 export function mapReady(callback) {
  // 先检查父组件的地图是否初始化完成
  if (this.parent && this.parent.map) {
    callback(this.parent.map, this.parent)
    return
  }
  // 父组件地图未初始化，侦听完成事件
  this.parent.$once('ready', (map, vm) => {
    callback(map, vm)
  })
}

/**
* 向上查找父组件或平行组件中的Map实例
* @param {object} data - 当前组件自身所有参数
*/
function findMap (data) {
  return new Promise((resolve, reject) => {
    let parent = data
    while (!parent.$parent.$refs.hitMap) {
      parent = parent.$parent
    }
    let map = parent.$parent.$refs.hitMap.map
    resolve(map)
  })
}

export {
  getLayer,
  findMap
}
