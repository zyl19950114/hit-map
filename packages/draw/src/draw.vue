<template>
	<div v-drawDrag>
		<transition name="hint">
			<div class="hit-draw-hint" v-if="handleHint">
				单击左键完成绘制，单击右键取消绘制
			</div>
		</transition>
		<div class="hit-draw-content">
			<div class="hit-draw-header">
				<i class="iconfont iconhuizhi-01"></i>
			</div>
			<i
				@click="showTools = !showTools"
				:class="showTools ? 'showTools' : ''"
				class="iconfont iconjiantou handleVisible"
			></i>
			<div v-if="showTools" class="iconfont hit-draw-tools">
				<ul class="hit-draw-tools-ul">
					<li
						:class="[{ active: active == item.type }, item.icon]"
						@click="beginningDraw(item.type)"
						v-for="item in tools"
						:key="item.type"
						class="hit-draw-tools-li"
					></li>
				</ul>
				<i
					@click="clear"
					class="iconfont iconqingchushujuku"
				></i>
			</div>
			<div
				class="hit-draw-features"
				v-for="(item, index) in features"
				:key="index"
			>
				<component
					v-bind:is="dynamicComponent(item.type)"
					:data="item.feature"
					:visible="true"
				></component>
			</div>
		</div>
	</div>
</template>

<script>
/**
 * 地图绘制组件
 * @module hit-map-draw
 */

import { findMap } from '../../utils/utils.js' //引入地图公用工具
import '../../utils/directives' // 绘制工具窗口拖动

import Draw from 'ol/interaction/Draw' //引入绘制工具

export default {
	name: 'HitMapDraw',
	data() {
		return {
			component: 'hit-map-circle',
			handleHint: false,
			timer: null,
			features: [],
			active: null,
			showTools: true,
			tools: [
				{
					name: '圆形',
					type: 'Circle',
					icon: 'iconxianxing',
				},
				{
					name: '多边形',
					type: 'Polygon',
					icon: 'iconhuizhi',
				},
				{
					name: '路径',
					type: 'LineString',
					icon: 'iconicon-line-graph',
				},
			],
		}
	},
	computed: {
		dynamicComponent() {
			return function(type) {
				if (type == 'LineString') {
					return 'hit-map-line'
				}
				return `hit-map-${type.toLowerCase()}`
			}
		},
	},
	methods: {
    // 清除所有图形
    clear() {
      this.features = []
      this.$emit('clear')
    },
		/**
		 * 将feature数据格式化成用户数据
		 */
		formatFeature(feature) {
			let formatFeature
			const geometry = feature.getGeometry()
			const type = geometry.getType().toLowerCase()
			switch (type) {
				case 'circle':
					formatFeature = {
						// 圆心坐标点
						canter: geometry.getCenter(),
						// 圆形半径
						radius: geometry.getRadius() * 100,
					}
					break
				case 'linestring':
					formatFeature = geometry.getCoordinates()
					break
				case 'polygon':
					formatFeature = geometry.getCoordinates()[0]
					break
			}
			return formatFeature
		},

		/**
		 * 监听鼠标右键，并屏蔽右键默认事件
		 */
		bindEvent() {
			if (this.drawer) {
				this.finish()
			}
			return false
		},

		/**
		 * 开始画图
		 * @method beginningDraw
		 */
		beginningDraw(type) {
			if (this.timer) {
				clearTimeout(this.timer)
				this.timer = null
			}
			this.active = type
			this.handleHint = true
			this.timer = setTimeout(() => {
				this.handleHint = false
			}, 3000)
			this.createDraw(type)
		},

		finish() {
			/**
			 * 完成画图
			 * @method finish
			 */
			if (this.drawer) {
				this.drawer.un('drawstart', this.handleDrawStart)
				this.drawer.un('drawend', this.handleDraw)
				this.active = null
				// this.drawer.un('modifystart', this.handleModifyStart)
				// this.drawer.un('modifyend', this.handleModify)
				this.map.removeInteraction(this.drawer)
				this.drawer = null
			}
		},

		handleDrawStart(e) {
			/**
			 * 画图开始时触发
			 * @event drawstart
			 * @param {object} e 事件对象
			 */
			this.$emit('drawstart', e)
			e.feature.on('change', this.handleChange)
		},

		handleChange(e) {
			/**
			 * 图形发生变化时触发
			 * @event change
			 * @param {object} e 事件对象
			 */
			this.$emit('change', e)
		},

		/**
		 * 实例化绘制工具
		 */
		createDraw(type) {
			if (this.drawer) this.map.removeInteraction(this.drawer)
			this.drawer = new Draw({
				type: type,
			})
			this.map.addInteraction(this.drawer)
			this.drawer.on('drawstart', this.handleDrawStart)
			this.drawer.on('drawend', this.handleDraw)
		},

		handleDraw(e) {
			let featureData = {
				feature: e.feature,
				type: e.target.type_,
			}
			this.features.push(featureData)

			/**
			 * 画图结束时触发
			 * @event drawend
			 * @param {object} e 事件对象
			 */
			e.userFeature = this.formatFeature(e.feature)
			this.$emit('drawend', e)
		},
	},
	mounted() {
		this.$nextTick(() => {
			findMap(this).then((res) => {
				this.map = res
				console.log('加载绘制工具')

				// 监听鼠标右键事件
				document.oncontextmenu = this.bindEvent
			})
		})
	},

	beforeDestroy() {
		document.oncontextmenu = () => {
			return true
		}
	},
}
</script>

