export default {
  // 判断 当前页面是否为 不需要 左边导航栏，头部菜单栏的 可全屏页面
  data() {
    return {
      fullScreen: false,
    }    
  },
  created () {
    let params = window.location.href.split('?')[1]
    if(params && params.indexOf('openWindow') >= 0) {
      this.fullScreen = true
    }
  }
}