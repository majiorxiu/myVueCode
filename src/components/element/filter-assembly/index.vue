<template>
  <div class="filters dis-flex-col" v-loading="loading">
    <el-form id="filter-components" autocomplete="off" :model="form" ref="form" :inline="true">
      <el-form-item v-for="(item, index) in filtersList"
        :key="`form-${index}`"
        :label="item.type === 'checkbox' ? null : `${item.name}：`"
        :prop="`${item.model}`">
          <template v-if="item.type === 'grid'">
            <tab-grid
              v-model="form[item.model]"
              :tabList="item.tabList"/>
          </template>
          <template v-else-if="item.type === 'rowsInput'">
            <rows-input
              v-model="form[item.model]"/>
          </template>
          <template v-else-if="item.type === 'selectCity'">
            <select-city
              v-model="form[item.model]"/>
          </template>
          <template v-else-if="item.type === 'select'">
            <el-select
              @focus="focusEvent"
              v-model="form[item.model]"
              filterable
              placeholder="请选择或输入搜索">
              <el-option
                v-for="keyVal in item.source"
                :key="keyVal.value"
                :label="keyVal.label"
                :value="keyVal.value"/>
            </el-select>
          </template>
          <template v-else-if="item.type === 'time'">
            <el-date-picker
              @focus="focusEvent"
              v-model="form[item.model]"
              :type="item.timeType"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="datepickOption[item.option]">
            </el-date-picker>
          </template>
          <template v-else-if="item.type === 'cascader'">
            <el-cascader
              @focus="focusEvent"
              v-model="form[item.model]"
              placeholder="请选择或输入搜索"
              :options="item.source || []"
              filterable/>
          </template>
          <template v-else-if="item.type === 'checkbox'">
            <el-checkbox v-model="form[item.model]">{{item.name}}</el-checkbox>
          </template>
          <template v-else>
            <el-input
              @focus="focusEvent"
              v-model="form[item.model]"
              placeholder="请输入查询条件"
              :maxlength="item.maxlength"
              :show-word-limit="!!item.maxlength"
              :oninput="item.type === 'number' ? 'value=value.replace(/[^\\d]/g, \'\')' : null">
              <template v-if="item.append" slot="append">{{item.append}}</template>
            </el-input>
          </template>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="mg-b-20">
      <el-button v-for="(but, index) in buttons"
        :key="index"
        @click="but.fun">
        {{but.name}}
      </el-button>
    </div>
    <grid
      class="flex-1"
      :data="tableData"
      :cols="tableOption.column"
      :id="tableOption.id"
			:show-summary="tableOption.summary"
      :selection-col="tableOption.selection"
      v-model="selectList"
    />
    <el-pagination
      class="mg-t-20"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
  </div>
</template>
<script>
import TabGrid from './tab-grid'
import RowsInput from './rows-input'
import SelectCity from './select-city'
import Grid from '../grid'
import datePickOptions from '@/mixin/datepick-options'
import bus from '@js/eventBus'
// 标准 查询,表格,分页 形式的页面组件,
// 父组件中通过数据配置 查询条件, 表格数据地址
// 使父组件更注重业务操作
export default {
  name: 'filter-from',
  components: {TabGrid, RowsInput, SelectCity, Grid},
  mixins: [ datePickOptions ],
  props: {
    filtersList: Array,
    tableOption: Object,
    buttons: Array,
  },
  data () {
    return {
      form: {},
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
        }, {
          id: '12987127',
          name: '王小虎',
          amount1: '678',
          amount2: '4.22',
          amount3: 11
        }, {
          id: '12987128',
          name: '王小虎',
          amount1: '679',
          amount2: '4.23',
          amount3: 10
        }, {
          id: '12987129',
          name: '王小虎',
          amount1: '680',
          amount2: '4.13',
          amount3: 9
        }
			],
      selectList: undefined,
      currentPage: 1,
      loading: false,
    }
  },
  watch: {
    selectList: {
      handler(newVal, oldVal) {
        this.$emit('input', newVal)
      }
    }
  },
  methods: {
    init () {
      let form = {}
      this.filtersList.forEach(item => {
        form[item.model] = item.default
      })
      this.$set(this, 'form', form)
    }, 
    resetForm(formName) {
      // this.$refs[formName].resetFields();
      this.init()
    },
    search () {
      if(!this.loading) {
        this.loading = true
        console.log('查询')
        setTimeout(() => {
          this.loading = false
        }, 3000)
      }
    },
    handleSizeChange() {

    },
    handleCurrentChange() {

    },
    focusEvent () {
      bus.$emit('hide');
    },
  },
  mounted () {
    this.init();
    bus.$on('search', this.search)
  }
}
</script>
<style lang="scss">
.filters {

}
</style>