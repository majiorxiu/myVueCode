<template>
	<div id="echarts-bar" :style="{'width': width, 'height':height}">

	</div>
</template>
<script>
import echarts  from 'echarts'
export default {
	name: 'echarts-bar',
	props: {
		width: {
			type: String,
			default: '100%'
		},
		height: {
			type: String,
			default: '300px'
		},
    colors: Array,
    title: String,
    xdata: Array,
    ydata: Array,
	},
	data () {
		return {
			mychart: undefined,
		}
	},
	methods: {
		init () {
			this.myChart = echarts.init(document.getElementById('echarts-bar'));
      // 绘制图表
      let title = this.title;
      let xdata = this.xdata;
      let ydata = this.ydata;
      let colors = this.colors;
			this.myChart.setOption({
				title: {
					text: title
				},
				tooltip: {},
				xAxis: {
					data: xdata,
				},
				yAxis: {},
				series: [{
					name: '销量',
					type: 'bar',
					data: ydata,
					itemStyle: {
						color: ({dataIndex}) => {
							const color = colors || [
								'#ff0000',
								'#ff4040',
								'#ff7373',
								'#a60000',
							]
							let index = dataIndex % color.length;
							return color[index];
						}
					}
				}]
			});
		}
	},
	mounted () {
		this.init();
	}
}
</script>