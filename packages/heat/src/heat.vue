<template>
	<div></div>
</template>

<script>
import MapMixin from '../../utils/mixins/map'
import FeatureMixin from '../../utils/mixins/feature'
import CleanMixin from '../../utils/mixins/clean'

import Heatmap from 'ol/layer/Heatmap'
import Point from 'ol/geom/Point'
import Feature from 'ol/Feature'
import SourceVector from 'ol/source/Vector'

export default {
	name: 'hit-map-heat',
	mixins: [MapMixin, FeatureMixin, CleanMixin],
	props: {
		/**
		 * 图层的名字
		 */
		name: {
			type: String,
			default: '热力图',
		},

		data: {
			/**
			 * 热力图的数据
			 */
			type: Array,
			default: () => {
				return []
			},
		},

		/**
		 * 热力图渲染色带颜色
		 */
		gradient: {
			type: Array,
			default: () => {
				return ['#00f', '#0ff', '#0f0', '#ff0', '#f00']
			},
		},

		/**
		 * 每个像素渲染点半径
		 */
		radius: {
			type: [Number, String],
			default: 16,
		},

		/**
		 * 模糊度
		 */
		blur: {
			type: [Number, String],
			default: 25,
		},

		/**
		 * 图层层级
		 */

		zIndex: {
			type: [Number, String],
			default: 1,
		},

		/**
		 * 数据中代表经度的key值，默认为longitude
		 * @param String
		 */
		longitude: {
			type: String,
			default: 'longitude',
		},

		/**
		 * 数据中代表纬度的key值，默认为latitude
		 * @param String
		 */
		latitude: {
			type: String,
			default: 'latitude',
		},

		/**
		 * 是否显示该图层
		 */
		visible: {
			type: Boolean,
			default: true,
		},
	},
	watch: {
		data: {
			handler() {
				if (!this.map || !this.handelHeatLayer) return
				this.formatData()
			},
		},
	},
	methods: {
		// 生成热力图层
		handelHeatLayer(data) {
			if (this.heatMapLayer) {
				this.heatMapLayer.getSource().clear()
				this.heatMapLayer.getSource().addFeatures(data)
				return
			}
			this.heatMapLayer = new Heatmap({
				name: this.name,
				source: new SourceVector({
					features: data,
				}),
				gradient: this.gradient, //热力图渲染色带
				radius: Number(this.radius), //每个像素渲染点半径
				blur: Number(this.blur), //模糊度
				weight: 'count', //权重值；
				renderModed: 'image', //图层渲染方式
				zIndex: Number(this.zIndex),
				visible: this.visible,
			})
			this.heatMapLayer._type = 'VectorLayer'
			this.map.addLayer(this.heatMapLayer)
		},

		// 处理热力图数据
		formatData() {
			let heatMapData = this.data.map((res) => {
				return new Feature({
					// 根据坐标类型对坐标进行转换
					geometry: new Point([
						res[this.longitude],
						res[this.latitude],
					]),
					weight: res[this.weight] || 1,
				})
			})
			this.handelHeatLayer(heatMapData)
		},
	},

	beforeDestroy() {
		if (this.heatMapLayer) {
			this.heatMapLayer.disposeInternal()
		}
	},
}
</script>

<style scoped></style>
