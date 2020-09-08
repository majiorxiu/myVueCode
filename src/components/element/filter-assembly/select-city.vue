<template>
  <div class="select-city">
    <basics-components 
      :placeholder="'请选择'"
      v-model="address"
      @show="showCityDialog">
      <template slot="content">
        <div class="city-dialog">
          <el-tabs v-model="activeName">
            <el-tab-pane v-for="(item, index) in titles"
              :label="item.key"
              :name="item.value"
              :key="index">
              <div>
                <span class="select-item" v-for="item2 in [level1, level2, level3][index]" 
                  :key="item2.CityID"
                  @click="selectItem(index + 1, item2)">
                  {{item2.RegionName}}
                </span>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </template>
    </basics-components>
  </div>
</template>
<script>
import bus from '@/js/eventBus'
import BasicsComponents from './components/basics-components'
// 省市区地址选择器
export default {
  name: 'select-city',
  props: {
    value: [Number,String],
  },
  components: { BasicsComponents },
  computed: {
    level1 () {
      return this.dataSource.filter(item => item.ParentCityID === 1);
    },
    level2 () {
      if(this.level1Id) {
        return this.dataSource.filter(item => item.ParentCityID === this.level1Id);
      } else {
        return [];
      }
    },
    level3 () {
      if(this.level2Id) {
        return this.dataSource.filter(item => item.ParentCityID === this.level2Id)
      } else {
        return [];
      }
    }
  },
  watch: {
    'value': {
      handler (newVal, oldVal) {
        if(!newVal) {
          this.address = newVal;
          this.level1Id = undefined;
          this.level2Id = undefined;
          this.level3Id = undefined;
        }
      }
    }
  },
  data () {
    return {
      dataSource: [],
      address:'',
      activeName: 'first',
      titles: [
        {key: '省级', value: 'first'},
        {key: '市级', value: 'second'},
        {key: '区级', value: 'third'},
      ],
      level1Id: undefined,
      level1Name: undefined,
      level2Id: undefined,
      level2Name: undefined,
      level3Id: undefined,
    }
  },
  methods: {
    ajaxCitys() {
      this.dataSource = []
    },
    selectItem (level, item) {
      this[`level${level}Id`] = item.CityID; 
      this[`level${level}Name`] = item.RegionName;
      switch(level) {
        case 1:
          this.activeName = 'second'
        break;
        case 2:
          this.activeName = 'third'
        break;
        case 3:
          this.address = `${this.level1Name}/${this.level2Name}/${this.level3Name}`;
          this.$emit('input', this.level3Id);
          bus.$emit('hide');
        break;
      }
    },
    showCityDialog() {
      this.activeName = 'first'
    }
  },
  mounted() {
    this.ajaxCitys();
  }
}
</script>
<style lang="scss">
.select-city {
  .city-dialog {
    width: 300px;
    padding: 20px;
    .select-item {
      display: inline-block;
      min-width: 65px;
      margin-right: 10px;
      line-height: 1.5em;
      cursor: pointer;
    }
  }
}
</style>