<template>
  <div class="tab-grid" @click.stop>
    <basics-components 
      :placeholder="'请选择'"
      v-model="selectText"
      @show="showGridDialog">
      <template slot="content">
        <div class="grid-dialog">
          <el-tabs v-model="activeName" 
            @tab-click="handleClick">
            <el-tab-pane v-for="(tabItem, index) in tabList" :key="`tabs-${index}`"
              :label="tabItem.tabName"
              :name="`tabs-${index}`">
            </el-tab-pane>
          </el-tabs>
          <div class="dis-flex mg-b-20">
            <div class="flex-1">
              <el-tag
                v-for="tag in selectValue"
                :key="tag.name"
                closable
                class="mg-r-10"
                @close="removeTag(tag)">
                {{tag.name}}
              </el-tag>
            </div>
            <div>
              <el-input v-model="filterText" placeholder="过滤表格"/>
            </div>
          </div>
          <el-table
            :data="gridDataFilter"
            ref="multipleTable"
            border
            style="width: 100%"
            @select="handleSelectionChange"
            @select-all="handleSelectionChange">
            <el-table-column 
              type="selection"
              width="55"/>
            <el-table-column v-for="(col,index) in tabList[tabCurrentIndex].tabGridCol"
            :key="index"
            :prop="col.prop"
            :label="col.label"
            :sortable="col.sortable || false"
            :width="col.width"
            :align="col.align || 'left'"
            :formatter="col.formatter || null"/>
          </el-table>
        </div>
      </template>
    </basics-components>
  </div>
</template>
<script>
import BasicsComponents from './components/basics-components'
// 分类表格选择器
export default {
  name: 'tab-grid',
  props: {
    value: String,
    tabList: Array,
    // tabList: [ //配置多个tab
    //   {
    //     tabName: '', // tab标题
    //     tabGridUrl: '', // 表格请求地址
    //     tabGridCol: [  // 表格列配置
    //       {
    //         prop: 'id',
    //         label: 'ID',
    //         width: '180',
    //         align: 'center',
    //         formatter: function(row, col, val) {
    //         }
    //       }
    //     ],
    //   }
    // ]
  },
  components: { BasicsComponents },
  watch: {
    'value': {
      handler (newVal, oldVal) {
        if(!newVal) {
          this.selectText = newVal;
          this.selectValue.length = 0;
          this.tabselectValue.length = 0;
          this.$refs.multipleTable.clearSelection();
        }
      }
    },
    'tabselectValue': {
      handler () {
        this.selectText = this.tabselectValue.reduce((a,b) => {return a.concat(b)}, []).map(item => item.name).join(',');
      },
      deep: true
    },
    'filterText': {
      handler (newVal,oldVal) {
        if(newVal === '') {
          this.gridDataFilter = this.gridData.concat();
        } else {
          this.gridDataFilter = this.gridData.filter(item => {
            let result = false;
            for (const key in item) {
              let str = item[key] + '';
              if(str.indexOf(newVal) >=0) {
                result = true;
              }
            }
            return result;
          });
        }
        this.$nextTick(() => {
          this.selectValue.forEach(item => {
            this.rowSelected(item);
          })
        })
      }
    }
  },
  data () {
    return {
      activeName: '',
      tabCurrentIndex: 0,
      selectValue: [],
      tabselectValue: [[]],
      selectText: '',
      filterText: '',
      gridData: [],
      gridDataFilter: [],
      tabChangeIng: false,
      timeoutKey: null,
      gridData1: [
        {
          id: '12987122',
          name: '王小虎',
        }, {
          id: '12987123',
          name: '王小二',
        }, {
          id: '12987124',
          name: '王小胖',
        }
      ],
      gridData2: [
        {
          id: '12987125',
          name: '王小丫',
          count: 10
        }, {
          id: '12987126',
          name: '王小黑',
          count: 20
        }, {
          id: '12987127',
          name: '王小',
          count: 30
        }
      ],
    }
  },
  methods: {
    handleClick() { // tab标签页切换时，更改表格数据源，根据选中数据总集合中当前标签页内的选中数据回显到表格选中行
      this.tabCurrentIndex = this.activeName.split('-')[1] - 0;
      this.gridData.length = 0;
      this.gridDataFilter = this.gridData = this.tabCurrentIndex === 0 ? this.gridData1.concat() : this.gridData2.concat();
      this.selectValue.length = 0;
      this.$nextTick(() => {
        if(this.tabselectValue[this.tabCurrentIndex] && this.tabselectValue[this.tabCurrentIndex].length) {
          this.tabselectValue[this.tabCurrentIndex].forEach(item => {
            this.rowSelected(item);
            this.selectValue.push(item);
          });
        }
      })
    },
    handleSelectionChange (val) { //表格行选中时，选中数据添加到当前标签页集合与总集合，并返回给父组件
      this.selectValue = val.concat();
      this.$set(this.tabselectValue, this.tabCurrentIndex ,this.selectValue.concat())
      this.$emit('input', this.tabselectValue.reduce((a,b) => {return a.concat(b)}, []).map(item => item.id).join(','));
    },
    showGridDialog () { // 显示弹窗并回到第一个tab标签页
      this.activeName = 'tabs-0'
    },
    removeTag(tag) { // 通过tag标签取消表格选中
      this.selectValue = this.selectValue.filter(item => item.id !== tag.id);
      this.$set(this.tabselectValue, this.tabCurrentIndex ,this.selectValue.concat())
      this.rowSelected(tag);
    },
    rowSelected(target) { // 执行表格选中
      let row = this.gridData.find(item => item.id === target.id);
      this.$refs.multipleTable.toggleRowSelection(row);
    }
  },
  mounted () {
    this.gridData = this.gridData1.concat();
    this.gridDataFilter = this.gridData.concat();
  },
}
</script>
<style lang="scss">
.tab-grid {
  .grid-dialog {
    width: 500px;
    padding: 20px;
  }
}
</style>