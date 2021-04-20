import { findMap } from '../utils' //引入地图公用工具

export default {
  methods: {
    findMap () {
      findMap(this).then((res) => {
        this.map = res
        if (this.hendleLayer) this.hendleLayer(this.layer, this.name)
        this.formatData()
      })
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.findMap()
    })
  }
}