[TOC]
持续更新...

#hit-map
2021-04-12 17:13:27 星期一
版本信息：v1.1.7
项目描述：基于vue2.x + openlayers6.x的二次封装，不需要深入接触openlayers原生就可以搭建地图，方便其他同事使用，加快地图开发速度
源码地址：[Gitee](https://gitee.com/learningCommissary/hit-map-npm "hit-map源码")
## 引入方法
### npm下载
```
  npm install hit-map
```

### main.js配置
```html
import HitMap from 'hit-map'
import 'hit-map/dist/hit-map.css'

Vue.use(HitMap)
```


##地图初始化组件
地图实例化组件，必须引入，是所有组件的入口
```
hit-map
```
- 所有图层组件以插槽的方式插入该组件
- 注：ref="hitMap"为必填项
## 地图瓦片组件
### map -使用方法
```html
<hit-map ref="hitMap" :mapUrl="mapUrl" :center="[111, 23]" :zoom="10"></hit-map>
```

### map - 可选参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|ref |是  |string |绑定dom   |
|mapUrl |否  |string | 地图瓦片地址，暂时只支持XYZ格式瓦片（默认为高德黑色）    |
|center     |否  |string | 地图初始缩放等级（默认为10）    |
|controller     |否  |boolean | 是否需要图层控制器（默认为false）    |
|position     |否  |string |图层控制器的位置（当选用图层控制器时才有效），可选：left-top、left-center、left-bottom、right-top、right-center、right-bottom ，默认为right-center    |


##圆形组件
圆形图形图层，一个组件相当于一个图层，以插槽的形式插入hit-map
```
hit-map-circle
```
![](https://gitee.com/learningCommissary/img-folder/raw/master/hit-map/circle.png)
## 圆形区域组件
### circle - 使用方法
```html
<hit-map-circle :data="data" name="circle"  />
```
### circle - datadata数据示例
```json
//单个图形
data: {
	center: [111, 23],
	radius: 10,
}

//多个图形
data: [
	{
		center: [111, 23],
		radius: 10,
	},
	{
		center: [111.11, 23],
		radius: 10,
	}
]
```
### circle - 可选参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|name |否  |string |图层名字   |
|data |否  |object / array | 图形数据，center为圆形位置，radius为圆形区域半径。    |
|border     |否  |string | 圆形区域边框颜色，默认为#000（支持16进制/rgb/rgba）    |
|width     |否  |string / number | 圆形区域边框颜色，默认为2   |
|background     |否  |string |圆形区域的背景颜色，默认为rgba(64, 158, 255, 0.4)（支持16进制/rgb/rgba）  |
|zIndex     |否  |string / number |图层层级，默认为2  |
|visible     |否  |boolean |图层是否可见，默认为false  |
|appendToMap     |否  |boolean |是否需要在图层控制器中显示，默认为true  |

### circle - Event
|事件名称|说明|回调参数|
|:----    |:---|:----- |
|click |区域点击时触发  |当前点击区域的信息，_event为鼠标点击信息，target为当点击区域的信息，mouseEvent为鼠标点击位置的经纬度|

##多边形组件
多边形形图形图层，一个组件相当于一个图层，以插槽的形式插入hit-map
```
hit-map-polygon
```
![](https://gitee.com/learningCommissary/img-folder/raw/master/hit-map/polygon.png)
## 矩形区域组件
### polygon - 使用方法
```html
<hit-map-polygon :data="data" name="polygon"  />
```
### polygon - data数据示例
```json
//[经度， 纬度]

//单个图形
data: [
	[111.777, 23],
	[111.5678, 23.22],
	[111.7869, 23.33],
	[111.55, 23.44],
	[111, 23],
]

//多个图形
data: [
	[
		[111.777, 23],
		[111.5678, 23.22],
		[111.7869, 23.33],
		[111.55, 23.44],
		[111, 23]
	],
	[
		[111.555, 23],
		[111.5678, 23.22],
		[111.7869, 23.33],
		[111.55, 23.44],
		[111, 23]
	],
	...
]


```
### polygon - 可选参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|name |否  |string |图层名字   |
|data |否  | array | 由多组经纬度坐标组成的多边形定点    |
|border     |否  |string | 多边形区域边框颜色，默认为#000（支持16进制/rgb/rgba）  |
|width     |否  |string / number | 多边形区域边框颜色，默认为2   |
|background     |否  |string |多边形区域的背景颜色，默认为rgba(64, 158, 255, 0.4) （支持16进制/rgb/rgba） |
|zIndex     |否  |string / number |图层层级，默认为2  |
|visible     |否  |boolean |图层是否可见，默认为false  |
|appendToMap     |否  |boolean |是否需要在图层控制器中显示，默认为true  |

### polygon - Event
|事件名称|说明|回调参数|
|:----    |:---|:----- |
|click |区域点击时触发  |当前点击区域的信息，_event为鼠标点击信息，target为当点击区域的信息，mouseEvent为鼠标点击位置的经纬度|


##路径组件
路径图形图层，一个组件相当于一个图层，以插槽的形式插入hit-map
```
hit-map-line
```
![](https://gitee.com/learningCommissary/img-folder/raw/master/hit-map/line.png)
## 路径/线组件
### line - 使用方法
```html
<hit-map-line :data="data" name="line"  />
```
### line - data数据示例
```json
//[经度， 纬度]

//单条路径
data: [
	[111.777, 23],
	[111.5678, 23.22],
	[111.7869, 23.33],
	[111.55, 23.44],
	[111, 23],
]

//多条路径
data: [
	[
		[111.777, 23],
		[111.5678, 23.22],
		[111.7869, 23.33],
		[111.55, 23.44],
		[111, 23]
	],
	[
		[111.555, 23],
		[111.5678, 23.22],
		[111.7869, 23.33],
		[111.55, 23.44],
		[111, 23]
	],
	...
]


```
### line - 可选参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|name |否  |string |图层名字   |
|data |否  | array | 由多组经纬度坐标组成的多边形定点    |
|border     |否  |string | 路径的区域边框颜色，默认为#000（支持16进制/rgb/rgba）  |
|width     |否  |string / number | 路径的边框颜色，默认为2   |
|zIndex     |否  |string / number |图层层级，默认为2  |
|visible     |否  |boolean |图层是否可见，默认为false  |
|appendToMap     |否  |boolean |是否需要在图层控制器中显示，默认为true  |

### line - Event
|事件名称|说明|回调参数|
|:----    |:---|:----- |
|click |路径点击时触发  |当前点击路径的信息，_event为鼠标点击信息，target为当点击路径的信息，mouseEvent为鼠标点击位置的经纬度|

##标记覆盖物组件
路径图形图层，一个组件相当于一个图层，以插槽的形式插入hit-map
```
hit-map-marker
```
![](https://gitee.com/learningCommissary/img-folder/raw/master/hit-map/marker.png)
## 坐标点覆盖物组件
### marker - 使用方法
```html
<hit-map-marker :data="data" name="line"  />
```
### marker - data数据示例
```json

//单个坐标点
data: {
	longitude: 111,
	latitude: 23,
	name: '杨正一号',
	age: 37,
}

//多个坐标点
data:[
	{
		longitude: 111,
		latitude: 23,
		name: '杨正一号',
		age: 37,
	},
	{
		longitude: 111.333,
		latitude: 23,
		name: '杨正二号',
		age: 37,
		// 支持每个点单独设置样式
		style: {
			text: '杨正二号',    // 需要显示的文字
			fontSize: 16,    // 文字的大小
			offsetY: -220,    // 文字的Y轴偏移
			offsetX: 0,    // 文字的X轴偏移
			color: '#fff',    // 文字的颜色
			icon: vueIcon,    // 文字的图标（支持base64， 优先级高于图层设定的icon）
		},
	},
]


```
### marker - 可选参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|name |否  |string |图层名字   |
|data |否  | object / array | 图层标记覆盖物的数据，支持单个标记和者多组标记    |
|markerId     |否  |string | 可选择标记点数据内一个字段作为该标记的id（方便后续直接定位到该标记物）   |
|longitude     |否  |string | 标记数据中代表经度的字段（默认为longitude）   |
|latitude     |否  |string | 标记数据中代表纬度的字段（默认为latitude）   |
|icon     |否  |string | 该图层所有标记物的图标（支持base64格式），也可以在标记物数据中的style字段中单独给坐标点设定图标   |
|zIndex     |否  |string / number |图层层级，默认为3  |
|visible     |否  |boolean |图层是否可见，默认为false  |
|appendToMap     |否  |boolean |是否需要在图层控制器中显示，默认为true  |

### marker - Event
|事件名称|说明|回调参数|
|:----    |:---|:----- |
|click |标记点击时触发  |当前点击标记的信息，_event为鼠标点击信息，target为当点击标记的信息，mouseEvent为鼠标点击位置的经纬度|

##信息覆盖物组件
信息覆盖物组件，可配合各图层的click事件中返回的数据使用，也可单独使用，支持插槽
```
hit-map-overlay
```
![](https://gitee.com/learningCommissary/img-folder/raw/master/hit-map/overlay1.png)    ![](https://gitee.com/learningCommissary/img-folder/raw/master/hit-map/overlay2.png)
## 信息框覆盖物组件
### overlay - 使用方法
```html
<hit-map-overlay :position="position" content="content" >
	<slot></slot>
</hit-map-overlay>
```
### overlay - data数据示例
```json
position: [111, 23], // [经度， 纬度]
content: '杨正一号'


```
### overlay - 可选参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|position |是  |string |信息覆盖物被定位到的坐标点   |
|content |否  | string | 信息框显示的内容（如有插槽优先显示插槽内容）    |
|align     |否  |string | 定义 overlay 相对于其位置属性的实际位置，默认为top-left（可选: 'bottom-left', 'bottom-center', 'bottom-right', 'center-left', 'center-center', 'center-right', 'top-left','top-center', and 'top-right'）   |
|autoPan     |否  |string | 默认为false，如果设置为true，则在调用setPosition将平移映射，以便在当前视图中 overlay 完全可见   |


## 地图绘制组件
目前提供圆、多边形、线的绘制工具（后续更新），工具支持移动、折叠、清除等功能，直接引入即可
```
hit-map-draw
```
![](https://gitee.com/learningCommissary/img-folder/raw/master/hit-map/draw.gif)
### draw - 使用方法
```html
<hit-map-draw />
```
### draw - Event
|事件名称|说明|回调参数|
|:----    |:---|:----- |
|drawstart |绘制开始时触发  |事件对象|
|drawend |绘制结束时触发  |事件对象，feature：Feature对象， userFeature：格式化后的图形数据（feature和userFeature放进对应图形的组件的data中都可以直接显示）|
|change |图形改变时触发  |事件对象|
|clear |清除图形时触发  |-|



##轨迹移动组件
轨迹移动组件，是用于展示行进轨迹的组件，允许在坐标移动过程中增加新行进目标坐标点
```
hit-map-track
```
![](https://gitee.com/learningCommissary/img-folder/raw/master/hit-map/track.gif)
## 轨迹跟踪组件
### track - 使用方法
```html
<hit-map-track :data="data" />
```
### track - data数据示例
```json
// [经度,  纬度]
data: [
	[111.23423, 23.345],
	[111.75445, 23.56446],
	[111.4324, 23.54356],
	[111.988, 23.5646],
	[111.2177, 23.78675],
	[111.5657, 23.23432],
	[111.6574, 23.6457],
	...
]


```
### track - 可选参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|data |否  | array | 轨迹的数据    |
|icon     |否  |string | 移动图标的图片 |
|speed |否  |string / number| 移动的速度, 默认为30（数值越大速度越快）  |
|lineVisible   |否  |boolean | 是否显示行进路径，默认为true   |
|repeat     |否  |boolean | 是否开启循环播放， 默认为false   |




##热力图组件
热力图组件组件，是用来呈现一定区域内的统计度量，最常见的网站访问热力图就是以特殊高亮的形式显示访客热衷的页面区域和访客所在的地理区域的图示。
```
hit-map-heat
```
![](https://gitee.com/learningCommissary/img-folder/raw/master/hit-map/heat.png)
## 热力图组件
### heat - 使用方法
```html
<hit-map-heat :data="data" />
```
### heat - data数据示例
```json
data: [
	{
		longitude: 111, // 经度
		latitude: 23， // 纬度
		weight: 0.2 // 该坐标点的权重值(0-1之间的小数)
	},
	{
		longitude: 111.3434, // 经度
		latitude: 23.54674859， // 纬度
		weight: 0.45 // 该坐标点的权重值(0-1之间的小数)
	}
	...
]


```
### heat - 可选参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|name |否  |string |图层名字   |
|data |否  | object / array | 热力图的数据    |
|gradient     |否  |array | 热力图渲染色带颜色   |
|longitude     |否  |string | 热力图数据中代表经度的字段（默认为longitude）   |
|latitude     |否  |string | 热力图数据中代表纬度的字段（默认为latitude）   |
|radius     |否  |number | 每个像素渲染点半径   |
|blur     |否  |number | 模糊度   |
|zIndex     |否  |string / number |图层层级，默认为1  |
|visible     |否  |boolean |图层是否可见，默认为false  |



## 风场组件
显示地图风场的图层
```
hit-map-wind
```
![](https://gitee.com/learningCommissary/img-folder/raw/master/hit-map/wind.gif)
### wind - 使用方法
```html
<hit-map-draw :data="data" />
```