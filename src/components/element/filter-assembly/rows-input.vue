<template>
  <div class="rows-input" @click.stop>
    <basics-components 
      :placeholder="'可以输入多个值'"
      :footer="true"
      :input-icon-class="'el-icon-more'"
      :readonly="false"
      :input-focus="false"
      v-model="strList"
      @show="showTextareaDialog"
      @save="textareaSave">
      <template slot="input-prepend">
        <slot name="input-prepend"/>
      </template>
      <template slot="content">
        <div class="textarea-dialog">
          <span class="tips">批量添加(数据之间换行)</span>
          <textarea v-model="textareaStr" rows="8">

          </textarea>
        </div>
      </template>
    </basics-components>
  </div>
</template>
<script>
import BasicsComponents from './components/basics-components'
export default {
  name: 'rows-input',
  props: {
    value: String,
  },
  components: { BasicsComponents },
  data () {
    return {
      strList: '',
      textareaStr: '', 
    }
  },
  watch: {
    'strList': {
      handler (newVal, oldVal) {
        this.$emit('input', newVal)
      }
    },
    'value': {
      handler (newVal, oldVal) {
        this.strList = newVal;
      }
    }
  },
  methods: {
    showTextareaDialog () {
      this.textareaStr = this.strList.split(',').map(item => item.trim()).join('\n');
    },
    textareaSave() {
      this.strList = this.textareaStr.split('\n').map(item => item.trim()).join(',');
      this.$emit('input', this.strList)
    }
  },
}
</script>
<style lang="scss">
.rows-input {
  .textarea-dialog {
    width: 200px;
    .tips {
      margin-left: 1em;
    }
    textarea {
      border: none;
      outline: none;
      padding: 0.5em;
      width: calc(100% - 1em);
      border-top: 1px solid $border-color;
      resize: none;
    }
  }
}
</style>