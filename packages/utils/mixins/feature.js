import Feature from 'ol/Feature'

export default {
  methods: {
    /**
     * 在地图上画图形
     */
    draw (geometry, callback, targetData) {
      // 实例化Feature
      this.feature = new Feature({
        geometry: geometry,
      })

      this.feature.targetData = targetData

      // 为图形绑定默认事件
      if (callback) {
        this.feature.on('featureClick', (e) => {
          let emitData = {
            _event: e,
            MouseEvent: e.event.coordinate,
            target: callback(e)
          }
          this.$emit('click', emitData)
        })
      }

      // 设置样式
      this.setStyle()

      // 在图形实例记录当前vue组件的实例引用，方便从事件中取会vue组件实例
      this.feature._vm = this

      // 在图层上画图形
      if (this.layer) {
        this.layer.getSource().addFeature(this.feature)
      }
      
      // 绘制完成事件
      this.$emit('draw', this.feature)
    },

    /**
     * 直接插入Feature
     */
    handleFeature (feature) {
      // 在图层上画图形
      if (this.layer) {
        this.layer.getSource().addFeature(feature)
      }
    },

    /**
     * 更新图形样式
     */
    setStyle () {
      // createStyle 方法由父类实现
      const style = this.createStyle()
      this.feature && this.feature.setStyle(style)
    },
  },
}