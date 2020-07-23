import vue from 'vue'
import vuex from 'vuex'
import getters from './getters'
import menus from './menusModel'

vue.use(vuex)

export default new vuex.Store({
  modules: {
    menus,
  },
  getters
})