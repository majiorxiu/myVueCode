<template>
  <div class="mg-t-10">
    <filter-form
      :filters-list="filtersList"
      :table-option="tableOption"
      :buttons="buttons"
      v-model="selectRows"/>
  </div>  
</template>
<script>
import FilterForm from '@com/element/filter-assembly/index'
import bus from '@js/eventBus'
export default {
  components: {FilterForm},
  data () {
    const options2= [{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }, {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio 单选框'
            }, {
              value: 'checkbox',
              label: 'Checkbox 多选框'
            }, {
              value: 'input',
              label: 'Input 输入框'
            }, {
              value: 'input-number',
              label: 'InputNumber 计数器'
            }, {
              value: 'select',
              label: 'Select 选择器'
            }, {
              value: 'cascader',
              label: 'Cascader 级联选择器'
            }, {
              value: 'switch',
              label: 'Switch 开关'
            }, {
              value: 'slider',
              label: 'Slider 滑块'
            }, {
              value: 'time-picker',
              label: 'TimePicker 时间选择器'
            }, {
              value: 'date-picker',
              label: 'DatePicker 日期选择器'
            }, {
              value: 'datetime-picker',
              label: 'DateTimePicker 日期时间选择器'
            }, {
              value: 'upload',
              label: 'Upload 上传'
            }, {
              value: 'rate',
              label: 'Rate 评分'
            }, {
              value: 'form',
              label: 'Form 表单'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table 表格'
            }, {
              value: 'tag',
              label: 'Tag 标签'
            }, {
              value: 'progress',
              label: 'Progress 进度条'
            }, {
              value: 'tree',
              label: 'Tree 树形控件'
            }, {
              value: 'pagination',
              label: 'Pagination 分页'
            }, {
              value: 'badge',
              label: 'Badge 标记'
            }]
          }, {
            value: 'notice',
            label: 'Notice',
            children: [{
              value: 'alert',
              label: 'Alert 警告'
            }, {
              value: 'loading',
              label: 'Loading 加载'
            }, {
              value: 'message',
              label: 'Message 消息提示'
            }, {
              value: 'message-box',
              label: 'MessageBox 弹框'
            }, {
              value: 'notification',
              label: 'Notification 通知'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'menu',
              label: 'NavMenu 导航菜单'
            }, {
              value: 'tabs',
              label: 'Tabs 标签页'
            }, {
              value: 'breadcrumb',
              label: 'Breadcrumb 面包屑'
            }, {
              value: 'dropdown',
              label: 'Dropdown 下拉菜单'
            }, {
              value: 'steps',
              label: 'Steps 步骤条'
            }]
          }, {
            value: 'others',
            label: 'Others',
            children: [{
              value: 'dialog',
              label: 'Dialog 对话框'
            }, {
              value: 'tooltip',
              label: 'Tooltip 文字提示'
            }, {
              value: 'popover',
              label: 'Popover 弹出框'
            }, {
              value: 'card',
              label: 'Card 卡片'
            }, {
              value: 'carousel',
              label: 'Carousel 走马灯'
            }, {
              value: 'collapse',
              label: 'Collapse 折叠面板'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '资源',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
        }]
    return {
      filtersList: [
        {
          name: '所属会员',
          model: 'a1',
          type: 'grid',
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
        },
        {
          name: '商品条码',
          model: 'a2'
        },
        {
          name: '商品编码',
          model: 'a3',
          type: 'rowsInput'
        },
        {
          name: '商品名称',
          model: 'a4',
          append: 'KG'
        },
        {
          name: '商品名称',
          model: 'a5'
        },
        {
          name: '商品类别',
          model: 'a6',
          type: 'cascader',
          source: options2
        },
        {
          name: '组合商品',
          model: 'a7',
          type: 'select',
          source: [],
        },
        {
          name: '包材',
          model: 'a8',
          type: 'select',
          source: [],
        },
        {
          name: '禁航空',
          model: 'a9',
          type: 'select',
          source: [],
        },
        {
          name: '物流码',
          model: 'a10',
          type: 'select',
          source: [],
          default: '选项1'
        },
        {
          name: '款号',
          model: 'a11',
          maxlength: 20,
          default: 123
        },
        {
          name: '颜色',
          model: 'a12',
        },
        {
          name: '尺码',
          model: 'a13',
          maxlength: 11,
          type: 'number'
        },
        {
          name: '日期',
          model: 'a14',
          type: 'time',
          timeType: 'daterange',
          option: 'within'
        }
      ],
      tableOption: {
        id: 'lulululu',
        selection: true,
        column:  [
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
                attrs: {
                  type: 'primary',
                },
                on:{
                  click: () => {
                    this.clickName(params)
                  }
                }
              }, params.row.name)
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
            width: '180',
            sortable: true,
            formatter: this.formatter1
          },
          {
            prop: 'amount3',
            label: '数值3',
            width: '180',
            sortable: true,
          },
          {
            prop: 'amount4',
            label: '数值4',
            width: '180',
            sortable: true,
          },
          {
            prop: 'amount5',
            label: '数值5',
            width: '180',
            sortable: true,
          },
          {
            prop: 'amount6',
            label: '数值6',
            width: '180',
            sortable: true,
          },
          {
            prop: 'amount7',
            label: '数值7',
            width: '180',
            sortable: true,
          },
          {
            prop: 'amount8',
            label: '数值8',
            width: '180',
            sortable: true,
          },
          {
            prop: 'amount9',
            label: '数值9',
            width: '180',
            sortable: true,
          },
          {
            prop: 'amount10',
            label: '数值10',
            width: '180',
            sortable: true,
          }
        ],
      },
      selectRows: undefined,
      buttons: [
        {
          name: '新增',
          fun: this.add,
        },
        {
          name: '删除',
          fun: this.del,
        }
      ],
      options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }]
    }
  },
  methods: {
    clickName(params) {
      console.log(params)
    },
    add () {
      console.log('add')
      this.$message({
        message: '这是一条成功消息',
        type: 'success'
      });
    },
    del () {
      this.$message({
        message: '这是一条警告消息',
        type: 'warning'
      });
      bus.$emit('search')
      console.log(this.selectRows);
    },
    formatter1 (val) {
      return val + '$123'
    }
  },
  mounted() {
    setTimeout(() => {
      this.filtersList.forEach(item => {
        if(item.type === 'select') {
          item.source = new Array().concat(this.options)
        }
      })
    }, 3000)
    document.onkeydown = () => {
      console.log(window.event.keyCode)
    }
  }
}
</script>
<style lang="scss">

</style>