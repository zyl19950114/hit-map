import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'mapTest',
    component: () => import(/* webpackChunkName: "about" */ '../views/mapTest.vue')
  },
  {
    path: '/honeycomb',
    name: 'honeycomb',
    component: () => import(/* webpackChunkName: "about" */ '../views/honeycomb.vue')
  },
  {
    path: '/line',
    name: 'line',
    component: () => import(/* webpackChunkName: "about" */ '../views/line.vue')
  },
  {
    path: '/draw',
    name: 'draw',
    component: () => import(/* webpackChunkName: "about" */ '../views/drawView.vue')
  },
  {
    path: '/wind',
    name: 'wind',
    component: () => import(/* webpackChunkName: "about" */ '../views/wind.vue')
  },
  {
    path: '/heat',
    name: 'heat',
    component: () => import(/* webpackChunkName: "about" */ '../views/heatMap.vue')
  },
  {
    path: '/track',
    name: 'track',
    component: () => import(/* webpackChunkName: "about" */ '../views/trackView.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
