import Track from './src/track.vue'

Track.install = function(Vue) {
  Vue.component(Track.name, Track)
}

export default Track