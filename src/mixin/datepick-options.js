import constKey from '@/js/global/const-key'
export default {
  data () {
    return {
      // 日期选择器 组件 快捷选项配置
      datepickOption: {
        within: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              picker.$emit('pick', [constKey.DATE_WITHIN_ONE_WEEK, constKey.DATE_TODAY]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              picker.$emit('pick', [constKey.DATE_WITHIN_ONE_MONTH, constKey.DATE_TODAY]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              picker.$emit('pick', [constKey.DATE_WITHIN_THREE_MONTH, constKey.DATE_TODAY]);
            }
          }]
        },
        next: {
          shortcuts: [{
            text: '一周后',
            onClick(picker) {
              picker.$emit('pick', [constKey.DATE_TODAY, constKey.DATE_NEXT_ONE_WEEK]);
            }
          }, {
            text: '一个月后',
            onClick(picker) {
              picker.$emit('pick', [constKey.DATE_TODAY, constKey.DATE_NEXT_ONE_MONTH]);
            }
          }, {
            text: '三个月后',
            onClick(picker) {
              picker.$emit('pick', [constKey.DATE_TODAY, constKey.DATE_NEXT_THREE_MONTH]);
            }
          }]
        },
        withinTime: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              picker.$emit('pick', [constKey.DATE_WITHIN_ONE_WEEK + constKey.TIME_STATR, constKey.DATE_TODAY + constKey.TIME_END]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              picker.$emit('pick', [constKey.DATE_WITHIN_ONE_MONTH + constKey.TIME_STATR, constKey.DATE_TODAY + constKey.TIME_END]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              picker.$emit('pick', [constKey.DATE_WITHIN_THREE_MONTH + constKey.TIME_STATR, constKey.DATE_TODAY + constKey.TIME_END]);
            }
          }]
        },
        nextTime: {
          shortcuts: [{
            text: '一周后',
            onClick(picker) {
              picker.$emit('pick', [constKey.DATE_TODAY + constKey.TIME_STATR, constKey.DATE_NEXT_ONE_WEEK + constKey.TIME_END]);
            }
          }, {
            text: '一个月后',
            onClick(picker) {
              picker.$emit('pick', [constKey.DATE_TODAY + constKey.TIME_STATR, constKey.DATE_NEXT_ONE_MONTH + constKey.TIME_END]);
            }
          }, {
            text: '三个月后',
            onClick(picker) {
              picker.$emit('pick', [constKey.DATE_TODAY + constKey.TIME_STATR, constKey.DATE_NEXT_THREE_MONTH + constKey.TIME_END]);
            }
          }]
        }
      }
    }
  }
}