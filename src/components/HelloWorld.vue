<template>
  <div class="hello">
    <div class="dis-tab">
      <div>1</div>
    </div>
    <a-child/>
    <b-child/>
    <div class="dis-flex">
      <div class="min-200"></div>
      <div class="flex-1"></div>
      <div>啊手动阀打发到阿斯顿发大水啊手动阀打发到阿斯顿发大水</div>
    </div>
  </div>
</template>

<script>
import AChild from '@/components/a'
import BChild from '@/components/b'
export default {
  name: 'HelloWorld',
  components: {AChild, BChild},
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
<style lang="scss" scoped>
.dis-tab {
  width: 100px;
  height: 100px;
  border: 1px solid #000;
  display: table;
  div {
    display: table-cell;
    vertical-align: middle;
  }
}
.dis-flex {
  display: flex;
  .flex-1 {
    flex: 1;
  }
  .min-200 {
    width: 200px;
  }
}
</style>
