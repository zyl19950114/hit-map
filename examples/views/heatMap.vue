<template>
	<div class="map-container">
		<hit-map controller ref="hitMap" :center="[111, 23]" :zoom="10">
			<hit-map-heat radius="30" blur="35" :data="data" />
		</hit-map>
	</div>
</template>

<script>
export default {
	data() {
		return {
			data: [],
		}
	},
	methods: {
		handleData() {
      let heatData = []
			for (let i = 0; i <= 300; i++) {
        let heatItem = {
          longitude: `${111 + Number(Math.random(1).toFixed(5))}`,
          latitude: `${23 + Number(Math.random(1).toFixed(5))}`,
          weight: Math.random(1).toFixed(2)
        }
        heatData.push(heatItem)
      }
      this.data = heatData
		},
	},
  mounted() {
    this.handleData()
    setInterval(() => {
      this.handleData()
    }, 3000)
  }
}
</script>

<style lang="scss" scoped>
.map-container {
	height: 100%;
	width: 100%;
	position: relative;
}
</style>
