<template>
  <div class="baidu">
    <div class="mg-b-20" >
      <el-input v-model="myform.ip" placeholder="请输入IP地址查询归属地，默认查询当前IP">
        <template slot="append">
          <el-button 
            @click="ajaxGaode">
            高德IP定位
          </el-button>
        </template>
      </el-input>
    </div>
    <div class="mg-b-20">
      高德定位IP所在地为：{{address}}
    </div>
    <div class="mg-b-20" >
      <el-input v-model="myform2.ip" placeholder="请输入IP地址查询归属地，默认查询当前IP">
        <template slot="append">
          <el-button 
            @click="ajaxBaidu">
            百度IP定位
          </el-button>
        </template>
      </el-input>
    </div>
    <div class="mg-b-20">
      百度定位IP所在地为：{{address2}}
    </div>
    <div class="mg-b-20" >
      <el-input v-model="myform3.addressKey" placeholder="请输入目标地址">
        <template slot="append">
          <el-button 
            @click="ajaxBaiduAddressGet">
            百度地址联想
          </el-button>
        </template>
      </el-input>
    </div>
    <div>
      地点联想结果：{{address2}}
    </div>
  </div>
</template>
<script>
export default {
  name: 'baidu',
  data () {
    return {
      myform: {
        ip: undefined,
      },
      myform2: {
        ip: undefined,
      },
      myform3: {
        ip: undefined,
      },
      address: undefined,
      address2: undefined,
      addressKey: undefined,
      addressList: [],
    }
  },
  methods: {
    ajaxGaode() {
      let form = this.myform
      this.$ajax.get('/gaode/v3/ip',{
        params: {
          key: '4d2f67275ee5be9cf6d0b9d969f5f375',
          ip: form.ip,
        }
      }).then((res) => {
        if(res.status == 1){
          this.address = res.province + res.city;
        }
      })
    },
    ajaxBaidu() {
      let form = this.myform
      this.$ajax.get('/baidu/location/ip',{
        params: {
          ak: 'RVn81xPM6n1EpUo5SMsoFCcgul5rAWfN',
          ip: form.ip,
        }
      }).then((res) => {
        if(res.status === 0){
          this.address2 = res.content.address;
        }
      })
    },
    ajaxBaiduAddressGet () {
      let form = this.myform3
      this.$ajax.get('/baidu/place/v2/suggestion', {
        params: {
          ak: 'RVn81xPM6n1EpUo5SMsoFCcgul5rAWfN',
          query: form.addressKey,
          region: '全国'
        }
      }).then((res) => {
        console.log(res);
      })
    }
  },
  mounted() {

  }
}
</script>
<style lang="scss" scoped>

</style>