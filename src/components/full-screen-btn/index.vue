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
      var element = document.documentElement;
      if(!this.isFullScreen) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
      }
      this.isFullScreen = !this.isFullScreen;
    },
  }
}
</script>
<style lang="scss">

</style>