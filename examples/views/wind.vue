<template>
	<div class="map-container">
		<hit-map
			ref="hitMap"
			:center="[113.53450137499999, 34.44104525]"
			:zoom="10"
		>
      <hit-map-wind :data="data" paths="2000" />
		</hit-map>
	</div>
</template>

<script>

import data from '../../packages/utils/wind.json'
export default {
  data() {
    return {
      data: data
    }
  },
}
</script>

<style scoped>
.map-container {
	height: 100%;
	width: 100%;
	position: relative;
}
</style>
