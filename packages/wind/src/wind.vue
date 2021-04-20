<template>
	<div></div>
</template>

<script>
import { WindLayer } from 'ol-wind'

import MapMixin from '../../utils/mixins/map'
import CleanMixin from '../../utils/mixins/clean'
export default {
	name: 'hit-map-wind',
	mixins: [MapMixin, CleanMixin],
	props: {
		/**
		 * 风场数据
		 */
		data: {
			default: null,
			required: true,
		},

		/**
		 * 风场密度
		 */
		paths: {
			type: [Number, String],
			default: 3000,
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
		refreshLayer() {
			if (!this.map || !this.windLayer) return
			this.formatData()
		},
		formatData() {
			this.windLayer = new WindLayer(this.data, {
				windOptions: {
					colorScale: [
						'rgb(36,104, 180)',
						'rgb(60,157, 194)',
						'rgb(128,205,193 )',
						'rgb(151,218,168 )',
						'rgb(198,231,181)',
						'rgb(238,247,217)',
						'rgb(255,238,159)',
						'rgb(252,217,125)',
						'rgb(255,182,100)',
						'rgb(252,150,75)',
						'rgb(250,112,52)',
						'rgb(245,64,32)',
						'rgb(237,45,28)',
						'rgb(220,24,32)',
						'rgb(180,0,35)',
					],
					velocityScale: 1 / 30,
					paths: Number(this.paths),
				},
				map: this.map,
			})
		},
	},
}
</script>

<style lang="scss" scoped></style>
