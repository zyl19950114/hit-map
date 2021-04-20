<template>
	<div class="map-container">
		<hit-map controller ref="hitMap" :center="[111.23423, 23.795]" :zoom="10">
			<hit-map-track :data="track1" />
			<hit-map-track :speed="7" :data="track2" />
		</hit-map>
		<div class="handle">
			<el-button @click="addPath">添加路径</el-button>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			track1: [
				[111.23423, 23.345],
				[111.75445, 23.56446],
				[111.4324, 23.54356],
				[111.988, 23.5646],
				[111.2177, 23.78675],
				[111.5657, 23.23432],
				[111.6574, 23.6457],
			],
			track2: [
				[111.23423, 23.995],
				[111.75445, 23.995],
			],
		}
	},
	methods: {
		addPath() {
			let coordinate = [
				Number(`${111 + Number(Math.random(1).toFixed(5))}`),
					Number(`${23 + Number(Math.random(1).toFixed(5))}`)
			]
			this.track2.push(coordinate)
		},
	},
}
</script>

<style scoped>
.map-container {
	height: 100%;
	position: relative;
}
.handle {
	position: absolute;
	bottom: 80px;
	left: 50%;
	transform: translateX(-50%);
}
</style>
