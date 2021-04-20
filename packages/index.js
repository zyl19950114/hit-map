import { parse } from './utils/style'
import Map from './map'
import Polygon from './polygon'
import Circle from './circle'
import Line from './line'
import Marker from './marker'
import Overlay from './overlay'
import Draw from './draw'
import Heat from './heat'
import Wind from './wind'
import Track from './track'
import Controller from './controller'

import './images/font/iconfont.css'

const components = [
  Map,
  Polygon,
  Circle,
  Line,
  Marker,
  Overlay,
  Draw,
  Heat,
  Wind,
  Track,
  Controller,
]
export const parseStyle = parse

export const HitMap = Map
export const HitPolygon = Polygon
export const HitCircle = Circle
export const HitLine = Line
export const HitMarker = Marker
export const HitOverlay = Overlay
export const HitDraw = Draw
export const HitHeat = Heat
export const HitWind = Wind
export const HitTrack = Track
export const HitController = Controller

const install = function (Vue) {
  if (install.installed) return
  components.forEach(component => Vue.component(component.name, component))
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  parseStyle,
  install,
  HitMap,
  HitPolygon,
  HitCircle,
  HitLine,
  HitMarker,
  HitOverlay,
  HitDraw,
  HitHeat,
  HitWind,
  HitTrack,
  HitController
}