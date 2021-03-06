import getCommand from './getCommand'
export default {
  // 表格页面必须引用, 封装分页组件相关配置属性及事件方法
  mixins: [getCommand],
  data () {
    return {
      pageSizes: [100, 200, 300, 400, 500],
      gridLayout: 'total, sizes, prev, pager, next, jumper',
    }
  },
  methods: {
    handleSizeChange (val) {
      this.doAction({action: this.action})
    },
    handleCurrentChange (val) {
      this.doAction({action: this.action})
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.page = 1
      this.doAction({action: this.action})
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.filters && !this.filters.size) {
        this.filters = {
          ...this.filters,
          size: 100,
          page: 1,
        }
      }
    })
  }
}