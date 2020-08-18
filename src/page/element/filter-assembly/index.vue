<template>
  <div class="filter-assembly">
    <el-form :model="form" ref="filterForm" :inline="true">
      <el-form-item label="公司-学校:" prop="ids">
        <tab-grid
          v-model="form.ids"
          :tabList="tabList"/>
      </el-form-item>
      <el-form-item label="单号:" prop="orderS">
        <rows-input
          v-model="form.orderS"/>
      </el-form-item>
      <el-form-item label="到达地:" prop="endCity">
        <select-city
          v-model="form.endCity"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getFilter">查询</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import TabGrid from './components/tab-grid'
import RowsInput from './components/rows-input'
import SelectCity from './components/select-city'
export default {
  name: 'filter-assembly',
  components: { TabGrid, RowsInput, SelectCity},
  data () {
    return {
      form: {
        ids: '',
        orderS: '',
        endCity: '',
      },
      tabList: [ //配置多个tab
        {
          tabName: '公司', // tab标题
          tabGridUrl: '', // 表格请求地址
          tabGridCol: [  // 表格列配置
            {
              prop: 'id',
              label: 'ID',
              width: '180',
              align: 'center',
              formatter: function(row, col, val) {
                return val;
              }
            },
            {
              prop: 'name',
              label: '公司名',
              align: 'center',
            }
          ],
        },
        {
          tabName: '学校', // tab标题
          tabGridUrl: '', // 表格请求地址
          tabGridCol: [  // 表格列配置
            {
              prop: 'id',
              label: 'ID',
              width: '180',
              align: 'center',
            },
            {
              prop: 'name',
              label: '学校名',
              width: '180',
              align: 'center',
            },
            {
              prop: 'count',
              label: '在校人数',
              align: 'right',
              formatter: function(row, col, val) {
                return `${val}人`
              }
            }
          ],
        },
      ]
    }
  },
  methods: {
    getFilter() {
      console.log(this.form);
    },
    resetForm() {
      this.$refs['filterForm'].resetFields();
    }
  }
}
</script>
<style lang="sass" scoped>

</style>