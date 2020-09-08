import vue from 'vue'
import vuex from 'vuex'
import getters from './getters'
import menus from './menusModel'
import themeStyle from './themeStyleModel'

vue.use(vuex)

export default new vuex.Store({
  modules: {
    menus,
    themeStyle,
  },
  getters
})