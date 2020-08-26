<template>
  <div class="main" @click="hideDialog">
    <el-container id="app">
      <el-aside width="200px">
        <my-menu/>
      </el-aside>
      <el-container>
        <!-- <el-header>
          <my-header/>
        </el-header> -->
        <el-main class="scroll-bar">
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
    <div class="router-load" v-show="routerLoad">
      路由正在跳转
    </div>
  </div>
</template>

<script>
import MyMenu from '@/page/layout/menu'
import MyHeader from '@/page/layout/header'
import bus from '@/js/eventBus'
export default {
  name: 'App',
  components: {MyMenu, MyHeader},
  data() {
    return {
      routerLoad: false
    }
  },
  mounted () {
    this.$store.dispatch('setMenus', this.$router.options.routes.slice(2))
  },
  methods: {
    hideDialog() { // 关闭弹窗统一通知
      bus.$emit('hide');
    },
    showLoad() {
      this.routerLoad = true
    },
    hideLoad() {
      this.routerLoad = false
    }
  },
  created () {
    bus.$on('load-show', val => {
      this.showLoad()
    })
    bus.$on('load-hide', val => {
      this.hideLoad()
    })
    document.getElementById('vue-load').remove();
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
</style>
<style lang="scss" scoped>
.main {
  height: 100%;
  position: relative;
  .router-load {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: #000;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 4em;
    z-index: 999;
  }
  .scroll-bar::-webkit-scrollbar {
    /*滚动条整体样式*/
    width : 10px;  /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }
  .scroll-bar::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
    background-color: $border-color;
  }
  .scroll-bar::-webkit-scrollbar-thumb:hover {
    /*滚动条里面小方块*/
    cursor: pointer;
    box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
    background-color: rgba(144,147,153,.5);
  }
  .scroll-bar::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    border-radius: 10px;
    background-color: transparent;;
  }
}
</style>