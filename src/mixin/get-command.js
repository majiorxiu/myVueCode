export default {
  data () {
    return {
      commandList:{}
    }
  },
  methods: {
    bindAction(api, bindData, filter, { action, beforeSend,afterSend}) {
      let that = this;
      that.commandList[action] = {
        action () {
          let _filter = JSON.parse(JSON.stringify(that[filter]));
          if(beforeSend) {
            beforeSend(_filter)
          }
          let result = api(_filter)
          that[bindData] = afterSend ? afterSend(result) : result
        }
      }
    },
    doAction({action, formName}) {
      if(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.commandList[action].action()
          } else {
            return false;
          }
        });
      }
      else {
        this.commandList[action].action()
      }
    },

  }
}