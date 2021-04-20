<template>
  <div class="map-container">
    <hit-map ref="hitMap" controller :mapUrl="mapUrl" :center="center" :zoom="10">
      <hit-map-line
        name="线测试"
        :data="lineData"
        color="red"
        width="10"
        :visible="true"
      />
      <hit-map-line :data="lineData" color="orange" width="3" :visible="true" />
    </hit-map>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mapUrl: `http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}`,
      center: [111, 23],
      lineData: [
        [
          [111, 23],
          [111.333, 23.546],
          [111.564325, 23.435654],
          [111.7655, 23.456453],
        ],
        [
          [111.5467456, 23],
          [111.333, 23.546],
          [111.564325, 23.435654],
          [111.7655, 23.456453],
        ],
      ],
    };
  },
};
</script>

<style scoped>
.map-container {
  height: 100%;
}
</style>
