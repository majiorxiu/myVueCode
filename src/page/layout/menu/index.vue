<template>
	<el-menu class="el-menu-vertical-demo"
		:unique-opened="true">
		<el-submenu v-for="(item, index) in menus"
			:index="`m${index}`"
			:key="index">
			<span slot="title">{{item.name}}</span>
			<el-menu-item v-for="(child, index2) in item.children"
				:key="`${index}-${index2}`">
				<router-link class="menu-link" :to="`${item.path}/${child.path}`">{{child.name}}</router-link>
			</el-menu-item>
		</el-submenu>
	</el-menu>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
	name: 'my-menu',
	data () {
		return {
		}
	},
	computed: {
		...mapGetters(['menus'])
	},
}
</script>
<style lang="scss" scoped>
.el-menu-vertical-demo {
	height: 100%;
}
.menu-link {
	display: inline-block;
	height: 100%;
	width: 100%;
}
</style>