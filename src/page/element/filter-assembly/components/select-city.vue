<template>
  <div class="select-city">
    <basics-components 
      :placeholder="'请选择'"
      v-model="address"
      @show="showCityDialog">
      <template slot="content">
        <div class="city-dialog">
          <el-tabs v-model="activeName">
            <el-tab-pane label="省级" name="first">
              <div>
                <span class="select-item" v-for="item in level1" 
                  :key="item.CityID"
                  @click="selectItem(1, item)">
                  {{item.RegionName}}
                </span>
              </div>
            </el-tab-pane>
            <el-tab-pane label="市级" name="second">
              <span class="select-item" v-for="item in level2" 
                :key="item.CityID"
                  @click="selectItem(2, item)">
                {{item.RegionName}}
              </span>
            </el-tab-pane>
            <el-tab-pane label="区级" name="third">
              <span class="select-item" v-for="item in level3" 
                :key="item.CityID"
                  @click="selectItem(3, item)">
                {{item.RegionName}}
              </span>
            </el-tab-pane>
          </el-tabs>
        </div>
      </template>
    </basics-components>
  </div>
</template>
<script>
import bus from '@/js/eventBus'
import BasicsComponents from './basics-components'
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
        return this.dataSource.filter(item => item.ParentCityID === this.level2Id);
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
<style lang="scss" scoped>
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