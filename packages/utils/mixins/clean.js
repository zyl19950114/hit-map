/**
 * 清除Vue组件的HTML节点，地图覆盖物图形不生成HTML
 */
 export default {
  mounted() {
    // 组件不需要生成html节点
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
      this.$el = null
    }
  }
}
