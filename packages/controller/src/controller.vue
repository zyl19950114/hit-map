<template>
	<div class="controller-x" v-if="layers.length != 0">
		<ul>
			<li
				@click="handleLayer(item.name, item.visible)"
				v-for="(item, index) in layers"
				:key="index"
				:class="{ 'layer-hide': !item.visible }"
			>
				<div class="icon">
					<img v-if="item.type == 'point'" :src="item.icon" />
					<div
						v-if="item.type == 'circle'"
						:style="circle(item.icon)"
					></div>
					<div
						v-if="item.type == 'polygon'"
						:style="polygon(item.icon)"
					></div>
					<div
						v-if="item.type == 'linestring'"
						:style="linestring(item.icon)"
					></div>
					<div
						v-if="item.type == 'heatmap'"
						:class="['iconfont', item.icon]"
					></div>
				</div>
				{{ item.name }}
			</li>
		</ul>
	</div>
</template>

<script>
/**
 * 图层控制器组件
 * @module hit-map-controller
 */

import { getLayer, findMap } from '../../utils/utils.js'
export default {
	name: 'HitMapController',
	props: {
		/**
		 * 地图实例
		 */
		map: {
			defult: null,
		},
	},
	computed: {
		// 处理图层管理器数据
		layers() {
			let layers
			let controllerLayer = []
			if (this.map) {
				layers = this.map.getLayers().getArray()
				layers = layers.filter((res) => {
					return res._type != 'TileLayer'
				})
				layers.forEach((res) => {
					let target
					let type
					let data
					let layerType = res._type
					if (
						!res._appendToMap ||
						res.getSource().getFeatures().length == 0
					)
						return
					switch (layerType) {
						case 'VectorLayer':
							try {
								target = res
									.getSource()
									.getFeatures()[0]
									.getStyle()
								type = res
									.getSource()
									.getFeatures()[0]
									.getGeometry()
									.getType()
								data = {
									name: res.get('name'),
									visible: res.getVisible(),
									type: type.toLowerCase(),
								}
							} catch (err) {
								console.log(err)
							}
							break
						case 'Heatmap':
							type = layerType
							data = {
								name: res.get('name'),
								visible: res.getVisible(),
								type: layerType.toLowerCase(),
								icon: 'iconrelitu',
							}
							break
					}

					// 当图层为矢量图层Point时候,获取第一个元素的图片作为图层控制器显示的icon
					switch (type) {
						case 'Point':
							data.icon = target.getImage().getSrc()
							break
						case 'Circle':
						case 'Polygon':
							data.icon = {
								background: target.getFill().getColor(),
								border: target.getFill().getColor(),
								width: target.getStroke().getWidth(),
							}
							break
						case 'LineString':
							data.icon = {
								width: target.getStroke().getWidth(),
								color: target.getStroke().getColor(),
							}
							break
					}
					controllerLayer.push(data)
				})
			}

			// 图层列表的排序，点图层排在最上层
			controllerLayer.sort((a) => {
				if (a.type == 'point') {
					return -1
				} else {
					return 0
				}
			})
			return controllerLayer
		},
		// 返回圆形的图标样式
		circle() {
			return function(val) {
				let style = `
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: ${val.background};
        `
				return style
			}
		},

		// 返回多边形的图标样式
		polygon() {
			return function(val) {
				let style = `
        width: 20px;
        height: 20px;
        background: ${val.background};
        `
				return style
			}
		},

		// 返回线的图标样式
		linestring() {
			return function(val) {
				let style = `
        width: 20px;
        height: 3px;
        transform: rotate(45deg);
        background: ${val.color};
        `
				return style
			}
		},
	},
	methods: {
		/**
		 * 【隐藏】/【显示】图层
		 * @param {String} name 图层的名字/ID
		 * @param {Boolean} state 图层的状态 true为显示/false为隐藏
		 */
		handleLayer(name, state) {
			let layer = getLayer(this.map, name)
			layer.setVisible(!state)
		},
	},
	mounted() {
		this.$nextTick(() => {
			findMap(this).then((res) => {
				this.map = res
			})
		})
	},
}
</script>

<style scoped>
.controller-x {
	padding: 20px 16px;
	border-radius: 5px;
	background: rgba(0, 0, 0, 0.66);
	max-width: 120px;
	min-width: 90px;
	max-height: 340px;
	overflow: hidden;
	overflow-y: auto;
}
ul {
	padding: 0;
	margin: 0;
	overflow: hidden;
	overflow-y: auto;
}
li {
	-webkit-touch-callout: none; /* iOS Safari */
	-webkit-user-select: none; /* Chrome/Safari/Opera */
	-khtml-user-select: none; /* Konqueror */
	-moz-user-select: none; /* Firefox */
	-ms-user-select: none; /* Internet Explorer/Edge */
	user-select: none; /* Non-prefixed version, currently not supported by any browser */
	display: flex;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	transition: 0.2s all;
	align-items: center;
	text-align: center;
	color: rgb(243, 243, 243);
	list-style: none;
	padding: 10px 0;
	font-size: 14px;
	cursor: pointer;
}
.icon {
	margin-right: 8px;
}
img {
	width: 20px;
}
.layer-hide {
	-webkit-filter: grayscale(100%); /* Chrome, Safari, Opera */
	filter: grayscale(100%);
	color: rgb(177, 177, 177);
}
</style>
