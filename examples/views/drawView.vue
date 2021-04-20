<template>
	<div class="drawer-container">
		<hit-map ref="hitMap" :center="[111, 23]">
			<hit-map-draw @drawstart="drawstart" @drawend="drawend" />
		</hit-map>
	</div>
</template>

<script>
export default {
	methods: {
		// 绘制开始时触发
		drawstart(e) {
			console.log('绘制开始', e)
		},

		// 绘制开始时触发
		drawend(e) {
			console.log('绘制结束', e)
		},
	},
}
</script>

<style scoped>
.drawer-container {
	height: 100%;
	width: 100%;
}
</style>
