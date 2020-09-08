<template>
	<div class="my-home dis-flex-center">
		<!-- <div class="dis-tab-cell"> -->
		<div>
			<span class="abcd">{{msg}}</span>
			<el-button type="primary">点点点</el-button>
		</div>
	</div>
</template>
<script>
export default {
	name: 'index',
	data () {
		return {
			msg: '欢迎使用'
		}
	},
	mounted () {
	}
}
</script>
<style lang="scss">
.my-home {
	.dis-flex-center {
		height: 100%;
		width: 100%;
	}
	.abcd {
		color: $--color-primary;
	}
}
</style>
