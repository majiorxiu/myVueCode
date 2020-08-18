<template>
  <div>
		<div class="page-title">
			可表格列设置显示
		</div>
    <my-grid
      :data="tableData"
      :cols="tableColumn"
      :id="'lululu'"
			:class-name="'mg-b-20 '"
			:show-summary="true"
    />
    <my-grid
      :data="tableData"
      :cols="tableColumn"
      :id="'lalala'"
			:show-summary="true"
			:class-name="'summary-top'"
    />
  </div>
</template>
<script>
import MyGrid from './components/grid'
export default {
  name: 'grid-index',
  components: {MyGrid},
  data () {
    return {
			tableData: [
				{
          id: '12987122',
          name: '王小虎',
          amount1: '234',
          amount2: '3.2',
          amount3: 10
        }, {
          id: '12987123',
          name: '王小虎',
          amount1: '165',
          amount2: '4.43',
          amount3: 12
        }, {
          id: '12987124',
          name: '王小虎',
          amount1: '324',
          amount2: '1.9',
          amount3: 9
        }, {
          id: '12987125',
          name: '王小虎',
          amount1: '621',
          amount2: '2.2',
          amount3: 17
        }, {
          id: '12987126',
          name: '王小虎',
          amount1: '539',
          amount2: '4.1',
          amount3: 15
        }
			],
			tableColumn: [
				{
					prop: 'id',
					label: 'ID',
					width: '180',
					align: 'center',
					fixed: 'left',
					render: (h, params) => {
						return h('span', params.row.id + 'a');
					}
				},
				{
					prop: 'name',
					label: '姓名',
					width: '180',
					fixed: 'right',
					render: (h, params) => {
						return h('el-button', {
							on:{
								click: () => {
									this.clickName(params)
								}
							}
						}, params.row.name,)
					}
				},
				{
					prop: 'amount1',
					label: '数值1',
					width: '180',
					fixed: 'left',
					render: (h, params) => {
						return h('span', params.row.amount1 + '元');
					}
				},
				{
					prop: 'amount2',
					label: '数值2',
					sortable: true,
				},
				{
					prop: 'amount3',
					label: '数值3',
					sortable: true,
				}
			],
    }
  },
  methods: {
		clickName(params) {
			console.log(params); 
		},
  }
}
</script>