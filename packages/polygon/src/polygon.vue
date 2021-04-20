<template>
	<div></div>
</template>

<script>
/**
 * 多边形覆盖物组件
 * @module hit-map-polygon
 */

/**
 * @param {String} name - 该图层的名字/ID
 * @param {String} background - 多边形区域的背景颜色，支持16进制/rgb/rgba
 * @param {String} border - 多边形区域的边框颜色，支持16进制/rgb/rgba
 * @param {String || Number} width - 多边形区域的边界宽度（px）
 * @param {Array} coordinates - 多边形的节点坐标，格式为数组
 */
import { parseStyle } from '../../../packages'

import Polygon from 'ol/geom/Polygon'

import MapMixin from '../../utils/mixins/map'
import LayerMixin from '../../utils/mixins/layer'
import FeatureMixin from '../../utils/mixins/feature'
import CleanMixin from '../../utils/mixins/clean'

// 格式化多边形样式
const polygonStyle = (background, border, width) => {
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
	name: 'HitMapPolygon',
	mixins: [MapMixin, LayerMixin, FeatureMixin, CleanMixin],
	props: {

		/**
		 * 是否添加到图层内
		 * @param appendToMap
		 */
		appendToMap: {
			type: Boolean,
			default: true,
		},

		/**
		 * 图层名，作为图层id
		 * @param name
		 */
		name: {
			type: String,
			default: null,
		},

		/**
		 * 多边形边框的颜色
		 * @param border
		 */
		border: {
			type: String,
			default: '#000',
		},

		/**
		 * 多边形背景的颜色
		 * @param background
		 */
		background: {
			type: String,
			default: 'rgba(64, 158, 255, 0.4)',
		},

		/**
		 * 多边形边框的宽度
		 * @param width
		 */
		width: {
			type: [Number, String],
			default: 2,
		},

		/**
		 * 该图层的序列
		 * @param zIndex
		 */
		zIndex: {
			type: [Number, String],
			default: 2,
		},

		/**
		 * 图层是否可见
		 * @param visible
		 */
		visible: {
			type: Boolean,
			default: false,
		},

		/**
		 * 多边形图形的信息
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
			handler(newV) {
				this.refreshLayer()
			},
			deep: true,
		},
	},
	methods: {
		// 绑定事件
		bindEvent(event) {
			return event.target.getGeometry().getCoordinates()[0]
		},
		// 更新图层数据
		refreshLayer() {
			if (!this.map || !this.layer) return
			this.formatData()
		},

		// 处理多边形数据
		formatData() {
			if (this.layer) this.layer.getSource().clear()
			if (!this.data || this.data.length == 0) return
			if (
				this.data.geometryName_ == 'geometry'
			) {
				this.handleFeature(this.data)
				return
			}
			if (this.data[0] && this.data[0].length == 2) {
				this.draw(new Polygon([this.data]), this.bindEvent)
			} else {
				this.data.forEach((res) => {
					this.draw(new Polygon([res]), this.bindEvent)
				})
			}
		},

		// 创建样式
		createStyle() {
			return polygonStyle(this.background, this.border, this.width)
		},
	},
}
</script>
