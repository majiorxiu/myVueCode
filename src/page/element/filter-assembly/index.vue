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
      <el-form-item label="运单号">
        <rows-input
          v-model="form.orderS2">
          <template slot="input-prepend">
            <el-select v-model="form.type" class="w-100">
              <el-option :value="1">1</el-option>
              <el-option :value="2">2</el-option>
              <el-option :value="3">3</el-option>
            </el-select>
          </template>
        </rows-input>
      </el-form-item>
      <el-form-item label="之前日期">
        <el-date-picker
          v-model="form.date1"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="within">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="之前日期时间">
        <el-date-picker
          v-model="form.date2"
          type="datetimerange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="withinTime">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="未来日期">
        <el-date-picker
          v-model="form.date3"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="next">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="未来日期时间">
        <el-date-picker
          v-model="form.date4"
          type="datetimerange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="nextTime">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getFilter">查询</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
    {{numResult}}
  </div>
</template>
<script>
import TabGrid from './components/tab-grid'
import RowsInput from './components/rows-input'
import SelectCity from './components/select-city'
import {
  datePickOptionsWithin,
  datePickOptionsNext,
  datePickOptionsWithinTime,
  datePickOptionsNextTime} from '@/mixin/index'
import getCommand from '@/mixin/get-command'
export default {
  name: 'filter-assembly',
  components: { TabGrid, RowsInput, SelectCity},
  mixins: [
    datePickOptionsWithin,
    datePickOptionsNext,
    datePickOptionsWithinTime,
    datePickOptionsNextTime,
    getCommand
  ],
  data () {
    return {
      form: {
        ids: '',
        orderS: '',
        endCity: '',
        orderS2: '',
        type: 1,
        date1: undefined,
        date2: undefined,
        date3: undefined,
        date4: undefined,
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
      ],
      num: {
        a: 2,
        b: 2,
      },
      numResult: undefined,
    }
  },
  methods: {
    getFilter() {
      console.log(this.form);
    },
    resetForm() {
      this.$refs['filterForm'].resetFields();
    },
    add ({a,b}) {
      return a + b
    },
    add2 ({a, b})  {
      return a - b
    },
    f1btn (event) {
      if(event.keyCode === 112) { // 拦截f1-f12 快捷键
        this.numResult = 111
        event.returnValue = false;
      }
    }
  },
  mounted () {
    this.bindAction(this.add, 'numResult', 'num', {
      action: 'abc'
    })
    this.bindAction(this.add2, 'numResult', 'num', {
      action: 'abc2'
    })
    // this.doAction({action: 'abc2'});
    window.addEventListener('keydown', this.f1btn, true)
  }
}
</script>
<style lang="scss" scoped>
.filter-assembly {
  .w-100 {
    width: 100px;
  }
}
</style>