<template>
	<div></div>
</template>

<script>
/**
 * 线覆盖物组件
 * @module hit-map-line
 */

/**
 * @param {String} name - 该图层的名字/ID
 * @param {String} border - 线区域的边框颜色，支持16进制/rgb/rgba
 * @param {String || Number} width - 线区域的边界宽度（px）
 * @param {Array} coordinates - 线的节点坐标，格式为数组
 */
import { parseStyle } from '../../../packages'

import LineString from 'ol/geom/LineString'

import MapMixin from '../../utils/mixins/map'
import LayerMixin from '../../utils/mixins/layer'
import FeatureMixin from '../../utils/mixins/feature'
import CleanMixin from '../../utils/mixins/clean'

// 格式化线样式
const lineStyle = (color, width) => {
	return parseStyle({
		className: 'Style',
		stroke: {
			className: 'Stroke',
			color: color,
			width: width,
		},
	})
}

export default {
	name: 'HitMapLine',
	mixins: [MapMixin, LayerMixin, FeatureMixin, CleanMixin],
	props: {
		/**
		 * 可直接接收feature对象
		 * @param feature appendToMap
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
		 * 线的颜色
		 * @param String border
		 */
		color: {
			type: String,
			default: '#409EFF',
		},

		/**
		 * 线的宽度
		 * @param Number width
		 */
		width: {
			type: [Number, String],
			default: 4,
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
		 * @param Boolean visible
		 */
		visible: {
			type: Boolean,
			default: false,
		},

		/**
		 * 线图形的信息
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
			return event.target.getGeometry().getCoordinates()
		},
		// 更新图层数据
		refreshLayer() {
			if (!this.map || !this.layer) return
			this.formatData()
		},

		// 处理线数据
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
				this.draw(new LineString(this.data), this.bindEvent)
			} else {
				this.data.forEach((res) => {
					this.draw(new LineString(res), this.bindEvent)
				})
			}
		},

		// 创建样式
		createStyle() {
			return lineStyle(this.color, this.width)
		},
	},
}
</script>
