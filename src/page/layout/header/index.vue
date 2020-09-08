<template>
	<el-header class="my-header dis-flex-center">
		<el-radio-group v-model="isCollapse" style="margin-bottom: 20px;" @change="changeIsCollapse">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group>
    <el-color-picker
      v-model="themeColor"
      class="float-r"
      size="small"
      popper-class="theme-picker-dropdown"/>
  </el-header>
</template>
<script>
import bus from '@js/eventBus'
export default {
	name: 'my-header',
	data () {
    let themeColor = this.consts.ORIGINAL_THEME
		return {
			isCollapse: false,
      chalk: '', // content of theme-chalk css
      themeColor,
		}
	},
	watch: {
    themeColor(val, oldVal) {
      if (typeof val !== 'string') return
      this.$store.dispatch('setThemeColor', {val, oldVal})
			localStorage.setItem('theme-chalk', val);
    }
  },
	methods: {
		changeIsCollapse() {
			bus.$emit('isCollapse', this.isCollapse)
		}
	},
	created () {
		this.themeColor = localStorage.getItem('theme-chalk') || this.themeColor;
	}
}
</script>
<style lang="scss">
.my-header {
  border-bottom: 1px solid $border-color;
}
</style>