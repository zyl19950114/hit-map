<template>
	<div>
		<hit-map-marker :append-to-map="false" :icon="icon" :data="origin" />
		<hit-map-line
			:append-to-map="false"
			v-if="lineVisible"
			:data="data"
			width="7"
			:visible="true"
		/>
	</div>
</template>

<script>
import { GreatCircle } from '../../utils/Arc'
export default {
	name: 'hit-map-track',
	props: {
		/**
		 * 图标
		 */
		icon: {
			type: String,
			default: null,
		},

		/**
		 * 轨迹数据
		 * */
		data: {
			type: Array,
			default: () => {
				return []
			},
		},

		/**
		 * 移动速度
		 * */
		speed: {
			type: [String, Number],
			default: 10,
		},

		/**
		 * 是否需要显示行进线路
		 */
		lineVisible: {
			type: Boolean,
			default: true,
		},

		/**
		 * 是否开启重复播放
		 */
		repeat: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			index: 0,
			origin: {},
		}
	},
  watch: {
    data: {
      handler(newV) {
        if(!this.timer) {
          this.trackLine()
        }
      }, 
      deep: true,
    }
  },
	methods: {
		// 返回两点之间的点路径
		arcLine(start, end) {
			let routes = [start]
			const gen = new GreatCircle(
				{ x: start[0], y: start[1] },
				{ x: end[0], y: end[1] }
			)
			const arcLine = gen.Arc(200, { offset: 0 })
			routes = routes.concat(arcLine.geometries[0].coords.slice(1))
			return routes
		},

		// 根据路径移动坐标点
		trackLine() {
			if (!this.data || this.data.length == 0) return
			const start = this.data[this.index]
			const end = this.data[this.index + 1]
			let index = 0
			let arcLine = this.arcLine(start, end)
			// console.log(arcLine)
			this.timer = setInterval(() => {
				if (index < arcLine.length) {
					this.origin = {
						longitude: arcLine[index][0],
						latitude: arcLine[index][1],
					}
				} else if (index == arcLine.length) {
					this.index++
					clearInterval(this.timer)
          this.timer = null
					if (this.index == this.data.length - 1) {
						if (!this.repeat) return
            this.index = 0
					}
					this.trackLine()
				}
				index++
			}, Number(this.speed))
		},
	},
	mounted() {
		this.$nextTick(() => {
			this.trackLine()
		})
	},
}
</script>

<style scoped></style>
