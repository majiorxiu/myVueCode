<template>
	<el-menu 
		class="my-menu el-menu text-c"
		:class="{'w-200': !isCollapse}"
		:unique-opened="true"
		:default-active="activeMenu"
		:collapse="isCollapse">
		<img :src="logo" height="50" class="logo" @click="gotoHome">
		<el-submenu v-for="(item, index) in menus"
			:index="`m${index}`"
			:key="index">
			<span slot="title">{{item.name}}</span>
			<el-menu-item v-for="(child, index2) in item.children"
				:key="`${index}-${index2}`"
				:index="`${item.path}/${child.path}`">
				<router-link class="menu-link" :to="`${item.path}/${child.path}`">{{child.name}}</router-link>
			</el-menu-item>
		</el-submenu>
	</el-menu>
</template>
<script>
import {mapGetters} from 'vuex'
import logo from '@image/logo.png'
import bus from '@js/eventBus'
export default {
	name: 'my-menu',
	data () {
		return {
			logo,
			isCollapse: false,
			activeMenu: undefined,
		}
	},
	computed: {
		...mapGetters(['menus'])
	},
	methods: {
		gotoHome() {
			this.$router.push('/');
		},
		changeIsCollapse (val) {
			this.isCollapse = val
		}
	},
	mounted() {
		bus.$on('isCollapse', this.changeIsCollapse)
		this.activeMenu = window.location.href.split('#')[1];
	}
}
</script>
<style lang="scss">
.my-menu {
	&.el-menu {
		height: 100%;
		.logo {
			cursor: pointer;
		}
		&.w-200 {
			min-width: 200px;
		}
	}
	.menu-link {
		display: inline-block;
		height: 100%;
		width: 100%;
	}
}
</style>