import SourceVector from 'ol/source/Vector' //引入矢量图层数据源
import LayerVector from 'ol/layer/Vector' //引入矢量图层

export default {
  methods: {
    formatLayerName () {
      return `图层 - ${this.map.getLayers().getArray().length}`
    },

    /**
    * @param {Object} map - new Map()地图实例
    * @param {String | Number} layerNmae - 图层名字
    */
    hendleLayer (layer, layerName) {
      if (!layer || !layerName) {
        this.layer = new LayerVector({
          name: layerName || this.formatLayerName(),
          source: new SourceVector(),
          zIndex: this.zIndex,
          visible: this.visible
        })
        this.layer._appendToMap = this.appendToMap
        this.layer._type = 'VectorLayer'
        this.map.addLayer(this.layer)
      }
    }
  },

  beforeDestroy () {
    if (this.layer) {
      this.layer.disposeInternal()
    }
  },
}