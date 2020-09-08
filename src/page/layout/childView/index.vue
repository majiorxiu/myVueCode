<template>
	<div>
		<el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="tabRemove" @tab-click="tabChage" v-if="!fullScreen">
			<el-tab-pane
				v-for="item in editableTabs"
				:key="item.fullPath"
				:label="item.name"
				:name="item.fullPath"
			>
			</el-tab-pane>
		</el-tabs>
		<keep-alive>
			<router-view/>
		</keep-alive>
	</div>
</template>
<script>
import FullScreen from '@m/full-screen'
export default {
	name: 'child-view',
	mixins: [ FullScreen ],
	data () {
		return {
			editableTabs: [],
			editableTabsValue: undefined,
		}
	},
	watch: {
		$route(to,from){
			this.routerPush(to)
		},
		deep: true
	},
	methods: {
		tabRemove(targetName) {
			let list = this.editableTabs
			let val = this.editableTabsValue
			list = list.filter(item => item.fullPath !== targetName)
			if(list.length){
				if(val === targetName){
					val = list[list.length - 1].fullPath
				}
			} else {
				list.length = 0
				val = '/'
			}
			this.editableTabs = list
			this.$router.push(val)
		},
		routerPush(to) {
			if(!this.editableTabs.some(item => item.fullPath === to.fullPath)) {
				this.editableTabs.push(to)
				setTimeout(() => {
					// 删除element-ui 组件 tabs 的内容div
					let div = document.getElementById('pane-' + to.fullPath)
					div.remove()
				}, 1000)
			}
			this.editableTabsValue = to.fullPath
		},
		tabChage(target) {
			let {name} =  target
			this.$router.push(name)
		}
	},
	mounted () {
		this.routerPush(this.$route);
	}
}
</script>