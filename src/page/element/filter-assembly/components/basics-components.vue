<template>
  <div class="basics-input" @click.stop>
    <div>
      <el-input v-model="valstr" :placeholder="placeholder" :readonly="readonly" @change="$emit('input',valstr)" @focus="focusEvent">
        <template slot="prepend">
          <slot name="input-prepend"></slot>
        </template>
        <template slot="append" v-if="inputIconClass">
          <el-button :class="inputIconClass" @click="showDialog"></el-button>
        </template>
      </el-input>
    </div>
    <el-collapse-transition mode="in-out">
      <div class="basics-dialog" v-show="dialogShow">
        <slot name="content"/>
        <div class="basics-footer text-c" v-if="footer">
          <el-button type="primary" size="mini" class="mg-r-10" @click="$emit('save');hideDialog()">确定</el-button>
          <el-button size="mini" @click="hideDialog">取消</el-button>
        </div>
      </div>
    </el-collapse-transition>
  </div>
</template>
<script>
import bus from '@/js/eventBus'
export default {
  name: 'basics-input',
  props: {
    value: String,
    placeholder: String, //输入框提示文字
    inputIconClass: String, // 输入框是否启用插槽
    footer: { // 是否显示底部确定和取消
      type: Boolean,
      default: false,
    },
    inputFocus: { // 是否获取焦点时显示弹层
      type: Boolean,
      default: true,
    },
    readonly: {
      type: Boolean,
      default: true,
    }
  },
  watch: {
    value: {
      handler(newVal, oldVal) {
        this.valstr = newVal;
      }
    }
  },
  data () {
    return {
      valstr: '',
      dialogShow: false,
    }
  },
  methods: {
    showDialog () {
      bus.$emit('hide');
      this.dialogShow = true
      this.$emit('show');
    },
    hideDialog () {
      this.dialogShow = false;
      this.$emit('hide');
    },
    focusEvent () {
      bus.$emit('hide');
      if(this.inputFocus) {
        this.showDialog();
      }
    }
  },
  mounted () {
    bus.$on('hide', val => {
      this.hideDialog();
    })
  },
}
</script>
<style lang="scss" scoped>
.basics-input {
  position: relative;
  .basics-dialog {
    position: absolute;
    border: 1px solid $border-color;
    top: calc(100% + 15px);
    z-index: 999;
    background-color: #fff;
  }
  .basics-footer {
    background-color: $border-color;
  }
}
</style>