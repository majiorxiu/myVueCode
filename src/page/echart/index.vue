<template>
	<div>
		<div class="page-title">
			可配置柱状图各bar颜色
		</div>
		<echarts-bar
			:width="'100%'"
			:height="'400px'"
			:title="'各色柱状图'"
			:colors="colors"
			:xdata="xdata"
			:ydata="ydata"
		/>
	</div>
</template>
<script>
import EchartsBar from './components/bar'
export default {
	name: 'echarts-index',
	components: {EchartsBar},
	data () {
		return {
			xdata: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
			ydata: [5, 20, 36, 10, 10, 20],
			colors: [
				'#ff0000',
				'#009999',
				'#9fee00',
				'#a60000',
				'#009999',
			],
		}
	},
	methods: {
		
	},
}
</script>