<style scoped>
.hit-draw-hint {
	position: absolute;
	top: 0;
	z-index: 999;
	left: 50%;
	transform: translateX(-50%);
	top: 30px;
	color: rgb(73, 73, 73);
	padding: 10px 18px;
	background: #fff;
	border-radius: 5px;
}
.hit-draw-content {
	position: absolute;
	z-index: 998;
	display: flex;
	height: 40px;
	bottom: 120px;
	left: 50%;
	transform: translateX(-50%);
	border-radius: 5px;
	overflow: hidden;
	background: #fff;
}

.hit-draw-header {
	width: 40px;
	height: 100%;
	display: flex;
	color: rgb(70, 70, 70);
	font-size: 24px;
	font-weight: 600;
	justify-content: center;
	align-items: center;
	border-right: 1px solid rgb(233, 233, 233);
	background: rgb(241, 241, 241);
}

.handleVisible {
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	transition: 0.3s all;
}

.showTools {
	transform: rotate(180deg);
}

.hit-draw-tools {
	flex: 1;
	padding-left: 10px;
	height: 100%;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	transition: 0.3s all;
}

.hit-draw-tools-ul,
.hit-draw-tools-li {
	list-style: none;
	padding: 0;
	height: 100%;
	margin: 0;
}

.hit-draw-tools-ul {
	display: flex;
}

.iconfont {
	font-size: 20px;
}

.iconqingchushujuku {
	width: 50px;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	transition: 0.3s all;
}

.iconqingchushujuku:hover {
	background: #f56c6c;
	color: #fff;
}

.hit-draw-tools-li {
	width: 50px;
	text-align: center;
	cursor: pointer;
	border-right: 1px solid rgb(231, 231, 231);
	color: rgb(88, 88, 88);
	font-weight: 600;
	justify-content: center;
	align-items: center;
	display: flex;
	transition: 0.3s all;
}

.tools-enter-active .tools-leave-active {
	transition: all 0.3s;
}

.active {
	background: rgb(211, 211, 211);
	box-shadow: 0 0 9px 2px rgba(0, 0, 0, 0.2) inset;
}

.hint-enter-active,
.hint-leave-active {
	transition: 0.3s all;
}

.hint-enter,
.hint-leave-to {
	top: 10px;
	opacity: 0;
}

.hint-enter-to,
.hint-leave {
	top: 30px;
	opacity: 1;
}
</style>
