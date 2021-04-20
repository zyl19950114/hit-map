<template>
	<nav class="root-nav">
		<el-menu
			text-color="#fff"
			:collapse="isCollapse"
			class="el-menu-vertical-demo"
			@select="handleSelect"
			unique-opened
		>
			<template v-for="(navItem, $index) in navList">
				<!-- 没有子类 -->
				<el-menu-item
					v-if="!navItem.hasOwnProperty('childrens')"
					:key="$index"
					:index="navItem.path"
				>
					<span slot="title">{{ navItem.label }}</span>
				</el-menu-item>

				<!-- 有子类 -->
				<el-submenu
					v-if="navItem.hasOwnProperty('childrens')"
					:key="$index"
					:index="navItem.path"
				>
					<template slot="title">
						<span slot="title">{{ navItem.label }}</span>
					</template>
					<el-menu-item-group>
						<el-menu-item
							v-for="(subItem, $subIndex) in navItem.childrens"
							:key="$subIndex"
							:index="subItem.path"
						>
							{{ subItem.label }}
						</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
			</template>
		</el-menu>
	</nav>
</template>

<script>
export default {
	props: {
		isCollapse: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			navList: [
				{
					label: '基础功能',
					path: '/',
				},
				{
					label: '线 - HitMapLine',
					path: '/line',
				},
				{
					label: '绘制 - HitMapDraw',
					path: '/draw',
				},
				{
					label: '热力图 - HitMapHeat',
					path: '/heat',
				},
				{
					label: '风场图 - HitMapWind',
					path: '/wind',
				},
        {
					label: '轨迹移动 - HitMapTrack',
					path: '/track',
				},
				{
					label: '蜂窝图',
					path: '/honeycomb',
				},
			],
		}
	},
	methods: {
		handleSelect(val) {
			// console.log(val);
			if (this.$route.path !== val) {
				this.$router.push({
					path: val,
				})
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.el-menu,
.el-menu-item-group {
	background: {
		image: linear-gradient(to right, #0f2137, #0b2139);
	}
}
.is-active,
::v-deep .el-submenu__title:hover,
::v-deep .el-menu-item:hover,
::v-deep .el-submenu__title:focus,
::v-deep .el-menu-item:focus {
	background: #0e395d;
	position: relative;
}

.is-active::before {
	content: '';
	position: absolute;
	height: 100%;
	width: 4px;
	background: #409eff;
	left: 0;
	top: 0;
	z-index: 2;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
	min-width: 200px;
	height: 100%;
	border-right: none;
}

.root-nav {
	height: 100%;
	overflow-y: auto;
	// @extend .noScrollbar;
}
</style>
