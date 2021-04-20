<template>
	<div></div>
</template>

<script>
/**
 * 圆形覆盖物组件
 * @module hit-map-circle
 */

/**
 * @param {String} name - 该图层的名字/ID
 * @param {String} background - 圆形区域的背景颜色，支持16进制/rgb/rgba
 * @param {String} border - 圆形区域的边框颜色，支持16进制/rgb/rgba
 * @param {String || Number} width - 圆形区域的边界宽度（px）
 * @param {Array} coordinates - 圆形的节点坐标，格式为数组
 */

import { parseStyle } from '../../../packages'

import Circle from 'ol/geom/Circle'

import MapMixin from '../../utils/mixins/map'
import LayerMixin from '../../utils/mixins/layer'
import FeatureMixin from '../../utils/mixins/feature'
import CleanMixin from '../../utils/mixins/clean'

// 格式化圆形样式
const circleStyle = (background, border, width) => {
	return parseStyle({
		className: 'Style',
		fill: {
			className: 'Fill',
			color: background,
		},
		stroke: {
			className: 'Stroke',
			color: border,
			width: width,
		},
	})
}

export default {
	name: 'HitMapCircle',
	mixins: [MapMixin, LayerMixin, FeatureMixin, CleanMixin],
	props: {
		/**
		 * 可直接接收feature对象
		 * @param feature
		 */

		/**
		 * 是否添加到图层内
		 * @param Boolean appendToMap
		 */
		appendToMap: {
			type: Boolean,
			default: true,
		},

		/**
		 * 图层名，作为图层id
		 * @param String name
		 */
		name: {
			type: String,
			default: null,
		},

		/**
		 * 圆形边框的颜色
		 * @param String border
		 */
		border: {
			type: String,
			default: '#000',
		},

		/**
		 * 圆形背景的颜色
		 * @param String background
		 */
		background: {
			type: String,
			default: 'rgba(64, 158, 255, 0.4)',
		},

		/**
		 * 圆形边框的宽度
		 * @param Number width
		 */
		width: {
			type: [Number, String],
			default: 2,
		},

		/**
		 * 该图层的序列
		 * @param Number zIndex
		 */
		zIndex: {
			type: Number,
			default: 2,
		},

		/**
		 * 图层是否可见
		 * @param Boolean visible
		 */
		visible: {
			type: Boolean,
			default: false,
		},

		/**
		 * 圆形图形的信息
		 * @param {Object} data
		 */
		data: {
			type: [Object, Array],
			default() {
				return null
			},
		},
	},
	watch: {
		data: {
			handler() {
				this.refreshLayer()
			},
			deep: true,
		},
	},
	methods: {
		// 绑定事件
		bindEvent(e) {
			let targetData = {
				center: e.target.getGeometry().getCenter(),
				radius: e.target.getGeometry().getRadius() * 100,
			}
			return targetData
		},

		// 更新图层数据
		refreshLayer() {
			if (!this.map || !this.layer) return
			this.formatData()
		},

		// 处理圆形数据
		formatData() {
			if (this.layer) this.layer.getSource().clear()
			if (!this.data || this.data.length == 0) return
			if (
				this.data.geometryName_ == 'geometry'
			) {
				this.handleFeature(this.data)
				return
			}
			if (
				Object.prototype.toString.call(this.data) === '[object Object]'
			) {
				this.draw(
					new Circle(this.data.center, this.data.radius / 100),
					this.bindEvent
				)
			} else {
				this.data.forEach((res) => {
					this.draw(
						new Circle(res.center, res.radius / 100),
						this.bindEvent
					)
				})
			}
		},

		// 创建样式
		createStyle() {
			return circleStyle(this.background, this.border, this.width)
		},
	},
}
</script>
