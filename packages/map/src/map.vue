<template>
	<div ref="map" class="map">
		<slot></slot>
		<div v-if="controller" class="layers-controller" :class="position">
			<hit-map-controller :map="map" />
		</div>
	</div>
</template>

<script>
/**
 * 地图加载组件
 * @module hit-map
 */

import 'ol/ol.css'
import { Map, View } from 'ol'
import Tile from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ' //引入XYZ地图格式

const gaodeLayer =
	'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}'

export default {
	name: 'HitMap',
	props: {
		controller: {
			/**
			 * 是否显示图层控制器
			 */
			type: Boolean,
			default: false,
		},

		position: {
			/**
			 * 图层控制器的位置（controller为true时生效）
			 */
			type: String,
			default: 'right-center',
		},

		mapUrl: {
			/**
			 * 瓦片地址
			 */
			type: String,
			default: null,
		},

		center: {
			/**
			 * 地图初始中心点
			 */
			type: Array,
			default() {
				return [0, 0]
			},
		},

		zoom: {
			/**
			 * 地图初始缩放比
			 */
			type: [Number, String],
			default: 10,
		},

    maxZoom: {
			/**
			 * 地图最大缩放比
			 */
			type: [Number, String],
			default: 18,
		},

    minZoom: {
			/**
			 * 地图最小缩放比
			 */
			type: [Number, String],
			default: 8,
		},
	},
	data() {
		return {
			map: null,
			mapLevel: '',
			defaultLayers: [],
		}
	},
	methods: {
		// 创建地图实例
		initMap() {
			this.map = new Map({
				target: this.$refs.map,
				view: new View({
					projection: 'EPSG:4326',
					center: this.center,
					zoom: this.zoom,
					minZoom: this.minZoom,
					maxZoom: this.maxZoom,
				}),
			})
			this.createDefaultLayer()
			this.bindDefultEvent()
		},
		//【加载】加载地图
		createDefaultLayer() {
			let url = this.mapUrl || gaodeLayer
			console.log('开始加载地图')
			let layer = new Tile({
				name: 'defaultLayer',
				source: new XYZ({
					url: url,
				}),
				zIndex: 1,
			})
			layer._type = 'TileLayer'
			this.map.addLayer(layer)
		},

		// 绑定默认事件
		bindDefultEvent() {
			// 绑定鼠标地图移动事件
			this.map.on('moveend', () => {
				this.defaultLayers.forEach((res) => {
					let layerItem = Number(res.get('name').split('-')[1])
					if (this.mapLevel == layerItem) {
						res.setVisible(true)
					} else {
						res.setVisible(false)
					}
				})
			})
			//绑定鼠标单点击事件
			this.map.on('click', (e) => {
				// 当有overlay为显示状态时，点击地图除移所有显示的overlay
				if (this.map.getOverlays().getArray().length != 0) {
					this.map
						.getOverlays()
						.getArray()
						.forEach((res) => {
							this.map.removeOverlay(res)
							this.overlayData = ''
						})
				}
				// 当点击地图存在图片像素时，出发自定义点击事件
				if (this.map.hasFeatureAtPixel(e.pixel)) {
					this.map.forEachFeatureAtPixel(e.pixel, function(feature) {
						feature.dispatchEvent({
							type: 'featureClick',
							event: e,
						})
					})
				}
			})
		},
	},
	mounted() {
		this.initMap()
	},
	beforeDestroy() {
		// 销毁页面前除移所有图层以及地图实例
		const layers = this.map.getLayers().getArray()
		layers.forEach((layer) => {
			layer.disposeInternal()
		})
		this.map.disposeInternal()
	},
}
</script>

<style scoped>
.map {
	height: 100%;
	width: 100%;
	position: relative;
	overflow: hidden;
}
.layers-controller {
	position: absolute;
	z-index: 2;
}
.left-top {
	left: 0;
	top: 0;
}
.left-center {
	left: 0;
	top: 50%;
	transform: translateY(-50%);
}
.left-bottom {
	left: 0;
	bottom: 0;
}
.right-top {
	right: 0;
	top: 0;
}
.right-center {
	right: 0;
	top: 50%;
	transform: translateY(-50%);
}
.right-bottom {
	right: 0;
	bottom: 0;
}
</style>
