<template>
  <el-button @click="fullScreen">
    {{fullScreenText}}
  </el-button>
</template>
<script>
export default {
  // 页面 全屏 按钮组件
  name: 'full-screen-btn',
  data() {
    return {
      isFullScreen: false,
    }
  },
  computed: {
    fullScreenText (){
      let str = '进入全屏'
      if(this.isFullScreen) {
        str = '退出全屏'
      }
      return str
    }
  },
  methods: {
    //全屏
    fullScreen() {
      let element = document.documentElement
      let full = ['requestFullscreen', 'msRequestFullscreen', 'mozRequestFullScreen', 'webkitRequestFullscreen']
      let exitFull = ['exitFullscreen', 'msExitFullscreen', 'mozCancelFullScreen', 'webkitExitFullscreen']
      if(!this.isFullScreen) {
        for(let i = 0; i < full.length; i++) {
          if(element[full[i]]) {
            element[full[i]]()
            break;
          }
        }
      } else {
        for(let i = 0; i < exitFull.length; i++) {
          if(document[exitFull[i]]) {
            document[exitFull[i]]()
            break;
          }
        }
      }
      this.isFullScreen = !this.isFullScreen
    },
  }
}
</script>
<style lang="scss">

</style>