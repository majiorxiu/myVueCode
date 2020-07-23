<template>
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
</template>

<script>
import MyMenu from '@/page/layout/menu'
import MyHeader from '@/page/layout/header'
export default {
  name: 'App',
  components: {MyMenu, MyHeader},
  mounted () {
    this.$store.dispatch('setMenus', this.$router.options.routes.slice(2))
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
</style>