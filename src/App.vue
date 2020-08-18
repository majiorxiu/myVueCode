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
    return {}
  },
  mounted () {
    this.$store.dispatch('setMenus', this.$router.options.routes.slice(2))
  },
  methods: {
    hideDialog() { // 关闭弹窗统一通知
      bus.$emit('hide');
    }
  },
  created () {
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
}
</style>