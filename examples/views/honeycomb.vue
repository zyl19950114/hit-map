<template>
	<div class="map-container">
		<div class="handle-container">
			<el-button @click="handleDraw">绘制</el-button>
		</div>
		<hit-map
			controller
			ref="hitMap"
			:mapUrl="mapUrl"
			:center="[111, 23]"
			:zoom="10"
		>
			<hit-map-overlay content="蜂窝信息" :position="position" />
			<hit-map-polygon
				:data="h3Polygon"
				:visible="true"
				@click="handleClick"
				name="h3Polygon"
			/>
			<hit-map-polygon
				:data="selectPolygon"
				:append-to-map="false"
				:visible="true"
			/>
		</hit-map>
	</div>
</template>

<script>
import { polyfill, h3ToGeoBoundary } from 'h3-js'
import { Draw } from 'ol/interaction.js'
import SourceVector from 'ol/source/Vector' //引入矢量图层数据源

export default {
	data() {
		return {
			position: [],
			mapUrl:
				'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}',
			h3Polygon: [],
			selectPolygon: [],
		}
	},
	methods: {
		handleClick(data) {
			console.log(data)
			this.selectPolygon = data.target
			this.position = data.MouseEvent
		},
		handleDraw() {
			console.log('开始绘制')
			this.map = this.$refs.hitMap.map
			this.drawer = new Draw({
				source: new SourceVector(),
				type: 'Polygon',
			})
			this.map.addInteraction(this.drawer)
			this.drawer.on('drawend', this.handleDrawEnd)
		},
		handleDrawEnd(e) {
			console.log(e)
			var polygon = e.feature.getGeometry()
			console.log(polygon.getCoordinates()[0])
			let coordinates = []
			polygon.getCoordinates()[0].forEach((res) => {
				let coordinate = [res[1], res[0]]
				coordinates.push(coordinate)
			})
			this.h3Test(coordinates)
			this.map.removeInteraction(this.drawer)
		},
		h3Test(data) {
			// 获取中心包含在给定多边形中的所有六边形
			const hexagons = polyfill(data, 5)
			console.log(hexagons)
			hexagons.forEach((res) => {
				this.h3Polygon.push(h3ToGeoBoundary(res, true))
			})
			console.log(this.h3Polygon)
		},
	},
  mounted() {
    console.log(polyfill)
  }
}
</script>

<style lang="scss" scoped>
.map-container {
	height: 100%;
	width: 100%;
	position: relative;
	.handle-container {
		position: absolute;
		z-index: 9;
		right: 10px;
		top: 10px;
		border-radius: 4px;
		box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.12);
		padding: 20px;
		background: #fff;
	}
}
</style>
