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
        <el-main>
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
}
</style>