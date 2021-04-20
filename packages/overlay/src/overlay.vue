<template>
	<div class="overlay-x" v-show="position && position.length > 0">
		<div ref="overlay">
			<div class="content" v-if="!$slots.default && content">
				{{ content }}
			</div>
			<slot v-else></slot>
		</div>
	</div>
</template>

<script>

/**
 * 地图信息覆盖物组件
 * @module hit-map-overlay
 */

import { findMap } from '../../utils/utils.js' //引入地图公用工具
import OverLay from 'ol/Overlay'
import CleanMixin from '../../utils/mixins/clean'

export default {
	name: 'HitMapOverlay',
  mixins: [CleanMixin],
	props: {
		/**
		 * overlay被定位到的位置
		 * @param {Array} position 经纬度[lng, lat]
		 */
		position: {
			type: Array,
			default() {
				return []
			},
		},

		/**
		 * 显示到overlay里的内容
		 * @param {String | Number} content 当有传入插槽的时候优先显示插槽
		 */
		content: {
			type: [String, Number],
			default: null,
		},
    
		/**
		 * 定义 overlay 相对于其位置属性的实际位置，默认为top-left，
		 * 还有'bottom-left', 'bottom-center', 'bottom-right', 'center-left',
		 * 'center-center', 'center-right', 'top-left','top-center', and 'top-right'.
		 * @param {String} align
		 */
		align: {
			type: String,
			default: 'top-left',
		},

		/**
		 * 默认为false，如果设置为true，则在调用setPosition将平移映射，以便在当前视图中 overlay 完全可见
		 * @param {Boolean} autoPan
		 */
		autoPan: {
			type: Boolean,
			default: true,
		},
	},
	watch: {
		position: {
			handler(newV) {
        if(!this.overlay || !this.map) return;
				this.overlay.setPosition(newV)
				this.map.addOverlay(this.overlay)
			},
			deep: true,
		},
	},
	methods: {
		overLayInit() {
			if (this.overlay) {
				this.map.removeOverlay(this.overlay)
			}
			this.overlay = new OverLay({
				element: this.$refs.overlay,
				positioning: this.align,
				autoPan: true,
			})
		},
	},
	mounted() {
		this.$nextTick(() => {
			findMap(this).then((res) => {
				this.map = res
				this.overLayInit()
			})
		})
	},
}
</script>

<style scoped>
.overlay-x {
  position: absolute;
}
.content {
	background: #fff;
	border-radius: 5px;
	padding: 20px 30px;
	font-size: 16px;
	display: flex;
	color: rgb(92, 92, 92);
	box-shadow: 0px 0px 8px 4px rgba(0, 0, 0, 0.12);
}
</style>
