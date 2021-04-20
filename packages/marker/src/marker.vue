<template>
	<div></div>
</template>

<script>
/**
 * 点覆盖物组件
 * @module hit-map-marker
 */

/**
 * 【使用规则】
 * @param {Array} data - 【必传】坐标点经纬度，为对象时判定为单个点，为数组时判定为多个点
 */

import { findMap } from '../../utils/utils.js' //引入地图公用工具
import { parseStyle } from '../../../packages'

import MapMixin from '../../utils/mixins/map'
import LayerMixin from '../../utils/mixins/layer'
import FeatureMixin from '../../utils/mixins/feature'
import CleanMixin from '../../utils/mixins/clean'

import defaultIcon from '../../images/mapIcon/marker_blue.png'
import Point from 'ol/geom/Point'

// 格式化标记样式
// icon, text, fontSize, color, offsetY, offsetX
const markerStyle = (style) => {
	return parseStyle({
		className: 'Style',
		image: {
			className: 'Icon',
			anchor: [0.5, 1],
			src: style['icon'],
		},
		text: {
			className: 'Text',
			font: `${style['fontSize'] || 14}px Calibri, sans-serif`,
			text: style['text'] || '',
			textBaseline: 'top',
			offsetY: `${style['offsetY'] || 0}`,
			offsetX: `${style['offsetX'] || 0}`,
			fill: {
				className: 'Fill',
				color: `${style['color'] || '#4e91ff'}`,
				border: 5,
				width: 3,
			},
		},
	})
}

export default {
	name: 'HitMapMarker',
	mixins: [MapMixin, LayerMixin, FeatureMixin, CleanMixin],

	props: {
		/**
		 * 是否添加到图层内
		 * @param Boolean appendToMap
		 */
		appendToMap: {
			type: Boolean,
			default: true,
		},

		/**
		 * 该坐标需要被添加到的图层的名称/ID
		 * @param {staing}
		 */
		name: {
			type: String,
			default: null,
		},

		/**
		 * 用于作为该坐标唯一标识的字段
		 * @param {Number | String}
		 */
		markerId: {
			type: [String, Number],
			default: null,
		},

		/**
		 * 是否显示该图（默认为false）
		 * @param {boolean}
		 */
		visible: {
			type: Boolean,
			default: true,
		},

		/**
		 * 上图数据的坐标点
		 * @param {array | object} - 为数组时代表有多个坐标点，为对象时为一个
		 */
		data: {
			type: [Array, Object],
			default: null,
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
		 * 该图层的序列
		 * @param zIndex
		 */
		zIndex: {
			type: [Number, String],
			default: 3,
		},

		/**
		 * 该图层坐标点的图片
		 * @param {staing}
		 */
		icon: {
			type: String,
			default: null,
		},
	},
	data() {
		return {
			style: '',
		}
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
			return event.target.targetData
		},

		// 创建样式
		createStyle() {
			this.style['icon'] = this.style['icon'] || this.icon || defaultIcon
			return markerStyle(this.style)
		},

		// 更新图层数据
		refreshLayer() {
			if (!this.map || !this.layer) return
			this.formatData()
		},

		// 处理坐标点数据
		formatData() {
			if (this.layer) this.layer.getSource().clear()
			if (!this.data || this.data.length == 0) return
			let coordinate
			if (!Array.isArray(this.data)) {
				coordinate = [
					Number(this.data[this.longitude]),
					Number(this.data[this.latitude]),
				]
				this.style = this.data.style || {}
				this.draw(new Point(coordinate), this.bindEvent, this.data)
			} else {
				this.data.forEach((res) => {
					coordinate = [
						Number(res[this.longitude]),
						Number(res[this.latitude]),
					]
					this.style = res.style || {}
					this.draw(new Point(coordinate), this.bindEvent, res)
				})
			}
		},
	},
	mounted() {
		this.$nextTick(() => {
			findMap(this).then((res) => {
				this.map = res
				this.hendleLayer(this.layer, this.name)
				this.formatData()
			})
		})
	},
}
</script>
