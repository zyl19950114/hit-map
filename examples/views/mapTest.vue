<template>
	<div class="map-container">
		<hit-map
			ref="hitMap"
			controller
			:mapUrl="mapUrl"
			:center="center"
			:zoom="10"
		>
			<hit-map-overlay :position="position" :content="content">
        <!-- <div class="overlay-slot">
          插槽使用
        </div> -->
      </hit-map-overlay>
			<hit-map-marker
				name="标记测试"
				:data="markerData"
				:zIndex="10"
				:icon="markerIcon"
				@click="handleMarker"
			/>
			<!-- <hit-map-circle
				:visible="true"
				:data="item"
				v-for="(item, index) in circleList"
				:key="index"
			/> -->
			<hit-map-circle
				@click="handleCircle"
				:visible="true"
				name="圆形测试"
				:data="circleValue"
			/>
			<hit-map-polygon
				name="多边形测试"
				:data="polygonValue"
				:visible="false"
			/>
			<hit-map-polygon name="蜂窝图" :data="h3Polygon" :visible="true" />
		</hit-map>
	</div>
</template>

<script>
import markerIcon from '../../packages/images/mapIcon/marker_red.png'
import vueIcon from '../assets/logo.png'
import { polyfill, h3ToGeoBoundary } from 'h3-js'
export default {
	data() {
		return {
			mapUrl: `http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}`,
			markerIcon: markerIcon,
			circleList: [],
			markerData: [
				{
					longitude: 111,
					latitude: 23,
					name: '人员一号',
					age: 37,
				},
				{
					longitude: 111.333,
					latitude: 23,
					name: '人员二号',
					age: 37,
					style: {
						text: '人员二号',
						fontSize: 16,
						offsetY: -220,
						color: '#fff',
						icon: vueIcon,
					},
				},
			],
			position: [111, 23],
			center: [111, 23],
			h3Polygon: [],
			content: '',
			graphCount: 1,
			circleValue: [
				{
					center: [111, 23],
					radius: 10,
				},
        {
					center: [111.22, 23],
					radius: 10,
				},
			],

			polygonValue: [
				[111.777, 23],
				[111.5678, 23.22],
				[111.7869, 23.33],
				[111.55, 23.44],
				[111, 23],
			],
		}
	},
	methods: {
		handleCircle(data) {
			this.position = data.MouseEvent
			this.content = '圆形区域'
		},
		handleMarker(data) {
			this.position = data.MouseEvent
			this.content = data.target.name
		},
		h3Test() {
			const hexagons = polyfill(
				[
					[23, 111],
					[23.22, 111.5678],
					[23.33, 111.7869],
					[23.44, 111.55],
				],
				6
			)
			hexagons.forEach((res) => {
				this.h3Polygon.push(h3ToGeoBoundary(res, true))
			})
		},
	},
	mounted() {
		this.h3Test()
		// setTimeout(() => {
		//   this.circleList.push({
		// 		center: [111, 23],
		// 		radius: 10,
		// 	})
		// }, 4000)
	},
}
</script>

<style scoped>
.map-container {
	height: 100%;
}
.overlay-slot {
  background: rgba(65, 58, 126, 0.541);
  color: #fff;
  border-radius: 5px;
  padding: 100px 50px
}
</style>
